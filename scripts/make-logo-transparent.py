from PIL import Image
from pathlib import Path

# Refine logo: stronger cream removal + crop to content bounds
src = Path('/Users/prabhatsharma/Desktop/Mithaava/public/brand/mithaava-logo.jpg')
img = Image.open(src).convert('RGBA')
pixels = img.load()
w, h = img.size

def is_bg(r, g, b):
    brightness = (r + g + b) / 3
    # cream / off-white / pale beige
    if brightness > 232 and max(r, g, b) - min(r, g, b) < 35:
        return True
    if r > 240 and g > 235 and b > 225:
        return True
    return False

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b):
            pixels[x, y] = (0, 0, 0, 0)

# Bounding box of opaque pixels
min_x, min_y, max_x, max_y = w, h, 0, 0
for y in range(h):
    for x in range(w):
        if pixels[x, y][3] > 10:
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

pad = 12
min_x = max(0, min_x - pad)
min_y = max(0, min_y - pad)
max_x = min(w - 1, max_x + pad)
max_y = min(h - 1, max_y + pad)
cropped = img.crop((min_x, min_y, max_x + 1, max_y + 1))
out = Path('/Users/prabhatsharma/Desktop/Mithaava/public/brand/mithaava-logo.png')
cropped.save(out, 'PNG')
print(cropped.size, out.stat().st_size)
