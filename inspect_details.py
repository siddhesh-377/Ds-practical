import json
from pathlib import Path

raw_dir = Path("extracted_raw")

print("=== PRACTICALS OVERVIEW ===")
for i in range(1, 10):
    print(f"\n******************************** PRACTICAL {i} ********************************")
    # Theory
    theory_file = raw_dir / f"Theory {i}_docx.json"
    if theory_file.exists():
        with open(theory_file, "r", encoding="utf-8") as f:
            tdata = json.load(f)
        non_empty = [p["text"].strip() for p in tdata["paragraphs"] if p["text"].strip()]
        title = non_empty[0] if non_empty else "NO TITLE"
        subtitle = non_empty[1] if len(non_empty) > 1 else ""
        print(f"THEORY {i}: {len(non_empty)} non-empty paragraphs, {len(tdata.get('tables', []))} tables")
        print(f"  Headings/Start: {title} | {subtitle}")
        for p in non_empty[:8]:
            print(f"    - {p[:90]}")
    else:
        print(f"THEORY {i}: FILE NOT FOUND")

    # Code
    code_pdf = raw_dir / f"Code {i}_pdf.json"
    code_docx = raw_dir / f"Code {i}_docx.json"
    if code_pdf.exists():
        with open(code_pdf, "r", encoding="utf-8") as f:
            cdata = json.load(f)
        print(f"CODE {i} (PDF): {len(cdata['pages'])} pages")
        first_page = cdata['pages'][0]['text'].strip() if cdata['pages'] else ""
        lines = [l.strip() for l in first_page.split("\n") if l.strip()]
        for l in lines[:6]:
            print(f"    - {l[:90]}")
    elif code_docx.exists():
        with open(code_docx, "r", encoding="utf-8") as f:
            cdata = json.load(f)
        non_empty = [p["text"].strip() for p in cdata["paragraphs"] if p["text"].strip()]
        print(f"CODE {i} (DOCX): {len(non_empty)} non-empty paragraphs")
        for l in non_empty[:6]:
            print(f"    - {l[:90]}")
    else:
        print(f"CODE {i}: FILE NOT FOUND")
