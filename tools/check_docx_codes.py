import json
from pathlib import Path

raw_dir = Path("extracted_raw")

for i in range(4, 10):
    with open(raw_dir / f"Code {i}_docx.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n==================== CODE {i} (DOCX) ====================")
    lines = [p['text'] for p in data['paragraphs']]
    full = "\n".join(lines)
    print("TOTAL CHARACTERS:", len(full))
    print("CONTAINS 'Output':", "output" in full.lower())
    print("CONTAINS 'main':", "main" in full)
    print("FIRST 10 NON-EMPTY LINES:")
    non_empty = [l for l in lines if l.strip()]
    for l in non_empty[:10]:
        print("  ", l)
    print("LAST 5 NON-EMPTY LINES:")
    for l in non_empty[-5:]:
        print("  ", l)
