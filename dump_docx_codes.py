import json
from pathlib import Path

raw_dir = Path("extracted_raw")

for i in range(4, 10):
    with open(raw_dir / f"Code {i}_docx.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"==================== DUMPING CODE {i} DOCX ====================")
    lines = [p['text'] for p in data['paragraphs']]
    full = "\n".join(lines)
    with open(f"code_{i}_dump.txt", "w", encoding="utf-8") as out:
        out.write(full)
    print(f"Wrote code_{i}_dump.txt ({len(full)} chars)")
