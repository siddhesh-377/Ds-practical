from pathlib import Path
from docx import Document
from pypdf import PdfReader

root = Path('.')
for path in sorted(root.glob('*'), key=lambda p: (p.suffix, p.name)):
    if path.suffix.lower() == '.docx':
        doc = Document(path)
        print(f'\n===== {path.name} | {len(doc.paragraphs)} paragraphs | {len(doc.tables)} tables =====')
        for i, paragraph in enumerate(doc.paragraphs):
            text = paragraph.text.strip().replace('\t', '    ')
            if text:
                print(f'[{i:03d}] {paragraph.style.name}: {text}')
        for ti, table in enumerate(doc.tables):
            print(f'[TABLE {ti}]')
            for row in table.rows:
                print(' | '.join(cell.text.replace('\n', ' / ') for cell in row.cells))
    elif path.suffix.lower() == '.pdf':
        reader = PdfReader(str(path))
        print(f'\n===== {path.name} | {len(reader.pages)} pages =====')
        for i, page in enumerate(reader.pages):
            print(f'[PAGE {i+1}]\n{page.extract_text() or ""}')
