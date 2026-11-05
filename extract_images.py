import zipfile
from pathlib import Path

img_dir = Path("public/assets/images")
img_dir.mkdir(parents=True, exist_ok=True)

for docx_name, folder in [
    ("Theory 1.docx", "theory1"),
    ("Theory 2.docx", "theory2"),
    ("Theory 8.docx", "theory8"),
    ("Theory 9.docx", "theory9"),
]:
    target_folder = img_dir / folder
    target_folder.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(docx_name, 'r') as z:
        for file_info in z.infolist():
            if file_info.filename.startswith("word/media/"):
                filename = Path(file_info.filename).name
                extracted_path = target_folder / filename
                with open(extracted_path, "wb") as f:
                    f.write(z.read(file_info.filename))
                print(f"Extracted {docx_name} -> {extracted_path} ({file_info.file_size} bytes)")
