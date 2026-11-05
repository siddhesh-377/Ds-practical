import json
from pathlib import Path

raw_dir = Path("extracted_raw")

for i in [1, 2, 3]:
    with open(raw_dir / f"Code {i}_pdf.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"==================== DUMPING CODE {i} COMPLETE ====================")
    full = ""
    for p in data['pages']:
        full += f"\n/* --- PAGE {p['page']} --- */\n" + p['text']
    with open(f"code_{i}_dump.txt", "w", encoding="utf-8") as out:
        out.write(full)
    print(f"Wrote code_{i}_dump.txt ({len(full)} chars)")
