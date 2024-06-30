import os
from PIL import Image

def convert_to_grayscale(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
            img_path = os.path.join(input_folder, filename)
            img = Image.open(img_path).convert('L')
            output_path = os.path.join(output_folder, filename)
            img.save(output_path)
            print(f"Converted {filename} to grayscale and saved to {output_folder}")

# Using relative paths
input_folder = './color_images'
output_folder = './grayscale_images'

convert_to_grayscale(input_folder, output_folder)
