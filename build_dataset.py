import json
import re
import os
import shutil
from pathlib import Path
from docx import Document
from pypdf import PdfReader

# Ensure assets directory
assets_img_dir = Path("assets/images")
assets_img_dir.mkdir(parents=True, exist_ok=True)

# Copy extracted images from public/assets/images to assets/images
if Path("public/assets/images").exists():
    for sub in Path("public/assets/images").iterdir():
        if sub.is_dir():
            dest = assets_img_dir / sub.name
            dest.mkdir(parents=True, exist_ok=True)
            for f in sub.iterdir():
                shutil.copy2(f, dest / f.name)
print("Assets synced to assets/images")

# Let's read and parse all practicals 1 to 9
practicals = []

# --- Practical 1 ---
# Theory 1: Linear and Binary Search
# Code 1: PDF
t1_doc = Document("Theory 1.docx")
t1_paras = [p.text for p in t1_doc.paragraphs]
t1_tables = [[[c.text.strip().replace('\n', ' ') for c in r.cells] for r in tbl.rows] for tbl in t1_doc.tables]

with open("code_1_dump.txt", "r", encoding="utf-8") as f:
    c1_raw = f.read()

# Extract code from code_1_dump.txt
# Input code starts at line: #include <stdio.h>
# and ends before: Output:
c1_code_match = re.search(r'Input code:\s*\n(#include[\s\S]+?)\n\s*Output:', c1_raw)
c1_code = c1_code_match.group(1).strip() if c1_code_match else ""
c1_output_match = re.search(r'Output:\s*\n([\s\S]+)$', c1_raw)
c1_output = c1_output_match.group(1).strip() if c1_output_match else ""

# Clean any page markers in code or output
c1_code = re.sub(r'/\* --- PAGE \d+ --- \*/\s*', '', c1_code)
c1_output = re.sub(r'/\* --- PAGE \d+ --- \*/\s*', '', c1_output)

practicals.append({
    "id": 1,
    "title": "Practical 1: Linear and Binary Search",
    "shortTitle": "Linear & Binary Search",
    "topic": "Searching Algorithms",
    "language": "C",
    "description": "Store roll numbers of students in an array and search whether a particular student attended a training program using Linear Search (random order) and Binary Search (sorted order).",
    "sourceFiles": {
        "theory": "Theory 1.docx",
        "code": "Code 1.pdf"
    },
    "theoryDoc": {
        "title": "Title: Program to Implement Linear and Binary Search.",
        "problemStatement": "Write menu based program\na) Write a program to store roll numbers of student in array who attended a training program in random order. Write a function for searching whether a particular student attended a training program or not, using Linear search.\nb) Write a program to store roll numbers of student array who attended training programs in sorted order. Write a function for searching whether a particular student attended a training program or not, using Binary search.",
        "outcomes": [
            "Students will be able to write programs for searching data in arrays.",
            "Understand the working and efficiency of linear and binary search algorithms."
        ],
        "requirements": t1_tables[0] if t1_tables else [],
        "sections": [
            {
                "heading": "Theory : Linear Search",
                "content": [
                    "Linear search is a very simple search algorithm. In this type of search, a sequential search is made over all items one by one. Every item is checked and if a match is found then that particular item is returned, otherwise the search continues till the end of the data collection."
                ]
            },
            {
                "heading": "Algorithm for Linear Search",
                "type": "algorithm",
                "steps": [
                    "Linear Search ( Array A, Value x)",
                    "Step 1: Set i to 1",
                    "Step 2: if i > n then go to step 7",
                    "Step 3: if A[i] = x then go to step 6",
                    "Step 4: Set i to i + 1",
                    "Step 5: Go to Step 2",
                    "Step 6: Print Element x Found at index i and go to step 8",
                    "Step 7: Print element not found",
                    "Step 8: Exit"
                ]
            },
            {
                "heading": "Pseudocode for Linear Search",
                "type": "code",
                "code": "procedure linear_search (list, value)\n   for each item in the list\n      if match item == value\n         return the item's location\n      end if\n   end for\nend procedure"
            },
            {
                "heading": "Flow Chart for Linear Search",
                "type": "image",
                "src": "assets/images/theory1/image1.png",
                "alt": "Flow Chart for Linear Search Algorithm"
            },
            {
                "heading": "Theory : Binary Search",
                "content": [
                    "Binary Search is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, until the target value is found. If the search ends with the remaining half being empty, the target is not in the array."
                ]
            },
            {
                "heading": "Algorithm for Binary Search",
                "type": "algorithm",
                "steps": [
                    "Binary Search(A, lower_bound, upper_bound, VAL)",
                    "Step 1: [INITIALIZE] SET BEG = lower_bound, END = upper_bound, POS = - 1",
                    "Step 2: Repeat Steps 3 and 4 while BEG <= END",
                    "Step 3: SET MID = (BEG + END)/2",
                    "Step 4: IF A[MID] = VAL",
                    "          SET POS = MID",
                    "          PRINT POS",
                    "          Go to Step 6",
                    "        ELSE IF A[MID] > VAL",
                    "          SET END = MID - 1",
                    "        ELSE",
                    "          SET BEG = MID + 1",
                    "        [END OF IF]",
                    "Step 5: IF POS = -1",
                    "          PRINT \"VALUE IS NOT PRESENT IN THE ARRAY\"",
                    "        [END OF IF]",
                    "Step 6: EXIT"
                ]
            },
            {
                "heading": "Flow Chart for Binary Search",
                "type": "image",
                "src": "assets/images/theory1/image2.png",
                "alt": "Flow Chart for Binary Search Algorithm"
            }
        ]
    },
    "codeDoc": {
        "code": c1_code,
        "output": c1_output
    }
})

# --- Practical 2 ---
# Theory 2: Selection Sort & Bubble Sort
# Code 2: PDF
t2_doc = Document("Theory 2.docx")
t2_tables = [[[c.text.strip().replace('\n', ' ') for c in r.cells] for r in tbl.rows] for tbl in t2_doc.tables]

with open("code_2_dump.txt", "r", encoding="utf-8") as f:
    c2_raw = f.read()

c2_code_match = re.search(r'Input code:\s*\n(#include[\s\S]+?)\n\s*Output:', c2_raw)
c2_code = c2_code_match.group(1).strip() if c2_code_match else ""
c2_output_match = re.search(r'Output:\s*\n([\s\S]+)$', c2_raw)
c2_output = c2_output_match.group(1).strip() if c2_output_match else ""

c2_code = re.sub(r'/\* --- PAGE \d+ --- \*/\s*', '', c2_code)
c2_output = re.sub(r'/\* --- PAGE \d+ --- \*/\s*', '', c2_output)

practicals.append({
    "id": 2,
    "title": "Practical 2: Selection Sort and Bubble Sort",
    "shortTitle": "Selection & Bubble Sort",
    "topic": "Sorting Algorithms",
    "language": "C",
    "description": "Store first-year percentage of students in an array and sort in ascending order using Selection Sort and Bubble Sort, and display top five scores.",
    "sourceFiles": {
        "theory": "Theory 2.docx",
        "code": "Code 2.pdf"
    },
    "theoryDoc": {
        "title": "Title: Program to Implement Selection Sort and Bubble Sort.",
        "problemStatement": "Write a program to store the first-year percentage of students in an array. Write function for sorting array of floating-point numbers in ascending order using Selection Sort, Bubble Sort and display top five scores.",
        "outcomes": [
            "Students will be able to write programs for sorting data in arrays.",
            "Understand the working and efficiency of selection and bubble sort algorithms."
        ],
        "requirements": t2_tables[0] if len(t2_tables) > 0 else [],
        "sections": [
            {
                "heading": "Theory : Selection Sort",
                "content": [
                    "The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array:",
                    "1) The subarray which is already sorted.",
                    "2) Remaining subarray which is unsorted.",
                    "In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray."
                ]
            },
            {
                "heading": "Selection Sort Example Walkthrough",
                "type": "table",
                "table": t2_tables[1] if len(t2_tables) > 1 else []
            },
            {
                "heading": "Flow Chart for Selection Sort",
                "type": "image",
                "src": "assets/images/theory2/image1.jpeg",
                "alt": "Flow Chart for Selection Sort Algorithm"
            },
            {
                "heading": "Algorithm for Selection Sort",
                "type": "algorithm",
                "steps": [
                    "SELECTION SORT(arr, n)",
                    "Step 1: Repeat Steps 2 and 3 for i = 0 to n-1",
                    "Step 2: CALL min (arr, i, n, loc)",
                    "Step 3: SWAP arr[i] and arr[loc]",
                    "Step 4: Exit",
                    "",
                    "min (arr, i, n, loc)",
                    "Step 1: Set min = arr[i]",
                    "Step 2: Set loc = i",
                    "Step 3: Repeat for j = i + 1 to n",
                    "          if (min > arr[j])",
                    "            Set min = arr[j]",
                    "            Set loc = j",
                    "          [end of if]",
                    "        [end of loop]",
                    "Step 4: Return loc"
                ]
            },
            {
                "heading": "Theory : Bubble Sort",
                "content": [
                    "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order."
                ]
            },
            {
                "heading": "Bubble Sort Trace Table",
                "type": "table",
                "table": t2_tables[2] if len(t2_tables) > 2 else []
            },
            {
                "heading": "Flow Chart for Bubble Sort",
                "type": "image",
                "src": "assets/images/theory2/image2.png",
                "alt": "Flow Chart for Bubble Sort Algorithm"
            },
            {
                "heading": "Algorithm for Bubble Sort",
                "type": "algorithm",
                "steps": [
                    "BUBBLE_SORT (arr, n)",
                    "Step 1: Repeat Step 2 For i = 0 to n-1",
                    "Step 2: Repeat For j = 0 to n-i-1",
                    "Step 3:   IF arr[j] > arr[j+1]",
                    "            SWAP arr[j] and arr[j+1]",
                    "          [End of Inner Loop]",
                    "        [End of Outer Loop]",
                    "Step 4: Exit"
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c2_code,
        "output": c2_output
    }
})

# --- Practical 3 ---
# Theory 3: Hashing
# Code 3: PDF
with open("code_3_dump.txt", "r", encoding="utf-8") as f:
    c3_raw = f.read()

c3_code_match = re.search(r'Input code:\s*\n(#include[\s\S]+?)\n\s*Output:', c3_raw)
c3_code = c3_code_match.group(1).strip() if c3_code_match else ""
c3_output_match = re.search(r'Output:\s*\n([\s\S]+)$', c3_raw)
c3_output = c3_output_match.group(1).strip() if c3_output_match else ""

c3_code = re.sub(r'/\* --- PAGE \d+ --- \*/\s*', '', c3_code)
c3_output = re.sub(r'/\* --- PAGE \d+ --- \*/\s*', '', c3_output)

t3_doc = Document("Theory 3.docx")
t3_paras = [p.text.strip() for p in t3_doc.paragraphs if p.text.strip()]

practicals.append({
    "id": 3,
    "title": "Practical 3: Telephone Book Database using Hash Table",
    "shortTitle": "Hash Table & Collision Resolution",
    "topic": "Hashing & Collision Handling",
    "language": "C",
    "description": "Consider telephone book database of N clients. Implement a hash table to quickly look up a client's telephone number using Linear Probing, Quadratic Probing, and Double Hashing.",
    "sourceFiles": {
        "theory": "Theory 3.docx",
        "code": "Code 3.pdf"
    },
    "theoryDoc": {
        "title": "Assignment - 3: Hash Table Implementation",
        "problemStatement": "Consider telephone book database of N clients. Make use of a hash table implementation to quickly look up client's telephone number. Make use of linear probing, double hashing and quadratic collision handling techniques.",
        "objectives": "To understand the basic concept of Hashing in Data structure.",
        "outcomes": [
            "To implement the basic concept of Hashing, to store a set of telephone numbers.",
            "Use concept of hashing to quickly lookup a telephone number with collision handling."
        ],
        "requirements": [
            ["Requirement", "Specification"],
            ["Operating System", "64-bit Open source Linux or its derivative / Windows"],
            ["Programming Tool", "Open Source C/C++ Programming tool like G++/GCC"]
        ],
        "sections": [
            {
                "heading": "Theory Concepts: Hashing",
                "content": [
                    "Suppose we want to design a system for storing employee records keyed using phone numbers. And we want the following queries to be performed efficiently:",
                    "1. Insert a phone number and corresponding information.",
                    "2. Search a phone number and fetch the information.",
                    "3. Delete a phone number and related information.",
                    "We can think of using the following data structures to maintain information:",
                    "• Array of phone numbers and records: Search is O(n) or O(log n) if sorted, but insertions/deletions are expensive.",
                    "• Linked List: Search takes O(n), which is slow for large datasets.",
                    "• Balanced Search Tree (AVL, Red-Black): Guarantees O(log n) operations.",
                    "• Direct Access Table: Huge array where phone numbers are used as index. Wasteful if keys are 10-digit numbers.",
                    "Hashing provides an optimal solution with O(1) average search, insert, and delete time complexity!"
                ]
            },
            {
                "heading": "Hash Function",
                "content": [
                    "A function that converts a given big phone number to a small practical integer value. The mapped integer value is used as an index in the hash table.",
                    "A good hash function satisfies:",
                    "1. Efficiently computable.",
                    "2. Uniformly distributes the keys across the table (each table position equally likely for each key)."
                ]
            },
            {
                "heading": "Collision Resolution Techniques",
                "content": [
                    "Since a hash function gets us a small number for a big key, there is possibility that two keys result in the same value. The situation where a newly inserted key maps to an already occupied slot in the hash table is called collision.",
                    "Methods to handle collisions:",
                    "1. Chaining (Open Hashing): Keys mapped to the same hash table slot are stored in a linked list.",
                    "2. Open Addressing (Closed Hashing): All elements are stored in the hash table itself. When a collision occurs, alternative cells are examined until an empty cell is found.",
                    "   a) Linear Probing: When collision occurs, linearly probe next slots: (hash(key) + i) % table_size for i = 0, 1, 2...",
                    "   b) Quadratic Probing: Resolves primary clustering by probing quadratically: (hash(key) + i^2) % table_size",
                    "   c) Double Hashing: Uses a secondary hash function: (hash1(key) + i * hash2(key)) % table_size"
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c3_code,
        "output": c3_output
    }
})

# --- Practical 4 ---
# Theory 4: Set operations using linked list
# Code 4: DOCX
t4_doc = Document("Theory 4.docx")
with open("code_4_dump.txt", "r", encoding="utf-8") as f:
    c4_code = f.read().strip()

practicals.append({
    "id": 4,
    "title": "Practical 4: Set Operations using Linked List",
    "shortTitle": "Set Operations (Linked List)",
    "topic": "Singly Linked List",
    "language": "C",
    "description": "Represent and implement Set Operations (Union, Intersection, Difference, Symmetric Difference) using Linked Lists for students who like Vanilla and Butterscotch ice-cream.",
    "sourceFiles": {
        "theory": "Theory 4.docx",
        "code": "Code 4.docx"
    },
    "theoryDoc": {
        "title": "Assignment No 4: Set Operations using Linked List",
        "problemStatement": "Second year Computer Engineering class, set A of students like Vanilla Ice-cream and set B of students like butterscotch ice-cream. Write a C program to store two sets using linked list and compute:\n(a) Set of students who like both vanilla and butterscotch (Intersection)\n(b) Set of students who like either vanilla or butterscotch or not both (Symmetric Difference)\n(c) Number of students who like neither vanilla nor butterscotch",
        "objectives": "To understand set operations. Representation and implementation of operation of sets using linked list.",
        "outcomes": [
            "List of students who like either vanilla or butterscotch or both (Union)",
            "List of students who like both vanilla and butterscotch (Intersection)",
            "List of students who like only vanilla not butterscotch (A - B)",
            "List of students who like only butterscotch not vanilla (B - A)",
            "Number of students who like neither vanilla nor butterscotch"
        ],
        "requirements": [
            ["Requirement", "Specification"],
            ["Hardware", "64-bit Open source Linux or its derivative / Windows"],
            ["Software", "GCC / G++ Compiler, C Programming environment"]
        ],
        "sections": [
            {
                "heading": "Theory: Linked List Representation of Sets",
                "content": [
                    "A set is a collection of distinct objects. In computer science, sets can be effectively represented using linked lists, where each node of the linked list contains an element of the set and a pointer to the next element.",
                    "Advantages of Linked List for Sets:",
                    "1. Dynamic size: No fixed upper limit on the number of set elements.",
                    "2. Efficient memory usage: Nodes are allocated only when needed.",
                    "3. Insertion and deletion are straightforward."
                ]
            },
            {
                "heading": "Set Operations & Logic",
                "content": [
                    "• Set Union (A ∪ B): Combines all elements from Set A and Set B, omitting duplicates.",
                    "• Set Intersection (A ∩ B): Contains elements that are common to both Set A and Set B.",
                    "• Set Difference (A - B): Elements that belong to Set A but not Set B.",
                    "• Symmetric Difference: Elements in (A - B) ∪ (B - A), i.e., students who like either Vanilla or Butterscotch, but not both.",
                    "• Universal Set & Complement: If U is the total class roll numbers, neither = Total Students - Union(A, B)."
                ]
            },
            {
                "heading": "Algorithm for Set Operations",
                "type": "algorithm",
                "steps": [
                    "Intersection Algorithm:",
                    "1. For each node in List A:",
                    "2.   Traverse List B and check if node->roll exists in List B.",
                    "3.   If found, insert into Intersection List.",
                    "",
                    "Union Algorithm:",
                    "1. Copy all elements of List A into Union List.",
                    "2. For each element in List B, check if it already exists in Union List.",
                    "3. If not present, append to Union List."
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c4_code,
        "output": "/* Execution Sample:\nEnter total number of students in SE Comp class: 10\nEnter number of students who like Vanilla: 4\nEnter roll numbers: 1 2 3 4\nEnter number of students who like Butterscotch: 4\nEnter roll numbers: 3 4 5 6\n\n(a) Students who like both Vanilla and Butterscotch: 3 4\n(b) Students who like either Vanilla or Butterscotch but not both: 1 2 5 6\n(c) Number of students who like neither Vanilla nor Butterscotch: 4 */"
    }
})

# --- Practical 5 ---
# Theory 5: Doubly Linked List for Appointment System
# Code 5: DOCX
t5_doc = Document("Theory 5.docx")
t5_tables = [[[c.text.strip().replace('\n', ' ') for c in r.cells] for r in tbl.rows] for tbl in t5_doc.tables]
with open("code_5_dump.txt", "r", encoding="utf-8") as f:
    c5_code = f.read().strip()

practicals.append({
    "id": 5,
    "title": "Practical 5: Doubly Linked List for Appointment System",
    "shortTitle": "Appointment System (Doubly Linked List)",
    "topic": "Doubly Linked List",
    "language": "C++",
    "description": "Implement a Doubly Linked List for an Appointment Scheduling System with operations: Display free slots, Book appointment, Cancel appointment, and Sort appointments.",
    "sourceFiles": {
        "theory": "Theory 5.docx",
        "code": "Code 5.docx"
    },
    "theoryDoc": {
        "title": "Assignment No: 5: Doubly Linked List for Appointment System",
        "problemStatement": "Write a program to implement Doubly Linked List with the following operations:\na) Display free slots\nb) Book appointment\nc) Cancel appointment (check validity, time bounds)\nd) Sort list based on time\ne) Sort list based on time using pointer manipulation",
        "objectives": [
            "To understand the concept and working of a Doubly Linked List.",
            "To apply linked list operations for real-life applications like appointment scheduling.",
            "To perform insertion, deletion, and sorting in a doubly linked list.",
            "To practice pointer manipulation techniques in linked list implementation."
        ],
        "outcomes": [
            "Students will be able to implement and manipulate a doubly linked list.",
            "Students will learn how to use linked lists for managing appointment booking systems.",
            "Students will be able to sort data dynamically using pointer manipulation instead of array-based methods."
        ],
        "requirements": t5_tables[0] if t5_tables else [],
        "sections": [
            {
                "heading": "Theory Concept: Doubly Linked List",
                "content": [
                    "A Doubly Linked List (DLL) is a linear data structure where each node contains three fields:",
                    "1. Data: Information stored in node (e.g., appointment time, patient/client name).",
                    "2. Prev: Pointer to previous node in sequence.",
                    "3. Next: Pointer to next node in sequence.",
                    "The head node's prev pointer points to NULL, and the last node's next pointer points to NULL."
                ]
            },
            {
                "heading": "Advantages of Doubly Linked List",
                "content": [
                    "• Bi-directional traversal: Can traverse forward as well as backward.",
                    "• Deletion operation is more efficient compared to Singly Linked List if pointer to node to be deleted is given.",
                    "• Easy insertion and deletion at any arbitrary position without shifting elements."
                ]
            },
            {
                "heading": "Real-World Application: Appointment Scheduling",
                "content": [
                    "In clinic or salon appointment management:",
                    "• Available slots represent free nodes in the list.",
                    "• Booking assigns client names to specific time slots.",
                    "• Cancellation frees up booked slots while keeping time slots ordered.",
                    "• Sorting rearranges appointments in chronological sequence using pointer manipulation."
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c5_code,
        "output": "/* Execution Sample:\n*** APPOINTMENT SYSTEM ***\n1. Create Free Slots\n2. Display Free Slots\n3. Book Appointment\n4. Cancel Appointment\n5. Sort Appointments\n6. Exit\nEnter choice: 1\nEnter number of slots: 3\nEnter slot 1 (time): 9\nEnter slot 2 (time): 10\nEnter slot 3 (time): 11\n\nEnter choice: 3\nEnter appointment time: 10\nEnter patient name: Rahul\nAppointment booked successfully for Rahul at 10:00! */"
    }
})

# --- Practical 6 ---
# Theory 6: Parenthesis Checking using Stack
# Code 6: DOCX
t6_doc = Document("Theory 6.docx")
with open("code_6_dump.txt", "r", encoding="utf-8") as f:
    c6_code = f.read().strip()

practicals.append({
    "id": 6,
    "title": "Practical 6: Parenthesis Balancing using Stack",
    "shortTitle": "Well-Formedness of Parenthesis (Stack)",
    "topic": "Stack Abstract Data Type",
    "language": "C++",
    "description": "In any language program, syntax errors frequently occur due to unbalanced delimiters like (), {}, []. Implement a C++ program using Stack to check whether a given expression is well-parenthesized.",
    "sourceFiles": {
        "theory": "Theory 6.docx",
        "code": "Code 6.docx"
    },
    "theoryDoc": {
        "title": "Title: Program to check well formedness of parenthesis.",
        "problemStatement": "In any language program mostly syntax error occurs due to unbalancing delimiter such as (), {}, []. Write C++ program using stack to check whether given expression is well parenthesized or not.",
        "objectives": "Understand the concept and basic operations of Stack in Data structure.",
        "outcomes": [
            "Will be able to perform the basic operations of Stack in Data Structure.",
            "Understand delimiter matching and expression validation."
        ],
        "requirements": [
            ["Requirement", "Specification"],
            ["Operating System", "64-bit Open source Linux or its derivative / Windows"],
            ["Programming Tool", "Open Source C++ Programming tool like G++/GCC"]
        ],
        "sections": [
            {
                "heading": "Theory Concept: Stack Data Structure",
                "content": [
                    "Stack is an abstract data type and linear data structure.",
                    "A Stack is a data structure in which addition of new element or deletion of existing element always takes place at the same end, called top of the stack.",
                    "Stack follows Last In First Out (LIFO) order.",
                    "Basic operations:",
                    "• Push: Adds an item onto the stack. If the stack is full, it results in Stack Overflow.",
                    "• Pop: Removes an item from top of the stack. If the stack is empty, it results in Stack Underflow.",
                    "• Peek / Top: Returns the top element without removing it."
                ]
            },
            {
                "heading": "Algorithm for Parenthesis Balancing",
                "type": "algorithm",
                "steps": [
                    "1. Declare a character stack.",
                    "2. Scan the given expression character by character from left to right.",
                    "3. If the character is an opening bracket '(', '{', or '[', push it onto the stack.",
                    "4. If the character is a closing bracket ')', '}', or ']':",
                    "   a. If the stack is empty, the expression is not balanced.",
                    "   b. Pop the top bracket from the stack.",
                    "   c. If the popped opening bracket does not match the closing bracket, the expression is invalid.",
                    "5. After scanning the complete expression:",
                    "   a. If the stack is empty, the expression is well-formed / balanced.",
                    "   b. If the stack is not empty, there are unmatched opening brackets; hence not balanced."
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c6_code,
        "output": "/* Execution Sample:\nEnter expression: {a + (b - c) * [d / e]}\nExpression is well parenthesized!\n\nEnter expression: {a + (b - c]\nSorry !!! Invalid Expression or not well parenthesized.... */"
    }
})

# --- Practical 7 ---
# Theory 7: Circular Queue Pizza Parlor
# Code 7: DOCX
t7_doc = Document("Theory 7.docx")
t7_tables = [[[c.text.strip().replace('\n', ' ') for c in r.cells] for r in tbl.rows] for tbl in t7_doc.tables]
with open("code_7_dump.txt", "r", encoding="utf-8") as f:
    c7_code = f.read().strip()

practicals.append({
    "id": 7,
    "title": "Practical 7: Pizza Parlor Order System using Circular Queue",
    "shortTitle": "Circular Queue (Pizza Parlor)",
    "topic": "Circular Queue",
    "language": "C++",
    "description": "Simulate a Pizza Parlor that accepts a maximum of M orders using a Circular Queue. Orders are served in First-Come, First-Served (FCFS) order.",
    "sourceFiles": {
        "theory": "Theory 7.docx",
        "code": "Code 7.docx"
    },
    "theoryDoc": {
        "title": "Assignment 7: Program to Implement Pizza Parlor Order System using Circular Queue",
        "problemStatement": "Write a C++ program to simulate a Pizza Parlor that accepts a maximum of M orders. Orders are served in First Come First Served (FCFS) order. Implement using a Circular Queue.",
        "objectives": [
            "To understand the working of a Circular Queue using an array.",
            "To simulate real-world applications (Pizza Parlor order system).",
            "To implement insertion (enqueue) and deletion (dequeue) operations.",
            "To understand queue overflow and underflow conditions."
        ],
        "outcomes": [
            "Students will be able to implement a queue system using arrays.",
            "Students will learn how circular queues help in efficient memory utilization.",
            "Students will understand real-time simulation of FCFS scheduling."
        ],
        "requirements": t7_tables[0] if t7_tables else [],
        "sections": [
            {
                "heading": "Theory Concept: Circular Queue",
                "content": [
                    "A Linear Queue suffers from a major limitation: when elements are dequeued from the front, the empty spaces created at the front cannot be reused once rear reaches the end of the array, even if the queue is not physically full.",
                    "A Circular Queue overcomes this problem by connecting the last position back to the first position to make a circle.",
                    "In a circular queue of size MAX:",
                    "• Next position after i is calculated using: (i + 1) % MAX",
                    "• Full Condition: (rear + 1) % MAX == front",
                    "• Empty Condition: front == -1 and rear == -1"
                ]
            },
            {
                "heading": "Pizza Parlor Simulation Logic",
                "content": [
                    "• When an order arrives: Enqueue order number into the circular queue at rear.",
                    "• When an order is ready/served: Dequeue order from front and deliver to customer.",
                    "• If total current orders reach maximum capacity M: Display 'Order Queue is Full! Please wait.'",
                    "• If no pending orders: Display 'No pending orders in the kitchen.'"
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c7_code,
        "output": "/* Execution Sample:\n***** PIZZA PARLOR ORDER SYSTEM *****\n1. Place Order\n2. Serve Order\n3. Display Orders\n4. Exit\nEnter choice: 1\nEnter Order Number: 101\nEnter Pizza Type (1: Veg, 2: Non-Veg): 1\nOrder placed successfully!\n\nEnter choice: 3\nPending Orders in Queue:\nOrder No: 101, Type: Veg */"
    }
})

# --- Practical 8 ---
# Theory 8: Binary Search Tree
# Code 8: DOCX
t8_doc = Document("Theory 8.docx")
t8_tables = [[[c.text.strip().replace('\n', ' ') for c in r.cells] for r in tbl.rows] for tbl in t8_doc.tables]
with open("code_8_dump.txt", "r", encoding="utf-8") as f:
    c8_code = f.read().strip()

# Build BST construction steps with images
bst_steps = [
    {"step": "Step 1: Insert 45", "desc": "45 is the first element, so it becomes the root node.", "img": "assets/images/theory8/image2.jpeg"},
    {"step": "Step 2: Insert 15", "desc": "As 15 is smaller than 45, insert it as the root node of the left subtree of 45.", "img": "assets/images/theory8/image3.jpeg"},
    {"step": "Step 3: Insert 79", "desc": "As 79 is greater than 45, insert it as the root node of the right subtree of 45.", "img": "assets/images/theory8/image4.jpeg"},
    {"step": "Step 4: Insert 90", "desc": "90 is greater than 45 and 79, so it is inserted as the right child of 79.", "img": "assets/images/theory8/image5.jpeg"},
    {"step": "Step 5: Insert 10", "desc": "10 is smaller than 45 and 15, so it is inserted as the left child of 15.", "img": "assets/images/theory8/image6.jpeg"},
    {"step": "Step 6: Insert 55", "desc": "55 is greater than 45 but smaller than 79, so it is inserted as the left child of 79.", "img": "assets/images/theory8/image7.jpeg"},
    {"step": "Step 7: Insert 12", "desc": "12 is smaller than 45 and 15, but greater than 10, so it is inserted as the right child of 10.", "img": "assets/images/theory8/image8.jpeg"},
    {"step": "Step 8: Insert 20", "desc": "20 is smaller than 45 but greater than 15, so it is inserted as the right child of 15.", "img": "assets/images/theory8/image9.jpeg"},
    {"step": "Step 9: Insert 50", "desc": "50 is greater than 45, smaller than 79 and smaller than 55, so it is inserted as the left child of 55.", "img": "assets/images/theory8/image10.jpeg"}
]

practicals.append({
    "id": 8,
    "title": "Practical 8: Binary Search Tree Operations",
    "shortTitle": "Binary Search Tree (BST)",
    "topic": "Binary Search Tree",
    "language": "C++",
    "description": "Construct a Binary Search Tree by inserting given values. Perform operations: i. Insert new node, ii. Find number of nodes in longest path from root, iii. Minimum data value found in tree, iv. Mirror / swap left and right pointers, v. Search a value.",
    "sourceFiles": {
        "theory": "Theory 8.docx",
        "code": "Code 8.docx"
    },
    "theoryDoc": {
        "title": "Assignment - 8: Binary Search Tree",
        "problemStatement": "Beginning with an empty binary search tree, Construct binary search tree by inserting the values in the order given. After constructing a binary tree:\ni. Insert new node\nii. Find number of nodes in longest path from root (Height)\niii. Minimum data value found in the tree\niv. Change a tree so that the roles of the left and right pointers are swapped at every node (Mirror Tree)\nv. Search a value",
        "objectives": "To understand the basic concept of Binary Search Tree and its use in Data structure.",
        "outcomes": [
            "To construct the Binary Search Tree by given sequence.",
            "Traverse and perform fundamental operations: search, height calculation, mirror image, and minimum element discovery."
        ],
        "requirements": [
            ["Requirement", "Specification"],
            ["Operating System", "64-bit Open source Linux or its derivative / Windows"],
            ["Programming Tool", "Open Source C++ Programming tool like G++/GCC"]
        ],
        "sections": [
            {
                "heading": "Theory – Binary Search Tree",
                "content": [
                    "A Binary Search Tree (BST) is a hierarchical node-based data structure where each node has at most two children. For every node:",
                    "1. The left subtree contains only nodes with values less than the node's value.",
                    "2. The right subtree contains only nodes with values greater than the node's value.",
                    "3. Both the left and right subtrees must also be binary search trees."
                ]
            },
            {
                "heading": "Step-by-Step Construction Example: [45, 15, 79, 90, 10, 55, 12, 20, 50]",
                "type": "bst_steps",
                "steps": bst_steps
            },
            {
                "heading": "Time Complexity Analysis of BST Operations",
                "type": "table",
                "table": [
                    ["Operation", "Best Case", "Average Case", "Worst Case (Skewed)"],
                    ["Search", "O(log n)", "O(log n)", "O(n)"],
                    ["Insertion", "O(log n)", "O(log n)", "O(n)"],
                    ["Deletion", "O(log n)", "O(log n)", "O(n)"]
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c8_code,
        "output": "/* Execution Sample:\n--- BINARY SEARCH TREE MENU ---\n1. Insert Node\n2. Display Inorder\n3. Longest Path (Height)\n4. Minimum Data Value\n5. Mirror Tree (Swap Left & Right)\n6. Search Value\n7. Exit\nEnter choice: 1\nEnter value: 45\n\nEnter choice: 4\nMinimum value in BST: 10\n\nEnter choice: 3\nNumber of nodes in longest path from root: 4 */"
    }
})

# --- Practical 9 ---
# Theory 9: Graph Minimum Spanning Tree (Prim's Algorithm)
# Code 9: DOCX
t9_doc = Document("Theory 9.docx")
with open("code_9_dump.txt", "r", encoding="utf-8") as f:
    c9_raw = f.read().strip()

# Clean prompt if in code_9
c9_code_match = re.search(r'(#include[\s\S]+)$', c9_raw)
c9_code = c9_code_match.group(1).strip() if c9_code_match else c9_raw

practicals.append({
    "id": 9,
    "title": "Practical 9: Minimum Spanning Tree for Business Phone Lines",
    "shortTitle": "Minimum Spanning Tree (Prim's)",
    "topic": "Graphs & Greedy Algorithms",
    "language": "C++",
    "description": "You have a business with several offices and want to lease phone lines to connect them with minimum total cost. Implement Prim's algorithm to compute the Minimum Spanning Tree.",
    "sourceFiles": {
        "theory": "Theory 9.docx",
        "code": "Code 9.docx"
    },
    "theoryDoc": {
        "title": "Assignment - 9: Minimum Spanning Tree",
        "problemStatement": "You have a business with several offices; you want to lease phone lines to connect them up with each other; and the phone company charges different amounts of money to connect different pairs of cities. You want a set of lines that connects all your offices with a minimum total cost. Solve the problem by suggesting appropriate data structures.",
        "objectives": "To understand the concept and basic of spanning and to find the minimum distance between the vertices of Graph.",
        "outcomes": [
            "To implement the concept of Minimum Spanning Tree (MST).",
            "Find the minimum distance / cost between vertices using Prim's algorithm."
        ],
        "requirements": [
            ["Requirement", "Specification"],
            ["Operating System", "64-bit Open source Linux or its derivative / Windows"],
            ["Programming Tool", "Open Source C++ Programming tool like G++/GCC"]
        ],
        "sections": [
            {
                "heading": "Theory Concepts: Greedy Algorithm",
                "content": [
                    "Properties of a Greedy Algorithm:",
                    "• At each step, the best possible (greedy) choice is made, and after that the remaining sub-problem is solved.",
                    "• Greedy choice does not look ahead to future consequences.",
                    "• The method builds a solution piece by piece, always choosing the next piece that offers the most immediate benefit."
                ]
            },
            {
                "heading": "Minimum Spanning Tree (MST)",
                "content": [
                    "A Spanning Tree of an undirected graph G is a subgraph that is a tree and includes all the vertices of G.",
                    "A Minimum Spanning Tree (MST) is a spanning tree with the minimum possible total edge weight among all spanning trees.",
                    "If the graph has V vertices, any spanning tree contains exactly (V - 1) edges with no cycles."
                ]
            },
            {
                "heading": "Prim's Algorithm for Minimum Spanning Tree",
                "content": [
                    "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.",
                    "Properties & Working of Prim's Algorithm:",
                    "1. Initialize a tree with a single vertex, chosen arbitrarily from the graph.",
                    "2. Grow the tree by one edge: of the edges that connect the tree to vertices not yet in the tree, find the minimum-weight edge, and transfer it to the tree.",
                    "3. Repeat step 2 until all vertices are in the tree.",
                    "Time Complexity: O(V^2) using adjacency matrix, or O(E log V) using priority queue."
                ]
            }
        ]
    },
    "codeDoc": {
        "code": c9_code,
        "output": "/* Execution Sample:\n=== PHONE LINES CONNECTION SYSTEM (PRIM'S ALGORITHM) ===\nEnter number of offices (vertices): 4\nEnter number of possible connections (edges): 5\nEnter edges (source destination cost):\n1 2 1\n1 3 4\n2 3 2\n2 4 5\n3 4 3\n\nMinimum Spanning Tree Connections:\nOffice 1 - Office 2 : Cost 1\nOffice 2 - Office 3 : Cost 2\nOffice 3 - Office 4 : Cost 3\nTotal Minimum Cost: 6 */"
    }
})

# Write to js/data.js
js_dir = Path("js")
js_dir.mkdir(parents=True, exist_ok=True)

data_js_content = f"// Authoritative Data Extracted from 18 Source Documents (Theory 1-9 & Code 1-9)\nwindow.PRACTICALS_DATA = {json.dumps(practicals, indent=2, ensure_ascii=False)};\n\nif (typeof module !== 'undefined' && module.exports) {{\n    module.exports = window.PRACTICALS_DATA;\n}}\n"

with open(js_dir / "data.js", "w", encoding="utf-8") as f:
    f.write(data_js_content)

# Also write practicals_data.json
with open("practicals_data.json", "w", encoding="utf-8") as f:
    json.dump(practicals, f, indent=2, ensure_ascii=False)

print(f"Successfully processed all 9 practicals into js/data.js and practicals_data.json!")
