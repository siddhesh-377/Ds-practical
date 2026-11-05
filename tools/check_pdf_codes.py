import json
from pathlib import Path

raw_dir = Path("extracted_raw")

for i in [1, 2, 3]:
    with open(raw_dir / f"Code {i}_pdf.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n==================== FULL TEXT FOR CODE {i} ====================")
    full_text = "\n---PAGE BREAK---\n".join(p['text'] for p in data['pages'])
    print(full_text[:3000])
    print("\n... [MIDDLE] ...\n")
    print(full_text[-2000:])
