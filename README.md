# DSA Practical Revision Portal

> Professional, high-contrast academic developer dashboard for Data Structures & Algorithms Laboratory Practicals 1 through 9.
> Built with HTML5, Vanilla CSS, and Modern JavaScript. Zero external frontend framework dependencies, zero backend required.

---

## 📌 1. Project Overview & Architecture

The **DSA Practical Revision Portal** is an authoritative revision dashboard built specifically for university engineering students and educators. Every practical is linked directly to its original source documents (PDFs and DOCX files), preserving the exact problem statements, algorithms, step-by-step procedures, C/C++ source code, diagrams, flowcharts, and sample execution outputs.

### Architecture Highlights:
- **Instant Client-Side Navigation**: Nine laboratory practicals accessible via a persistent sidebar or responsive drawer.
- **Synchronized Tri-Tab Workspace**:
  - **Theory & Algorithm Tab**: Complete problem statements, expected outcomes, hardware/software specifications, algorithms, trace tables, and embedded diagrams (flowcharts, BST construction steps).
  - **Source Code Tab**: Monospaced, high-contrast syntax-highlighted C/C++ viewer with line numbering, word-wrap toggle, dynamic font-size scaling, copy-to-clipboard, and direct file download.
  - **Execution Output Tab**: Realistic terminal viewer with sample input/output runs and execution metrics.
- **Deep Search**: Instant query filtering matching across titles, topics, algorithms, problem statements, and code symbols.
- **Developer Keyboard Shortcuts**:
  - `←` / `→` : Previous / Next practical
  - `1` - `9` : Jump directly to Practical 1 through 9
  - `T` : Switch to Theory tab
  - `C` : Switch to Source Code tab
  - `O` : Switch to Execution Output tab

---

## 🗂️ 2. Authoritative Document Mapping (18 Source Files)

| Practical | Title / Topic | Theory Source | Code Source | Implementation Language |
|---|---|---|---|---|
| **Practical 1** | Linear and Binary Search | `Theory 1.docx` | `Code 1.pdf` | C (ANSI C99) |
| **Practical 2** | Selection Sort & Bubble Sort | `Theory 2.docx` | `Code 2.pdf` | C (ANSI C99) |
| **Practical 3** | Hash Table (Linear, Quadratic & Double Hashing) | `Theory 3.docx` | `Code 3.pdf` | C (ANSI C99) |
| **Practical 4** | Set Operations using Linked List | `Theory 4.docx` | `Code 4.docx` | C (ANSI C99) |
| **Practical 5** | Appointment System (Doubly Linked List) | `Theory 5.docx` | `Code 5.docx` | C++ (C++17) |
| **Practical 6** | Well-Formedness of Parenthesis (Stack) | `Theory 6.docx` | `Code 6.docx` | C++ (C++17) |
| **Practical 7** | Circular Queue Pizza Parlor Order System | `Theory 7.docx` | `Code 7.docx` | C++ (C++17) |
| **Practical 8** | Binary Search Tree (BST) Operations & Construction | `Theory 8.docx` | `Code 8.docx` | C++ (C++17) |
| **Practical 9** | Minimum Spanning Tree (Prim's Algorithm) | `Theory 9.docx` | `Code 9.docx` | C++ (C++17) |

---

## 💻 3. File & Directory Structure

```text
Ds practical/
├── index.html                   # Master HTML5 Dashboard
├── vercel.json                  # Vercel deployment & security headers configuration
├── README.md                    # Comprehensive documentation & deployment guide
├── styles/
│   ├── main.css                 # Dark slate theme tokens & responsive dashboard layout
│   └── code.css                 # High-contrast C/C++ syntax highlighting theme
├── js/
│   ├── data.js                  # Complete authoritative dataset extracted from all 18 documents
│   ├── highlight.js             # High-speed C/C++ syntax highlighter & line number generator
│   └── app.js                   # Application state, tabs, search, toast notifications, keyboard shortcuts
├── assets/
│   └── images/                  # Extracted high-resolution flowcharts & diagrams
│       ├── theory1/             # Linear search & binary search flowcharts
│       ├── theory2/             # Selection sort & bubble sort flowcharts
│       ├── theory8/             # 9-step Binary Search Tree insertion diagrams
│       └── theory9/             # Network graph diagram
├── build_dataset.py             # Automated document processor & validator
└── extracted_raw/               # Raw JSON intermediate verification dumps
```

---

## 🚀 4. Local Execution & Testing

No package managers or backend servers are required. You can run the application directly using any local static file server:

### Option A: Using Python (Recommended)
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in any web browser.

### Option B: Using Node.js (npx serve)
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 5. GitHub Repository Setup Instructions

To push this codebase to a public GitHub repository:

1. Initialize git in the project root:
   ```bash
   git init
   git branch -M main
   ```
2. Create `.gitignore` to exclude temporary virtual environments or caches:
   ```bash
   echo "__pycache__/\n*.pyc\n.vscode/\n" > .gitignore
   ```
3. Stage and commit all files:
   ```bash
   git add .
   git commit -m "feat: complete DSA practical revision portal for practicals 1-9"
   ```
4. Create a new repository on [GitHub](https://github.com/new) named `dsa-practical-revision-portal`.
5. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/dsa-practical-revision-portal.git
   git push -u origin main
   ```

---

## ☁️ 6. Vercel Deployment Instructions

Deploying this portal to **Vercel** takes under 1 minute:

### Method 1: Automatic Git Deployment (Recommended)
1. Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **"Add New..."** &rarr; **"Project"**.
3. Select your repository `dsa-practical-revision-portal` from the GitHub list.
4. Framework Preset: Leave as **"Other"** (Plain HTML/CSS/JS).
5. Root Directory: `./` (default).
6. Click **"Deploy"**.
7. Vercel will build and assign a production URL (e.g., `https://dsa-practical-revision-portal.vercel.app`).

### Method 2: Instant CLI Deployment
From within the project directory:
```bash
npx vercel
```
Follow the interactive prompts to deploy directly.

---

## ✅ 7. Testing & Quality Validation Checklist

- [x] **Document Integrity**: All 18 source documents (Theory 1-9 & Code 1-9) completely extracted without fabrication or modification.
- [x] **Practical Selection**: 9 interactive sidebar buttons accurately switch practical contexts.
- [x] **Synchronized Tabs**: Theory and Code tabs present for all practicals; Execution Output tab provides verified terminal sample runs.
- [x] **Syntax Highlighting**: High-contrast C/C++ tokens for keywords, types, preprocessors, strings, comments, numbers, and functions.
- [x] **Diagrams & Flowcharts**: Embedded flowcharts for searching/sorting algorithms and 9 step-by-step diagrammatic insertion stages for Binary Search Tree.
- [x] **Interactive Controls**:
  - Code copy with toast feedback.
  - Source file download (`.c` / `.cpp`).
  - Font scaling (`A+`, `A-`).
  - Word wrapping toggle.
- [x] **Keyboard Navigation**: Arrows `←` / `→` for sequential review, keys `1`-`9` for instant jumps, keys `T`, `C`, `O` for tab switching.
- [x] **Responsive Layout**: Fluid desktop dashboard with collapsible off-canvas drawer on mobile devices.
