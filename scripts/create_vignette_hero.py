import cv2
import numpy as np

# 1. Load source photo
src_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792877131264_522172b8.jpg"
img = cv2.imread(src_path)
h_src, w_src = img.shape[:2]

canvas_w = 3840
canvas_h = 1874

# Target machine scale: machine is ~715px tall in 1024h photo
# We want machine ~1380px tall on 1874h canvas
scale = 1380.0 / 715.0 # ≈ 1.93
scaled_w = int(round(w_src * scale)) # 1114
scaled_h = int(round(h_src * scale)) # 1976

scaled_img = cv2.resize(img, (scaled_w, scaled_h), interpolation=cv2.INTER_LANCZOS4)

# 2. Extract machine silhouette mask on original size, then scale up
# Use the refined grabcut mask
cutout_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_refined_cutout.png"
cutout = cv2.imread(cutout_path, cv2.IMREAD_UNCHANGED)
raw_mask = (cutout[:, :, 3] > 10).astype(np.uint8) * 255

# Fill holes inside the machine body and cage
contours, _ = cv2.findContours(raw_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
solid_mask = np.zeros_like(raw_mask)
cv2.drawContours(solid_mask, contours, -1, 255, -1)

# Include the concrete floor under tires (from y=920 to 1024)
solid_mask[920:1024, :] = 255

# Scale mask to scaled_w x scaled_h
scaled_mask = cv2.resize(solid_mask, (scaled_w, scaled_h), interpolation=cv2.INTER_LINEAR)

# Dilate mask by 140px to capture the authentic ambient environment around the machine
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (161, 161))
dilated_mask = cv2.dilate(scaled_mask, kernel)

# Apply Gaussian blur for silky-smooth feathered transition
blurred_mask = cv2.GaussianBlur(dilated_mask.astype(np.float32), (181, 181), 0) / 255.0

# Ensure the machine itself is strictly 1.0 (100% opaque, zero fade)
core_mask = cv2.resize(raw_mask, (scaled_w, scaled_h), interpolation=cv2.INTER_NEAREST) / 255.0
final_alpha = np.maximum(blurred_mask, core_mask)

# 3. Create base canvas with site's exact deep navy gradient
# Top: #092252 (BGR: 82, 34, 9)
# Mid: #0B2A63 (BGR: 99, 42, 11)
# Bottom: #08204F (BGR: 79, 32, 8)
y_coords = np.linspace(0, 1, canvas_h)[:, None]
b_grad = (82 * (1 - y_coords) + 79 * y_coords).astype(np.float32)
g_grad = (34 * (1 - y_coords) + 32 * y_coords).astype(np.float32)
r_grad = (9 * (1 - y_coords) + 8 * y_coords).astype(np.float32)

canvas = np.zeros((canvas_h, canvas_w, 3), dtype=np.float32)
canvas[:, :, 0] = np.repeat(b_grad, canvas_w, axis=1)
canvas[:, :, 1] = np.repeat(g_grad, canvas_w, axis=1)
canvas[:, :, 2] = np.repeat(r_grad, canvas_w, axis=1)

# 4. Placement of scaled photo
# Tires sit at y ≈ 1730px
pos_y = 1730 - int(round(980 * scale)) # ≈ -164
# Place machine on the right side
# Machine center at x ≈ 2850
pos_x = canvas_w - scaled_w - 200 # 3840 - 1114 - 200 = 2526

print(f"Placing at x: {pos_x}, y: {pos_y}")

# Calculate overlap
c_y1 = max(0, pos_y)
c_y2 = min(canvas_h, pos_y + scaled_h)
p_y1 = c_y1 - pos_y
p_y2 = p_y1 + (c_y2 - c_y1)

c_x1 = max(0, pos_x)
c_x2 = min(canvas_w, pos_x + scaled_w)
p_x1 = c_x1 - pos_x
p_x2 = p_x1 + (c_x2 - c_x1)

alpha_crop = final_alpha[p_y1:p_y2, p_x1:p_x2, None]
img_crop = scaled_img[p_y1:p_y2, p_x1:p_x2].astype(np.float32)
bg_crop = canvas[c_y1:c_y2, c_x1:c_x2]

blended = bg_crop * (1.0 - alpha_crop) + img_crop * alpha_crop
canvas[c_y1:c_y2, c_x1:c_x2] = blended

# 5. Fine unsharp mask for razor-sharp machine details
final_bgr = np.clip(canvas, 0, 255).astype(np.uint8)
blur = cv2.GaussianBlur(final_bgr, (0, 0), 1.2)
sharpened = cv2.addWeighted(final_bgr, 1.25, blur, -0.25, 0)

out_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_vignette_hero.jpg"
cv2.imwrite(out_path, sharpened, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved test_vignette_hero.jpg successfully!")
