import json
from pathlib import Path

raw_dir = Path("extracted_raw")

for i in range(1, 10):
    with open(raw_dir / f"Theory {i}_docx.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n==================== THEORY {i} (DOCX) ====================")
    print(f"Total paragraphs: {len(data['paragraphs'])}, Total tables: {len(data['tables'])}")
    for ti, table in enumerate(data['tables']):
        print(f"  Table {ti+1}: {len(table)} rows, {len(table[0]) if table else 0} cols")
        for row in table[:3]:
            print("    Row:", [cell.replace('\n', ' ')[:40] for cell in row])
    
    # print all non-empty paragraphs
    non_empty = [p['text'].strip() for p in data['paragraphs'] if p['text'].strip()]
    print(f"Non-empty paragraphs count: {len(non_empty)}")
    print("--- FIRST 15 PARAGRAPHS ---")
    for idx, p in enumerate(non_empty[:15]):
        print(f"[{idx+1}] {p[:120]}")
