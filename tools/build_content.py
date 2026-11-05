"""Extract the supplied documents into the portal's static content payload.

The source documents remain untouched. This script deliberately stores their
paragraph text, list order, table contents, and program text without editorial
rewriting so the site can be rebuilt from the supplied files.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from zipfile import ZipFile

from docx import Document
from pypdf import PdfReader

ROOT = Path(__file__).parent
OUT = ROOT / "public" / "data"
MEDIA = ROOT / "public" / "media"
OUT.mkdir(parents=True, exist_ok=True)
MEDIA.mkdir(parents=True, exist_ok=True)


def blocks_from_docx(path: Path, practical: int):
    doc = Document(path)
    blocks = []
    for paragraph in doc.paragraphs:
        text = paragraph.text
        if not text.strip():
            continue
        style = paragraph.style.name.lower()
        if "heading 1" in style:
            kind = "h1"
        elif "heading" in style:
            kind = "h2"
        elif "list" in style:
            kind = "li"
        else:
            kind = "p"
        blocks.append({"type": kind, "text": text})
    for table in doc.tables:
        rows = []
        for row in table.rows:
            rows.append([cell.text.strip() for cell in row.cells])
        blocks.append({"type": "table", "rows": rows})

    # Preserve embedded source figures as separate, faithfully copied assets.
    assets = []
    with ZipFile(path) as archive:
        images = sorted(name for name in archive.namelist() if name.startswith("word/media/"))
        for index, name in enumerate(images, 1):
            suffix = Path(name).suffix.lower()
            target = MEDIA / f"theory-{practical}-{index}{suffix}"
            target.write_bytes(archive.read(name))
            assets.append(f"media/{target.name}")
    return blocks, assets


def code_from_docx(path: Path):
    lines = [p.text for p in Document(path).paragraphs]
    first = next((i for i, line in enumerate(lines) if line.lstrip().startswith("#include")), 0)
    return "\n".join(lines[first:]).strip() + "\n"


def code_from_pdf(path: Path):
    text = "\n".join(page.extract_text() or "" for page in PdfReader(str(path)).pages)
    match = re.search(r"Input code:\s*(.*?)(?:\n\s*Output:\s*|\Z)", text, re.S | re.I)
    if not match:
        raise ValueError(f"Could not find the Input code section in {path.name}")
    # Keep the extracted characters and line breaks; only remove PDF page padding.
    return "\n".join(line.rstrip() for line in match.group(1).splitlines()).strip() + "\n"


practicals = []
for number in range(1, 10):
    theory_file = ROOT / f"Theory {number}.docx"
    code_file = ROOT / (f"Code {number}.pdf" if number <= 3 else f"Code {number}.docx")
    theory, images = blocks_from_docx(theory_file, number)
    code = code_from_pdf(code_file) if code_file.suffix.lower() == ".pdf" else code_from_docx(code_file)
    title = next((block["text"] for block in theory if block["type"] == "h1"), f"Practical {number}")
    practicals.append({
        "id": number,
        "title": title,
        "theory": theory,
        "images": images,
        "code": code,
        "language": "c" if number <= 4 else "cpp",
        "sources": {"theory": theory_file.name, "code": code_file.name},
    })

payload = {"title": "DSA Practical Revision Portal", "practicals": practicals}
(OUT / "practicals.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Created {OUT / 'practicals.json'} with {len(practicals)} practicals.")
for item in practicals:
    print(f"{item['id']}: {item['sources']['theory']} + {item['sources']['code']} | {len(item['theory'])} theory blocks | {len(item['code'].splitlines())} code lines")
