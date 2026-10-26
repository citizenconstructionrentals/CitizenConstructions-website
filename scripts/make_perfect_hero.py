import cv2
import numpy as np

# Load source photo
src_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792877131264_522172b8.jpg"
img = cv2.imread(src_path)
h_src, w_src = img.shape[:2]

canvas_w = 3840
canvas_h = 1874

# Scale photo so machine is commanding and crisp
scale = 2.12
scaled_w = int(round(w_src * scale)) # ~1223
scaled_h = int(round(h_src * scale)) # ~2170

scaled_img = cv2.resize(img, (scaled_w, scaled_h), interpolation=cv2.INTER_LANCZOS4)

# Load machine mask
cutout_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_refined_cutout.png"
cutout = cv2.imread(cutout_path, cv2.IMREAD_UNCHANGED)
raw_mask = (cutout[:, :, 3] > 10).astype(np.uint8) * 255

# Fill holes inside the machine body
contours, _ = cv2.findContours(raw_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
solid_mask = np.zeros_like(raw_mask)
cv2.drawContours(solid_mask, contours, -1, 255, -1)
# Include concrete floor under tires
solid_mask[920:1024, :] = 255

scaled_mask = cv2.resize(solid_mask, (scaled_w, scaled_h), interpolation=cv2.INTER_LINEAR)

# We want the photo to reach the right edge of the screen:
# pos_x + scaled_w = canvas_w => pos_x = canvas_w - scaled_w
pos_x = canvas_w - scaled_w # 3840 - 1223 = 2617
pos_y = canvas_h - scaled_h # 1874 - 2170 = -296

print(f"Photo placed at x: {pos_x}, y: {pos_y}")

# Build 2D alpha mask for the photo
# 1. Right edge, bottom edge: 100% opaque (touches canvas boundaries)
# 2. Left edge: soft feather into navy background
# 3. Top edge: soft feather into navy ceiling
alpha = np.ones((scaled_h, scaled_w), dtype=np.float32)

# Left edge feather:
# In scaled_img, the machine starts at x ≈ 45px.
# We feather from x = 0 to x = 180px with a smooth Hermite curve
# But inside the machine mask, alpha is strictly 1.0!
feather_left_w = 200
t_x = np.linspace(0, 1, feather_left_w, dtype=np.float32)
s_x = t_x * t_x * (3.0 - 2.0 * t_x)
alpha[:, :feather_left_w] = s_x[None, :]

# Top edge feather:
# Top 280px in canvas (which is y = 0 to 280 - pos_y = 576px in scaled_img)
top_clip = -pos_y # 296px above canvas
feather_top_h = 240
t_y = np.linspace(0, 1, feather_top_h, dtype=np.float32)
s_y = t_y * t_y * (3.0 - 2.0 * t_y)
alpha[:top_clip + feather_top_h, :] *= np.clip(np.linspace(0, 1, top_clip + feather_top_h)[:, None], 0, 1)

# Ensure machine itself is 100% opaque (no fade on the machine!)
core_alpha = cv2.resize(raw_mask, (scaled_w, scaled_h), interpolation=cv2.INTER_NEAREST) / 255.0
alpha = np.maximum(alpha, core_alpha)

# Create base canvas with site's exact hero navy gradient
y_coords = np.linspace(0, 1, canvas_h)[:, None]
b_grad = (82 * (1 - y_coords) + 79 * y_coords).astype(np.float32)
g_grad = (34 * (1 - y_coords) + 32 * y_coords).astype(np.float32)
r_grad = (9 * (1 - y_coords) + 8 * y_coords).astype(np.float32)

canvas = np.zeros((canvas_h, canvas_w, 3), dtype=np.float32)
canvas[:, :, 0] = np.repeat(b_grad, canvas_w, axis=1)
canvas[:, :, 1] = np.repeat(g_grad, canvas_w, axis=1)
canvas[:, :, 2] = np.repeat(r_grad, canvas_w, axis=1)

# Extended concrete floor along ground plane
# Sample concrete floor from bottom of scaled_img
floor_h = 220 # bottom 220px of canvas
floor_y_start = canvas_h - floor_h
# Floor base tone in photo is around [135, 125, 115] BGR
# Fade concrete floor leftwards from pos_x to pos_x - 800
floor_fade_w = 900
floor_start_x = pos_x - floor_fade_w

for fy in range(floor_h):
    cy = floor_y_start + fy
    # Vertical floor depth factor
    v_depth = fy / float(floor_h)
    for fx in range(floor_fade_w):
        cx = floor_start_x + fx
        t_f = fx / float(floor_fade_w)
        s_f = t_f * t_f * (3.0 - 2.0 * t_f) * (0.35 + 0.65 * v_depth)
        # Concrete floor tone fading into navy
        floor_b = 60.0 * (1 - v_depth) + 85.0 * v_depth
        floor_g = 28.0 * (1 - v_depth) + 70.0 * v_depth
        floor_r = 10.0 * (1 - v_depth) + 65.0 * v_depth
        
        orig_b = canvas[cy, cx, 0]
        orig_g = canvas[cy, cx, 1]
        orig_r = canvas[cy, cx, 2]
        
        canvas[cy, cx, 0] = orig_b * (1 - s_f * 0.45) + floor_b * (s_f * 0.45)
        canvas[cy, cx, 1] = orig_g * (1 - s_f * 0.45) + floor_g * (s_f * 0.45)
        canvas[cy, cx, 2] = orig_r * (1 - s_f * 0.45) + floor_r * (s_f * 0.45)

# Composite photo onto canvas
c_y1 = max(0, pos_y)
c_y2 = min(canvas_h, pos_y + scaled_h)
p_y1 = c_y1 - pos_y
p_y2 = p_y1 + (c_y2 - c_y1)

c_x1 = max(0, pos_x)
c_x2 = min(canvas_w, pos_x + scaled_w)
p_x1 = c_x1 - pos_x
p_x2 = p_x1 + (c_x2 - c_x1)

a_sub = alpha[p_y1:p_y2, p_x1:p_x2, None]
p_sub = scaled_img[p_y1:p_y2, p_x1:p_x2].astype(np.float32)
bg_sub = canvas[c_y1:c_y2, c_x1:c_x2]

blended_sub = bg_sub * (1.0 - a_sub) + p_sub * a_sub
canvas[c_y1:c_y2, c_x1:c_x2] = blended_sub

# Fine unsharp mask for razor-sharp machine details
final_bgr = np.clip(canvas, 0, 255).astype(np.uint8)
blur = cv2.GaussianBlur(final_bgr, (0, 0), 1.2)
sharpened = cv2.addWeighted(final_bgr, 1.25, blur, -0.25, 0)

out_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_perfect_hero.jpg"
cv2.imwrite(out_path, sharpened, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved test_perfect_hero.jpg successfully!")
