import cv2
import numpy as np

src_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792877131264_522172b8.jpg"
img = cv2.imread(src_path)
h_src, w_src = img.shape[:2]

canvas_w = 3840
canvas_h = 1874

# Target machine height: ~1380px (machine is ~715px in 1024h photo)
scale = 1380.0 / 715.0 # ~1.93
photo_w = int(round(w_src * scale)) # ~1114
photo_h = int(round(h_src * scale)) # ~1976

print(f"Scaled photo: {photo_w}x{photo_h}")
scaled_photo = cv2.resize(img, (photo_w, photo_h), interpolation=cv2.INTER_LANCZOS4)

# 1. Base canvas filled with site's exact hero navy gradient
# Top: #092252 (BGR: 82, 34, 9)
# Mid: #0B2A63 (BGR: 99, 42, 11)
# Bottom: #08204F (BGR: 79, 32, 8)
y_coords = np.linspace(0, 1, canvas_h)[:, None]
b_grad = (82 * (1 - y_coords) + 79 * y_coords).astype(np.uint8)
g_grad = (34 * (1 - y_coords) + 32 * y_coords).astype(np.uint8)
r_grad = (9 * (1 - y_coords) + 8 * y_coords).astype(np.uint8)

canvas = np.zeros((canvas_h, canvas_w, 3), dtype=np.uint8)
canvas[:, :, 0] = np.repeat(b_grad, canvas_w, axis=1)
canvas[:, :, 1] = np.repeat(g_grad, canvas_w, axis=1)
canvas[:, :, 2] = np.repeat(r_grad, canvas_w, axis=1)

# Placement
# Tires sit at y ≈ 1730px
photo_top = 1730 - int(round(980 * scale)) # ≈ -164
photo_left = 2200

# Padding to extend background
left_pad = 700
left_slice = scaled_photo[:, :1, :]
left_fill = np.repeat(left_slice, left_pad, axis=1)

right_pad = canvas_w - (photo_left + photo_w)
if right_pad > 0:
    right_fill = cv2.flip(scaled_photo[:, -right_pad:, :], 1)
    strip = np.concatenate([left_fill, scaled_photo, right_fill], axis=1)
else:
    strip = np.concatenate([left_fill, scaled_photo], axis=1)

strip_w = strip.shape[1]
strip_h = strip.shape[0]
strip_left = photo_left - left_pad

# Compute 2D alpha mask for the strip
alpha_mask = np.ones((strip_h, strip_w), dtype=np.float32)

# Horizontal feather across the first 500px of the left_fill
feather_w = 500
t_x = np.linspace(0, 1, feather_w, dtype=np.float32)
s_x = t_x * t_x * (3.0 - 2.0 * t_x)
alpha_mask[:, :feather_w] = s_x[None, :]

# Vertical feather at top (first 180px in canvas coordinates)
top_clip = max(0, -photo_top)
if top_clip < strip_h:
    vert_feather_h = 220
    t_y = np.linspace(0, 1, vert_feather_h, dtype=np.float32)
    s_y = t_y * t_y * (3.0 - 2.0 * t_y)
    alpha_mask[:top_clip + vert_feather_h, :] *= np.clip(np.linspace(0, 1, top_clip + vert_feather_h)[:, None], 0, 1)

# Calculate overlap region between strip and canvas
c_y1 = max(0, photo_top)
c_y2 = min(canvas_h, photo_top + strip_h)
s_y1 = c_y1 - photo_top
s_y2 = s_y1 + (c_y2 - c_y1)

c_x1 = max(0, strip_left)
c_x2 = min(canvas_w, strip_left + strip_w)
s_x1 = c_x1 - strip_left
s_x2 = s_x1 + (c_x2 - c_x1)

alpha_sub = alpha_mask[s_y1:s_y2, s_x1:s_x2, None]
strip_sub = strip[s_y1:s_y2, s_x1:s_x2].astype(np.float32)
canvas_sub = canvas[c_y1:c_y2, c_x1:c_x2].astype(np.float32)

blended_sub = canvas_sub * (1.0 - alpha_sub) + strip_sub * alpha_sub
canvas[c_y1:c_y2, c_x1:c_x2] = np.clip(blended_sub, 0, 255).astype(np.uint8)

# Unsharp mask for crisp HD machine details
blur = cv2.GaussianBlur(canvas, (0, 0), 1.2)
sharpened = cv2.addWeighted(canvas, 1.3, blur, -0.3, 0)

out_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_adjusted_hero.jpg"
cv2.imwrite(out_path, sharpened, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved test_adjusted_hero.jpg successfully!")
