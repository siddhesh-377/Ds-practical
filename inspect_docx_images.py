import zipfile
from pathlib import Path

root = Path(".")
for docx_file in sorted(root.glob("*.docx")):
    with zipfile.ZipFile(docx_file, 'r') as z:
        media_files = [f for f in z.namelist() if f.startswith('word/media/')]
        if media_files:
            print(f"{docx_file.name}: {len(media_files)} images found: {media_files}")
        else:
            print(f"{docx_file.name}: No images")
