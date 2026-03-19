import os
import subprocess
import glob
import re

def compress_images_and_update_jsx():
    base_dirs = ['public', 'src/assets']
    components_dir = 'src/components'
    
    # Compress all images in place
    for base_dir in base_dirs:
        if not os.path.exists(base_dir): continue
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    original_path = os.path.join(root, file)
                    
                    # Skip already compressed or very small files if needed, but we'll process all just in case
                    print(f"Compressing {original_path}...")
                    try:
                        # Resize to max 1200px width/height and compress to 60% quality JPEG
                        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '60', '-Z', '1200', original_path, '--out', original_path], check=True, stdout=subprocess.DEVNULL)
                    except subprocess.CalledProcessError as e:
                        print(f"Failed to convert {original_path}: {e}")

    # Now add loading="lazy" to all JSX files
    jsx_files = glob.glob(os.path.join(components_dir, '*.jsx'))
    for jsx_file in jsx_files:
        with open(jsx_file, 'r') as f:
            content = f.read()

        # Add loading="lazy" to all <img> tags if not present
        # skip the logo in Navbar so it loads eagerly
        def lazy_img_replacer(match):
            img_tag = match.group(0)
            if 'loading=' not in img_tag and 'broke-and-fixed' not in img_tag:
                return img_tag.replace('/>', ' loading="lazy" />').replace('>', ' loading="lazy">')
            return img_tag
            
        content = re.sub(r'<img[^>]+(/?|)>', lazy_img_replacer, content)

        with open(jsx_file, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    compress_images_and_update_jsx()
    print("Done optimizing images!")
