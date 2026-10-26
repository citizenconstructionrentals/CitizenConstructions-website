import cv2
import numpy as np

# Load cutout
cutout_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_refined_cutout.png"
rgba = cv2.imread(cutout_path, cv2.IMREAD_UNCHANGED)

# Crop to machine bounding box
# Find non-zero alpha
alpha = rgba[:, :, 3]
y_indices, x_indices = np.where(alpha > 10)
y_min, y_max = y_indices.min(), y_indices.max()
x_min, x_max = x_indices.min(), x_indices.max()

machine_crop = rgba[y_min:y_max+1, x_min:x_max+1]
h_m, w_m = machine_crop.shape[:2]
print(f"Machine crop: {w_m}x{h_m}")

canvas_w = 3840
canvas_h = 1874

# Scale machine so height is ~1400px
target_h = 1400
scale = target_h / float(h_m)
target_w = int(round(w_m * scale))

scaled_machine = cv2.resize(machine_crop, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
m_bgr = scaled_machine[:, :, :3]
m_alpha = scaled_machine[:, :, 3].astype(np.float32) / 255.0

# 1. Base canvas: Deep navy gradient with an industrial ground plane
canvas = np.zeros((canvas_h, canvas_w, 3), dtype=np.float32)

# Sky/wall gradient: from top #081E48 to horizon #0B2A63
horizon_y = 1200 # horizon line where floor starts
floor_y_start = 1150

for y in range(canvas_h):
    if y < floor_y_start:
        # Upper navy gradient
        t = y / float(floor_y_start)
        b = 75.0 * (1 - t) + 99.0 * t
        g = 30.0 * (1 - t) + 42.0 * t
        r = 8.0 * (1 - t) + 11.0 * t
    else:
        # Industrial ground plane: dark reflective concrete floor fading to navy
        t = (y - floor_y_start) / float(canvas_h - floor_y_start)
        # Floor base tone: dark slate navy concrete #0A1E3D to #081832
        b = 85.0 * (1 - t) + 60.0 * t
        g = 36.0 * (1 - t) + 26.0 * t
        r = 10.0 * (1 - t) + 8.0 * t
    canvas[y, :] = (b, g, r)

# Position machine on canvas
# Tires at canvas_h - 120 = 1754
pos_x = 2450
pos_y = 1754 - target_h

print(f"Machine placed at x: {pos_x}, y: {pos_y}")

# 2. Add realistic ground shadow under tires and chassis
shadow_mask = np.zeros((canvas_h, canvas_w), dtype=np.float32)
# Shadow ellipses under front wheel and rear wheel
tires_y = pos_y + target_h - 20
cv2.ellipse(shadow_mask, (pos_x + int(target_w * 0.18), tires_y), (int(target_w * 0.18), 35), 0, 0, 360, 0.75, -1)
cv2.ellipse(shadow_mask, (pos_x + int(target_w * 0.85), tires_y - 20), (int(target_w * 0.16), 30), 0, 0, 360, 0.75, -1)
cv2.ellipse(shadow_mask, (pos_x + int(target_w * 0.5), tires_y - 10), (int(target_w * 0.45), 45), 0, 0, 360, 0.55, -1)
shadow_mask = cv2.GaussianBlur(shadow_mask, (81, 41), 0)

# Apply shadow to canvas
canvas = canvas * (1.0 - shadow_mask[:, :, None] * 0.6)

# 3. Composite machine onto canvas
c_y1 = max(0, pos_y)
c_y2 = min(canvas_h, pos_y + target_h)
m_y1 = c_y1 - pos_y
m_y2 = m_y1 + (c_y2 - c_y1)

c_x1 = max(0, pos_x)
c_x2 = min(canvas_w, pos_x + target_w)
m_x1 = c_x1 - pos_x
m_x2 = m_x1 + (c_x2 - c_x1)

m_a = m_alpha[m_y1:m_y2, m_x1:m_x2, None]
m_rgb = m_bgr[m_y1:m_y2, m_x1:m_x2].astype(np.float32)

canvas[c_y1:c_y2, c_x1:c_x2] = canvas[c_y1:c_y2, c_x1:c_x2] * (1.0 - m_a) + m_rgb * m_a

final_bgr = np.clip(canvas, 0, 255).astype(np.uint8)

# Subtle unsharp mask for sharpness
blur = cv2.GaussianBlur(final_bgr, (0, 0), 1.2)
sharpened = cv2.addWeighted(final_bgr, 1.25, blur, -0.25, 0)

out_path = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_isolated_hero.jpg"
cv2.imwrite(out_path, sharpened, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved test_isolated_hero.jpg")
