import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
import shutil

# Check relationships in docx
def inspect_docx_structure(docx_path):
    print(f"\n================ Inspecting {docx_path.name} ================")
    with zipfile.ZipFile(docx_path, 'r') as z:
        # read document.xml.rels to get rId -> target
        rels = {}
        if 'word/_rels/document.xml.rels' in z.namelist():
            rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))
            for rel in rels_tree:
                r_id = rel.attrib.get('Id')
                target = rel.attrib.get('Target')
                rels[r_id] = target
        
        # read word/document.xml
        doc_xml = z.read('word/document.xml')
        root = ET.fromstring(doc_xml)
        
        # namespaces
        ns = {
            'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
            'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
            'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
            'blip': 'http://schemas.openxmlformats.org/drawingml/2006/main'
        }
        
        body = root.find('w:body', ns)
        if body is None:
            return
        
        item_count = 0
        for child in body:
            tag = child.tag.split('}')[-1]
            if tag == 'p':
                # check text
                text_elems = child.findall('.//w:t', ns)
                text = "".join(t.text for t in text_elems if t.text).strip()
                # check blip (images)
                blips = child.findall('.//a:blip', ns)
                image_targets = []
                for b in blips:
                    # check r:embed
                    for attr_name, attr_val in b.attrib.items():
                        if 'embed' in attr_name and attr_val in rels:
                            image_targets.append(rels[attr_val])
                if text or image_targets:
                    item_count += 1
                    if image_targets:
                        print(f"  [IMG] {image_targets} (Text: '{text[:60]}')")
                    elif text and item_count <= 10:
                        print(f"  [P] {text[:70]}")
            elif tag == 'tbl':
                print(f"  [TABLE]")

for i in [1, 2, 8, 9]:
    inspect_docx_structure(Path(f"Theory {i}.docx"))
