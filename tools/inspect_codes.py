import json
from pathlib import Path

raw_dir = Path("extracted_raw")

for i in [1, 2, 3]:
    with open(raw_dir / f"Code {i}_pdf.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n==================== CODE {i} (PDF) - Total pages: {len(data['pages'])} ====================")
    for p in data['pages']:
        print(f"--- PAGE {p['page']} --- (length: {len(p['text'])})")
        lines = p['text'].split('\n')
        print(f"First 3 lines: {lines[:3]}")
        print(f"Last 3 lines: {lines[-3:]}")

for i in range(4, 10):
    with open(raw_dir / f"Code {i}_docx.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n==================== CODE {i} (DOCX) - Total paras: {len(data['paragraphs'])} ====================")
    non_empty = [p['text'] for p in data['paragraphs'] if p['text'].strip()]
    print(f"First 5 lines: {non_empty[:5]}")
    print(f"Last 5 lines: {non_empty[-5:]}")
