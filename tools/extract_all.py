import os
import json
from pathlib import Path
from docx import Document
from pypdf import PdfReader

output_dir = Path("extracted_raw")
output_dir.mkdir(exist_ok=True)

root = Path(".")

# Extract all DOCX and PDF files
for p in sorted(root.glob("*")):
    if p.name.startswith("inspect_") or p.name.startswith("extract_"):
        continue
    if p.suffix.lower() == ".docx":
        doc = Document(p)
        content = {
            "filename": p.name,
            "paragraphs": [
                {
                    "style": para.style.name if para.style else "",
                    "text": para.text
                }
                for para in doc.paragraphs
            ],
            "tables": [
                [
                    [cell.text for cell in row.cells]
                    for row in table.rows
                ]
                for table in doc.tables
            ]
        }
        with open(output_dir / f"{p.stem}_docx.json", "w", encoding="utf-8") as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
        print(f"Extracted {p.name}: {len(content['paragraphs'])} paragraphs, {len(content['tables'])} tables")

    elif p.suffix.lower() == ".pdf":
        reader = PdfReader(str(p))
        pages_text = []
        for i, page in enumerate(reader.pages):
            pages_text.append({
                "page": i + 1,
                "text": page.extract_text() or ""
            })
        content = {
            "filename": p.name,
            "pages": pages_text
        }
        with open(output_dir / f"{p.stem}_pdf.json", "w", encoding="utf-8") as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
        print(f"Extracted {p.name}: {len(reader.pages)} pages")
