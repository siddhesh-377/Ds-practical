import json
from pathlib import Path
from docx import Document

for i in range(1, 10):
    doc = Document(f"Theory {i}.docx")
    print(f"\n==================== THEORY {i} DETAILS ====================")
    print(f"Paragraphs: {len(doc.paragraphs)}, Tables: {len(doc.tables)}")
    for ti, tbl in enumerate(doc.tables):
        print(f"Table {ti}:")
        for row in tbl.rows:
            print("  | " + " | ".join(c.text.strip().replace('\n', ' ') for c in row.cells) + " |")
    
    # check styles
    styles_used = set(p.style.name for p in doc.paragraphs if p.text.strip())
    print("Styles used:", styles_used)
