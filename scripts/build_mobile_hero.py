import cv2
import numpy as np

# Load source photo and mask
src_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792877131264_522172b8.jpg"
cutout_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_refined_cutout.png"

img = cv2.imread(src_path)
h_src, w_src = img.shape[:2]

canvas_w = 1170
canvas_h = 1500

# We want the machine to occupy the lower ~55-60% of the canvas (height ~850-900px)
# In the original img, height is 1024, width is 577
target_machine_h = 880
scale = target_machine_h / float(h_src)
scaled_w = int(round(w_src * scale)) # ~496
scaled_h = int(round(h_src * scale)) # 880

scaled_img = cv2.resize(img, (scaled_w, scaled_h), interpolation=cv2.INTER_LANCZOS4)

# Machine mask
cutout = cv2.imread(cutout_path, cv2.IMREAD_UNCHANGED)
raw_mask = (cutout[:, :, 3] > 10).astype(np.uint8) * 255
contours, _ = cv2.findContours(raw_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
solid_mask = np.zeros_like(raw_mask)
cv2.drawContours(solid_mask, contours, -1, 255, -1)
solid_mask[920:1024, :] = 255 # ground

scaled_mask = cv2.resize(solid_mask, (scaled_w, scaled_h), interpolation=cv2.INTER_LINEAR)

# Place machine horizontally centered-right (e.g. centered around x = 585 or slightly to the right x ≈ 520 to 1080)
# Leaving room for nice balance
pos_x = (canvas_w - scaled_w) // 2 + 120 # shifted slightly right so it looks dynamic
pos_y = canvas_h - scaled_h # bottom touches ground (1500 - 880 = 620)

print(f"Machine placed at x: {pos_x}, y: {pos_y}, w: {scaled_w}, h: {scaled_h}")

# Build navy background canvas
# #0B2A63 is RGB(11, 42, 99) -> BGR(99, 42, 11)
# #08204F is RGB(8, 32, 79) -> BGR(79, 32, 8)
y_coords = np.linspace(0, 1, canvas_h, dtype=np.float32)[:, None]
b_grad = (99 * (1 - y_coords) + 79 * y_coords)
g_grad = (42 * (1 - y_coords) + 32 * y_coords)
r_grad = (11 * (1 - y_coords) + 8 * y_coords)

bg = np.zeros((canvas_h, canvas_w, 3), dtype=np.float32)
bg[:, :, 0] = b_grad
bg[:, :, 1] = g_grad
bg[:, :, 2] = r_grad

# Alpha feathering for the machine photo
alpha = np.ones((scaled_h, scaled_w), dtype=np.float32)
# Left feather
feather_w = 120
t_x = np.linspace(0, 1, feather_w, dtype=np.float32)
s_x = t_x * t_x * (3.0 - 2.0 * t_x)
alpha[:, :feather_w] = s_x[None, :]

# Right feather if needed
if pos_x + scaled_w > canvas_w:
    overflow = (pos_x + scaled_w) - canvas_w
    # clip
    scaled_w -= overflow
    scaled_img = scaled_img[:, :scaled_w]
    alpha = alpha[:, :scaled_w]
    scaled_mask = scaled_mask[:, :scaled_w]
else:
    right_feather_w = 80
    t_rx = np.linspace(1, 0, right_feather_w, dtype=np.float32)
    s_rx = t_rx * t_rx * (3.0 - 2.0 * t_rx)
    alpha[:, -right_feather_w:] = np.minimum(alpha[:, -right_feather_w:], s_rx[None, :])

# Top feather
feather_top_h = 100
t_y = np.linspace(0, 1, feather_top_h, dtype=np.float32)
s_y = t_y * t_y * (3.0 - 2.0 * t_y)
alpha[:feather_top_h, :] *= s_y[:, None]

# Solid core mask for the machine body
core_alpha = (cv2.resize(raw_mask, (scaled_w, scaled_h), interpolation=cv2.INTER_NEAREST) / 255.0).astype(np.float32)
alpha = np.maximum(alpha, core_alpha)

# Composite machine onto background
patch_bg = bg[pos_y:pos_y+scaled_h, pos_x:pos_x+scaled_w]
alpha_3d = alpha[:, :, None]
composited_patch = scaled_img.astype(np.float32) * alpha_3d + patch_bg * (1.0 - alpha_3d)
bg[pos_y:pos_y+scaled_h, pos_x:pos_x+scaled_w] = composited_patch

out_img = np.clip(bg, 0, 255).astype(np.uint8)

out_path = "public/images/hero/hero-composite-mobile.jpg"
cv2.imwrite(out_path, out_img, [cv2.IMWRITE_JPEG_QUALITY, 92])
print(f"Successfully saved {out_path} ({canvas_w}x{canvas_h})")
