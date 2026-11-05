import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

def map_docx(path):
    print(f"\n=================== {path.name} ===================")
    with zipfile.ZipFile(path, 'r') as z:
        rels = {}
        if 'word/_rels/document.xml.rels' in z.namelist():
            for rel in ET.fromstring(z.read('word/_rels/document.xml.rels')):
                rels[rel.attrib.get('Id')] = rel.attrib.get('Target')
        
        root = ET.fromstring(z.read('word/document.xml'))
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
              'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
        
        body = root.find('w:body', ns)
        last_text = ""
        for child in body:
            tag = child.tag.split('}')[-1]
            if tag == 'p':
                text = "".join(t.text for t in child.findall('.//w:t', ns) if t.text).strip()
                blips = child.findall('.//a:blip', ns)
                for b in blips:
                    for k, v in b.attrib.items():
                        if 'embed' in k and v in rels:
                            print(f"IMAGE: {rels[v]}")
                            print(f"  Context before: {last_text}")
                            print(f"  Current p text: {text}")
                if text:
                    last_text = text[:100]

map_docx(Path("Theory 1.docx"))
map_docx(Path("Theory 2.docx"))
map_docx(Path("Theory 8.docx"))
