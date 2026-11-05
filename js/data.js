// Authoritative Data Extracted from 18 Source Documents (Theory 1-9 & Code 1-9)
window.PRACTICALS_DATA = [
  {
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
      "requirements": [
        [
          "Requirement",
          "Specification"
        ],
        [
          "Programming Language",
          "C++ / C"
        ],
        [
          "Compiler",
          "GCC / G++"
        ],
        [
          "Hardware",
          "i3 or above, 4 GB RAM or more"
        ],
        [
          "OS",
          "Windows/Linux"
        ]
      ],
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
      "code": "#include <stdio.h> \nvoid linearSearch(int a[], int n, int key); \nvoid binarySearch(int a[], int n, int key); \nvoid sortArray(int a[], int n); \n \nint main() \n { \n    int a[50], n = 0, ch, i, key; \n \n    do \n    { \n \n        printf(\"\\nMenu:\\n1. Linear search\\n2. Binary search\\n3. Exit\\n\"); \n        printf(\"Enter your choice: \"); \n        if (scanf(\"%d\" , &ch) != 1) \n            break; \n \n        if (ch == 1 || ch == 2) \n        { \nprintf(\"Enter no of students: \"); \n            scanf(\"%d\" , &n); \n \n            printf(\"Enter roll numbers:\\n\" , n); \n            for (i = 0; i < n; i++) \n            { \n                scanf(\"%d\" , &a[i]); \n            } \n \n            printf(\"Enter rollno to be searched :\"); \n            scanf(\"%d\" , &key); \n        } \n \n        switch (ch) \n        { \n            case 1: \n                linearSearch(a, n, key); \n                break; \n \n            case 2: \n \n                sortArray(a, n); \n                for (i = 0; i < n; i++) printf(\"%d \" , a[i]); \n                printf(\"\\n\"); \n \n                binarySearch(a, n, key); \n                break; \n \ncase 3: \n                printf(\"Exiting program.\\n\"); \n                break; \n \n            default: \n                printf(\"Invalid choice! Please try again.\\n\"); \n                break; \n        } \n    } while (ch != 3); \n \n    return 0; \n} \n \nvoid linearSearch(int a[], int n, int key) \n{ \n    int i, found = 0; \n \n    for (i = 0; i < n; i++)  \n{ \n        if (a[i] == key)  \n       { \n            printf(\"Element found at index %d (position %d)\\n\" , i, i + 1); \n            found = 1; \n            break; \n        } \n    } \n if (!found) \n     { \nprintf(\"Element not found in the array!\\n\"); \n    } \n} \nvoid binarySearch(int a[], int n, int key) \n { \n    int low = 0, high = n - 1, mid; \n    int found = 0; \n \n    while (low <= high) \n    { \n        mid = low + (high - low) / 2; \n \n        if (a[mid] == key) \n        { \n            printf(\"Element found at index %d (position %d)\\n\" , mid, mid + 1); \n            found = 1; \n            break; \n        } else if (a[mid] < key) \n         { \n            low = mid + 1; \n        } else { \n            high = mid - 1; \n        } \n    } \n \n    if (!found) { \n        printf(\"Element not found in the array!\\n\"); \n    } \n} \nvoid sortArray(int a[], int n)  \n{ \n    int i, j, temp; \n    for (i = 0; i < n - 1; i++) { \n        for (j = 0; j < n - i - 1; j++) \n       { \n            if (a[j] > a[j + 1]) { \n                temp = a[j]; \n                a[j] = a[j + 1]; \n                a[j + 1] = temp; \n            } \n        } \n    } \n}",
      "output": "Menu: \n1. Linear search \n2. Binary search \n3. Exit \nEnter your choice: 1 \nEnter no of students: 6 \nEnter roll numbers: \n53 24 34 12 2 6 \nEnter rollno to be searched: 12 \nElement found at index 3 (position 4) \nMenu: \n1. Linear search \n2. Binary search \n3. Exit \nEnter your choice: 2 \nEnter no of students: 5 \nEnter roll numbers: \n8 64 75 46 51 \nEnter rollno to be searched :40 \n8 46 51 64 75 \nElement not found in the array!"
    }
  },
  {
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
      "requirements": [
        [
          "Requirement",
          "Specification"
        ],
        [
          "Programming Language",
          "C++ / C"
        ],
        [
          "Compiler",
          "GCC / G++"
        ],
        [
          "Hardware",
          "i3 or above, 4 GB RAM or more"
        ],
        [
          "OS",
          "Windows/Linux"
        ]
      ],
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
          "table": [
            [
              "Index",
              "0",
              "1",
              "2",
              "3",
              "4",
              "Remarks"
            ],
            [
              "List",
              "64",
              "25",
              "12",
              "22",
              "11",
              "Find the minimum element in a[0 .. 4] and place it at beginning."
            ],
            [
              "Iteration 1",
              "11",
              "25",
              "12",
              "22",
              "64",
              "Find the minimum element in a[1 .. 4] and place it at beginning of a[1 .. 4]"
            ],
            [
              "Iteration 2",
              "11",
              "12",
              "25",
              "22",
              "64",
              "Find the minimum element in a[2 .. 4] and place it at beginning of a[2 .. 4]"
            ],
            [
              "Iteration 3",
              "11",
              "12",
              "22",
              "25",
              "64",
              "Find the minimum element in a[3 .. 4] and place it at beginning of a[3 .. 4]"
            ],
            [
              "Iteration 4",
              "11",
              "12",
              "22",
              "25",
              "64",
              "Finally the list is sorted."
            ]
          ]
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
          "table": [
            [
              "Example: Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are not in order. First Pass",
              "Example: Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are not in order. First Pass",
              "Example: Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are not in order. First Pass",
              "Example: Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are not in order. First Pass",
              "Example: Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are not in order. First Pass",
              "Example: Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are not in order. First Pass"
            ],
            [
              "5",
              "1",
              "4",
              "2",
              "8",
              "Compare the first two elements, and swaps since 5 > 1"
            ],
            [
              "1",
              "5",
              "4",
              "2",
              "8",
              "Compare 5 and 4 and swap since 5 > 4"
            ],
            [
              "1",
              "4",
              "5",
              "2",
              "8",
              "Compare 5 and 2 and swap since 5 > 2"
            ],
            [
              "1",
              "4",
              "2",
              "5",
              "8",
              "Compare 5 and 8 and since 5 < 8, noswap."
            ],
            [
              "Second Pass",
              "Second Pass",
              "Second Pass",
              "Second Pass",
              "Second Pass",
              "Second Pass"
            ],
            [
              "1",
              "4",
              "2",
              "5",
              "8",
              "Compare the first two elements, and as 1 < 4, no swap."
            ],
            [
              "1",
              "4",
              "2",
              "5",
              "8",
              "Compare 4 and 2, swap since 4 > 2"
            ],
            [
              "1",
              "2",
              "4",
              "5",
              "8",
              "Compare 4 and 5, no swap."
            ],
            [
              "1",
              "2",
              "4",
              "5",
              "8",
              "Compare 5 and 8 and no swap."
            ],
            [
              "Third Pass",
              "Third Pass",
              "Third Pass",
              "Third Pass",
              "Third Pass",
              "Third Pass"
            ],
            [
              "1",
              "2",
              "4",
              "5",
              "8",
              "Compare the first two elements and no swap."
            ],
            [
              "1",
              "2",
              "4",
              "5",
              "8",
              "Compare 2 and 4, no swap."
            ],
            [
              "1",
              "2",
              "4",
              "5",
              "8",
              "Compare 4 and 5, no swap."
            ],
            [
              "1",
              "2",
              "4",
              "5",
              "8",
              "Compare 5 and 8, no swap."
            ]
          ]
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
      "code": "#include <stdio.h> \n#include <stdlib.h> \n#define MAX_STUD 100 \n \nint main() \n{ \n    float percentage[MAX_STUD]; \n    int num = 0, ch, i, j; \n    float temp; \n \n    do \n    { \n        printf(\"__Student percentage management system__\\n\"); \n        printf(\"1.Enter student percentage\\n2.Selection sort\\n3.Bubble sort\\n4.Top 5\\n5.Display \nall student percentage\\n6.exit\\n\"); \n        printf(\"Enter your choice:\"); \n        scanf(\"%d\",&ch); \n        switch(ch) \n        { \n            case 1: \n                printf(\"Enter number of students (max %d): \", MAX_STUD); \n                scanf(\"%d\", &num); \n                if(num > MAX_STUD || num <= 0) \n{ \n                    printf(\"Insert a valid count!\\n\"); \n                    num = 0; \n                } \n                else \n                { \n                    printf(\"Enter percentages of students:\\n\"); \n                    for(i = 0; i < num; i++) \n                    { \n                        printf(\"Percentage of student %d: \", i + 1); \n                        scanf(\"%f\", &percentage[i]); \n                    } \n                } \n                break; \n \n            case 2: \n                if(num == 0) \n                { \n                    printf(\"No student data available! Please enter data first.\\n\"); \n                    break; \n                } \n                for(i = 0; i < num - 1; i++) \n                { \n                    int min = i; \n                    for(j = i + 1; j < num; j++) \n                    { \n                        if(percentage[j] < percentage[min]) \n                        { \n                            min = j; \n} \n                    } \n                    if(min != i) \n                    { \n                        temp = percentage[i]; \n                        percentage[i] = percentage[min]; \n                        percentage[min] = temp; \n                    } \n                } \n                printf(\"\\nPercentages sorted (Ascending) using Selection Sort:\\n\"); \n                for(i = 0; i < num; i++) \n                { \n                    printf(\"%.2f%%\\n\", percentage[i]); \n                } \n                break; \n \n            case 3: \n                if(num == 0) \n                { \n                    printf(\"No student data available! Please enter data first.\\n\"); \n                    break; \n                } \n                for(i = 0; i < num - 1; i++) \n                { \n                    for(j = 0; j < num - 1 - i; j++) \n                    { \n                        if(percentage[j] > percentage[j + 1]) \n                        { \n                            temp = percentage[j]; \npercentage[j] = percentage[j + 1]; \n                            percentage[j + 1] = temp; \n                        } \n                    } \n                } \n                printf(\"\\nPercentages sorted (Ascending) using Bubble Sort:\\n\"); \n                for(i = 0; i < num; i++) \n                { \n                    printf(\"%.2f%%\\n\", percentage[i]); \n                } \n                break; \n \n            case 4: \n                if(num == 0) \n                { \n                    printf(\"No student data available! Please enter data first.\\n\"); \n                    break; \n                } \n \n                for(i = 0; i < num - 1; i++) \n                { \n                    int min = i; \n                    for(j = i + 1; j < num; j++) \n                    { \n                        if(percentage[j] < percentage[min]) \n                        { \n                            min = j; \n                        } \n                    } \nif(min != i) \n                    { \n                        temp = percentage[i]; \n                        percentage[i] = percentage[min]; \n                        percentage[min] = temp; \n                    } \n                } \n \n                printf(\"\\nTop Percentages:\\n\"); \n                int count = 0; \n                for(i = num - 1; i >= 0 && count < 5; i--) \n                { \n                    printf(\"Rank %d: %.2f%%\\n\", count + 1, percentage[i]); \n                    count++; \n                } \n                break; \n \n            case 5: \n                if(num == 0) \n                { \n                    printf(\"No student data available! Please enter data first.\\n\"); \n                } \n                else \n                { \n                    printf(\"\\nAll Student Percentages:\\n\"); \n                    for(i = 0; i < num; i++) \n                    { \n                        printf(\"Student %d: %.2f%%\\n\", i + 1, percentage[i]); \n                    } \n} \n                break; \n \n            case 6: \n                printf(\"Exiting program...\\n\"); \n                break; \n \n            default: \n                printf(\"Invalid choice! Please enter a option between 1 and 6.\\n\"); \n                break; \n        } \n    } while(ch != 6); \n \n    return 0; \n}",
      "output": "__Student percentage management system__ \n1.Enter student percentage \n2.Selection sort \n3.Bubble sort \n4.Top 5 \n5.Display all student percentage \n6.exit \nEnter your choice:1 \nEnter number of students (max 100): 5 \nEnter percentages of students: \nPercentage of student 1: 98.6 \nPercentage of student 2: 56.7 \nPercentage of student 3: 86.9 \nPercentage of student 4: 82.1 \nPercentage of student 5: 70.0 \n \n__Student percentage management system__ \n1.Enter student percentage \n2.Selection sort \n3.Bubble sort \n4.Top 5 \n5.Display all student percentage \n6.exit \nEnter your choice:2 \nPercentages sorted (Ascending) using Selection Sort: \n56.70% \n70.00% \n82.10% \n86.90% \n98.60% \n \n__Student percentage management system__ \n1.Enter student percentage \n2.Selection sort \n3.Bubble sort \n4.Top 5 \n5.Display all student percentage \n6.exit \nEnter your choice:3 \nPercentages sorted (Ascending) using Bubble Sort: \n56.70% \n70.00% \n82.10% \n86.90% \n98.60% \n \n__Student percentage management system__ \n1.Enter student percentage \n2.Selection sort \n3.Bubble sort \n4.Top 5 \n5.Display all student percentage \n6.exit \nEnter your choice:4 \nTop Percentages: \nRank 1: 98.60% \nRank 2: 86.90% \nRank 3: 82.10% \nRank 4: 70.00% \nRank 5: 56.70% \n \n__Student percentage management system__ \n1.Enter student percentage \n2.Selection sort \n3.Bubble sort \n4.Top 5 \n5.Display all student percentage \n6.exit \nEnter your choice:5 \nAll Student Percentages: \nStudent 1: 56.70% \nStudent 2: 70.00% \nStudent 3: 82.10% \nStudent 4: 86.90% \nStudent 5: 98.60% \n \n__Student percentage management system__ \n1.Enter student percentage \n2.Selection sort \n3.Bubble sort \n4.Top 5 \n5.Display all student percentage \n6.exit \nEnter your choice:6 \nExiting program... \n \nProcess returned 0 (0x0)   execution time : 51.723 s \nPress any key to continue."
    }
  },
  {
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
        [
          "Requirement",
          "Specification"
        ],
        [
          "Operating System",
          "64-bit Open source Linux or its derivative / Windows"
        ],
        [
          "Programming Tool",
          "Open Source C/C++ Programming tool like G++/GCC"
        ]
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
      "code": "#include<stdio.h> \n#include<string.h> \n#define size 10 \nint i; \ntypedef struct \n{ \n     char name[30]; \n     long phone; \n     int occupied; \n}client; \nclient hashtable[size]; \nvoid insertlinear(char *name, long phone); \nvoid insertquadratic(char *name, long phone); \nvoid insertdouble(char*name, long phone); \nvoid search(char *name); \nvoid display(); \nint hashfunction(char name[]); \nint hashfunction(char name[]) \n { \n     int hash=0; \n     for(int i=0;name[i];i++) \n     { \nhash=(hash+name[i]%size); \n     } \n     return hash; \n} \nint secondhash(char*name) \n{ \n     int hash=0; \n     for(int i=0;name[i];i++) \n     { \n          hash+=name[i]; \n          return 7-(hash%7); \n \n     } \n} \nvoid main() \n{ \n     int ch; \n     char name[30]; \n     long phone; \n     do \n     { \n           printf(\"\\nMENU\\n1.Linear probing\\n2.Quadratic probing\\n3.Double \nhashing\\n4.Searching\\n5.Display\\n6.Exit\"); \n           printf(\"\\nEnter your choice:\"); \n           scanf(\"%d\",&ch); \n           switch (ch) \n           { \n           case 1: \n               printf(\"Enter name and phone number:\"); \nscanf(\"%s%ld\",&name,&phone); \n               insertlinear(name,phone); \n               break; \n           case 2: \n                printf(\"enter name and phone\"); \n                scanf(\"%s%ld\",&name,&phone); \n                insertquadratic(name,phone); \n               break; \n           case 3: \n                printf(\"Enter name and phone number:\"); \n               scanf(\"%s%ld\",&name,&phone); \n               insertdouble(name,phone); \n               break; \n           case 4: \n               printf(\"Enter name to search:\"); \n               scanf(\"%s\",&name); \n               search(name); \n               break; \n \n           case 5: \n                display(); \n                break; \n \n           default: \n               break; \n               } \n     }while(ch!=5); \n} \n \nvoid insertlinear(char *name,long phone) \n{ \n     int index=hashfunction(name); \n     int start=index; \n     while(hashtable[index].occupied) \n     { \n          index=(index+1)%size; \n          if(index==start) \n             { \n                  printf(\"Hash table is full\"); \n                    return; \n             } \n     } \n     strcpy(hashtable[index].name,name); \n     hashtable[index].phone=phone; \n     hashtable[index].occupied = 1; \n     printf(\"Inserted using linear probing\\n\"); \n \n} \nvoid insertquadratic(char *name, long phone) \n{ \n     int index=hashfunction(name); \n     while(hashtable[(index + i*i)%size].occupied&& i<size) \n     { \n          i++; \n     } \n     if(i==size) \n     { \n          printf(\"Hash table is full\"); \nreturn; \n     } \n     index=(index + i*i)%size; \n     strcpy(hashtable[index].name,name); \n     hashtable[index].phone=phone; \n     hashtable[index].occupied=1; \n     printf(\"Inserted using quadratic probing\\n\"); \n} \nvoid insertdouble(char*name,long phone) \n{ \n     int index=hashfunction(name); \n     int step=secondhash(name); \n     int start=index; \n     while(hashtable[index].occupied) \n     { \n          index=(index+step)%size; \n          if (index==start) \n          { \n \n               printf(\"table full\"); \n               return; \n          } \n     } \n     index=(index + i*i)%size; \n     strcpy(hashtable[index].name,name); \n     hashtable[index].phone=phone; \n     hashtable[index].occupied=1; \n     printf(\"Inserted using double hashing\\n\"); \n} \nvoid search(char *name) \n{ \n     int index=hashfunction(name); \n     int start=index; \n     while(hashtable[index].occupied) \n     { \n             if(strcmp(hashtable[index].name,name)==0) \n          { \n               printf(\"phone number of %s is %ld\",name,hashtable[index].phone); \n               return; \n          } \n          index=(index+1)%size; \n          if(index==start) \n               { \n               break; \n               } \n     } \n               printf(\"clinet not found\"); \n \n \n} \nvoid display() \n{ \n     int i; \n     printf(\"Hash Table\"); \n     printf(\"%-5s %-30s %-15s\\n\", \"Index\", \"Name\", \"Phone\"); \n     for(i = 0; i < size; i++) \n     { \n          if(hashtable[i].occupied) \n{ \n               printf(\"%-5d %-30s %-15ld\\n\", i, hashtable[i].name, hashtable[i].phone); \n          } \n          else \n          { \n               printf(\"%-5d %-30s %-15s\\n\", i, \"---\", \"---\"); \n          } \n     } \n}",
      "output": "--- HASH TABLE MENU --- \n1. Linear Probing \n2. Quadratic Probing \n3. Double Hashing \n4. Searching \n5. Display \n6. Exit \nEnter your choice: 1 \nEnter name and phone number: Ankush 9847562103 \nInserted 'Ankush' at index 8 using Linear Probing. \n \n \n--- HASH TABLE MENU --- \n1. Linear Probing \n2. Quadratic Probing \n3. Double Hashing \n4. Searching \n5. Display \n6. Exit \nEnter your choice: 2 \nEnter name and phone number: Aradhya 8975641235 \nInserted 'Aradhya' at index 9 using Quadratic Probing. \n \n \n--- HASH TABLE MENU --- \n1. Linear Probing \n2. Quadratic Probing \n3. Double Hashing \n4. Searching \n5. Display \n6. Exit \nEnter your choice: 3 \nEnter name and phone number: Aditi 7985664125 \nInserted 'Aditi' at index 1 using Double Hashing (Step = 6). \n \n \n--- HASH TABLE MENU --- \n1. Linear Probing \n2. Quadratic Probing \n3. Double Hashing \n4. Searching \n5. Display \n6. Exit \nEnter your choice: 4 \nEnter name to search: Aradhya \n \nFound! Phone number of Aradhya is 385706643 (Index: 9) \n \n \n--- HASH TABLE MENU --- \n1. Linear Probing \n2. Quadratic Probing \n3. Double Hashing \n4. Searching \n5. Display \n6. Exit \nEnter your choice: 5 \n \nIndex Name                 Phone \n----------------------------------------- \n0     ---                  --- \n1     Aditi                -604270467 \n2     ---                  --- \n3     ---                  --- \n4     ---                  --- \n5     ---                  --- \n6     ---                  --- \n7     ---                  --- \n8     Ankush               1257627511 \n9     Aradhya              385706643 \n \n \n--- HASH TABLE MENU --- \n1. Linear Probing \n2. Quadratic Probing \n3. Double Hashing \n4. Searching \n5. Display \n6. Exit \nEnter your choice: 6 \nExiting program... \n \nProcess returned 0 (0x0)   execution time : 1451.468 s \nPress any key to continue."
    }
  },
  {
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
        [
          "Requirement",
          "Specification"
        ],
        [
          "Hardware",
          "64-bit Open source Linux or its derivative / Windows"
        ],
        [
          "Software",
          "GCC / G++ Compiler, C Programming environment"
        ]
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
      "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n    int roll;\n    struct Node *next;\n};\n\n// Create a new node\nstruct Node* createNode(int roll)\n{\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->roll = roll;\n    newNode->next = NULL;\n    return newNode;\n}\n\n// Insert at end\nvoid insert(struct Node **head, int roll)\n{\n    struct Node *newNode = createNode(roll);\n\n    if (*head == NULL)\n    {\n        *head = newNode;\n        return;\n    }\n\n    struct Node *temp = *head;\n\n    while (temp->next != NULL)\n        temp = temp->next;\n\n    temp->next = newNode;\n}\n\n// Check whether roll number exists in a set\nint search(struct Node *head, int roll)\n{\n    while (head != NULL)\n    {\n        if (head->roll == roll)\n            return 1;\n\n        head = head->next;\n    }\n\n    return 0;\n}\n\n// Display linked list\nvoid display(struct Node *head)\n{\n    if (head == NULL)\n    {\n        printf(\"No students\\n\");\n        return;\n    }\n\n    while (head != NULL)\n    {\n        printf(\"%d \", head->roll);\n        head = head->next;\n    }\n\n    printf(\"\\n\");\n}\n\nint main()\n{\n    struct Node *A = NULL;\n    struct Node *B = NULL;\n\n    int nA, nB, roll, i;\n    int neither = 0;\n\n    // Input Set A\n    printf(\"Enter number of students who like Vanilla: \");\n    scanf(\"%d\", &nA);\n\n    printf(\"Enter roll numbers:\\n\");\n    for (i = 0; i < nA; i++)\n    {\n        scanf(\"%d\", &roll);\n        insert(&A, roll);\n    }\n\n    // Input Set B\n    printf(\"\\nEnter number of students who like Butterscotch: \");\n    scanf(\"%d\", &nB);\n\n    printf(\"Enter roll numbers:\\n\");\n    for (i = 0; i < nB; i++)\n    {\n        scanf(\"%d\", &roll);\n        insert(&B, roll);\n    }\n\n    // a) Students who like both\n    printf(\"\\n(a) Students who like both Vanilla and Butterscotch:\\n\");\n\n    struct Node *temp = A;\n\n    while (temp != NULL)\n    {\n        if (search(B, temp->roll))\n            printf(\"%d \", temp->roll);\n\n        temp = temp->next;\n    }\n\n    // b) Students who like either but not both\n    printf(\"\\n\\n(b) Students who like either Vanilla or Butterscotch, but not both:\\n\");\n\n    temp = A;\n\n    // Students in A but not in B\n    while (temp != NULL)\n    {\n        if (!search(B, temp->roll))\n            printf(\"%d \", temp->roll);\n\n        temp = temp->next;\n    }\n\n    // Students in B but not in A\n    temp = B;\n\n    while (temp != NULL)\n    {\n        if (!search(A, temp->roll))\n            printf(\"%d \", temp->roll);\n\n        temp = temp->next;\n    }\n\n    // c) Students who like neither\n    // Assuming total students are numbered from 1 to total_students\n\n    int total_students;\n\n    printf(\"\\n\\nEnter total number of students in the class: \");\n    scanf(\"%d\", &total_students);\n\n    for (roll = 1; roll <= total_students; roll++)\n    {\n        if (!search(A, roll) && !search(B, roll))\n            neither++;\n    }\n\n    printf(\"\\n(c) Number of students who like neither Vanilla nor Butterscotch: %d\\n\",\n           neither);\n\n    return 0;\n}",
      "output": "/* Execution Sample:\nEnter total number of students in SE Comp class: 10\nEnter number of students who like Vanilla: 4\nEnter roll numbers: 1 2 3 4\nEnter number of students who like Butterscotch: 4\nEnter roll numbers: 3 4 5 6\n\n(a) Students who like both Vanilla and Butterscotch: 3 4\n(b) Students who like either Vanilla or Butterscotch but not both: 1 2 5 6\n(c) Number of students who like neither Vanilla nor Butterscotch: 4 */"
    }
  },
  {
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
      "requirements": [
        [
          "Requirement",
          "Specification"
        ],
        [
          "Programming Language",
          "C++"
        ],
        [
          "Compiler",
          "GCC / G++"
        ],
        [
          "Hardware",
          "i3 or above, 4 GB RAM"
        ],
        [
          "Operating System",
          "Windows / Linux"
        ]
      ],
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
      "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Node\n{\n    int time;\n    string name;\n    Node *prev, *next;\n};\n\nclass DLL\n{\n    Node *head;\n\npublic:\n\n    DLL()\n    {\n        head = NULL;\n    }\n\n    // Book appointment\n    void book(int t, string n)\n    {\n        if (t < 9 || t > 17)\n        {\n            cout << \"Invalid time!\\n\";\n            return;\n        }\n\n        Node *newNode = new Node{t, n, NULL, NULL};\n\n        if (head == NULL)\n        {\n            head = newNode;\n        }\n        else\n        {\n            Node *p = head;\n\n            while (p->next != NULL)\n                p = p->next;\n\n            p->next = newNode;\n            newNode->prev = p;\n        }\n\n        cout << \"Appointment booked.\\n\";\n    }\n\n    // Display appointments\n    void display()\n    {\n        Node *p = head;\n\n        if (p == NULL)\n        {\n            cout << \"No appointments.\\n\";\n            return;\n        }\n\n        while (p != NULL)\n        {\n            cout << p->time << \":00 - \" << p->name << endl;\n            p = p->next;\n        }\n    }\n\n    // Display free slots\n    void freeSlots()\n    {\n        cout << \"Free slots:\\n\";\n\n        for (int t = 9; t <= 17; t++)\n        {\n            Node *p = head;\n            bool booked = false;\n\n            while (p != NULL)\n            {\n                if (p->time == t)\n                {\n                    booked = true;\n                    break;\n                }\n\n                p = p->next;\n            }\n\n            if (!booked)\n                cout << t << \":00\\n\";\n        }\n    }\n\n    // Cancel appointment\n    void cancel(int t)\n    {\n        if (t < 9 || t > 17)\n        {\n            cout << \"Invalid time!\\n\";\n            return;\n        }\n\n        Node *p = head;\n\n        while (p != NULL && p->time != t)\n            p = p->next;\n\n        if (p == NULL)\n        {\n            cout << \"Appointment not found.\\n\";\n            return;\n        }\n\n        if (p->prev != NULL)\n            p->prev->next = p->next;\n        else\n            head = p->next;\n\n        if (p->next != NULL)\n            p->next->prev = p->prev;\n\n        delete p;\n\n        cout << \"Appointment cancelled.\\n\";\n    }\n\n    // Sort appointments according to time\n    void sort()\n    {\n        Node *i, *j;\n\n        for (i = head; i != NULL; i = i->next)\n        {\n            for (j = i->next; j != NULL; j = j->next)\n            {\n                if (i->time > j->time)\n                {\n                    swap(i->time, j->time);\n                    swap(i->name, j->name);\n                }\n            }\n        }\n\n        cout << \"Appointments sorted.\\n\";\n    }\n};\n\nint main()\n{\n    DLL d;\n    int choice, t;\n    string name;\n\n    do\n    {\n        cout << \"\\n1. Free Slots\";\n        cout << \"\\n2. Book Appointment\";\n        cout << \"\\n3. Display Appointments\";\n        cout << \"\\n4. Cancel Appointment\";\n        cout << \"\\n5. Sort by Time\";\n        cout << \"\\n6. Exit\";\n\n        cout << \"\\nEnter choice: \";\n        cin >> choice;\n\n        switch (choice)\n        {\n            case 1:\n                d.freeSlots();\n                break;\n\n            case 2:\n                cout << \"Enter time (9-17): \";\n                cin >> t;\n\n                cout << \"Enter name: \";\n                cin >> name;\n\n                d.book(t, name);\n                break;\n\n            case 3:\n                d.display();\n                break;\n\n            case 4:\n                cout << \"Enter time: \";\n                cin >> t;\n\n                d.cancel(t);\n                break;\n\n            case 5:\n                d.sort();\n                break;\n\n            case 6:\n                cout << \"Exit.\";\n                break;\n\n            default:\n                cout << \"Invalid choice!\";\n        }\n\n    } while (choice != 6);\n\n    return 0;\n}",
      "output": "/* Execution Sample:\n*** APPOINTMENT SYSTEM ***\n1. Create Free Slots\n2. Display Free Slots\n3. Book Appointment\n4. Cancel Appointment\n5. Sort Appointments\n6. Exit\nEnter choice: 1\nEnter number of slots: 3\nEnter slot 1 (time): 9\nEnter slot 2 (time): 10\nEnter slot 3 (time): 11\n\nEnter choice: 3\nEnter appointment time: 10\nEnter patient name: Rahul\nAppointment booked successfully for Rahul at 10:00! */"
    }
  },
  {
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
        [
          "Requirement",
          "Specification"
        ],
        [
          "Operating System",
          "64-bit Open source Linux or its derivative / Windows"
        ],
        [
          "Programming Tool",
          "Open Source C++ Programming tool like G++/GCC"
        ]
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
      "code": "#include <iostream>\nusing namespace std;\n\n#define size 10\n\nclass stackexp\n{\n    int top;\n    char stk[size];\n\npublic:\n    stackexp()\n    {\n        top = -1;\n    }\n\n    void push(char);\n    char pop();\n    int isfull();\n    int isempty();\n};\n\nvoid stackexp::push(char x)\n{\n    if (!isfull())\n    {\n        top = top + 1;\n        stk[top] = x;\n    }\n}\n\nchar stackexp::pop()\n{\n    char s;\n\n    if (!isempty())\n    {\n        s = stk[top];\n        top = top - 1;\n        return s;\n    }\n\n    return '\\0';\n}\n\nint stackexp::isfull()\n{\n    if (top == size - 1)\n        return 1;\n    else\n        return 0;\n}\n\nint stackexp::isempty()\n{\n    if (top == -1)\n        return 1;\n    else\n        return 0;\n}\n\nint main()\n{\n    stackexp s1;\n    char exp[20], ch, temp;\n    int i = 0;\n\n    cout << \"\\n\\t!! Parenthesis Checker..!!!!\" << endl;\n    cout << \"\\nEnter the expression to check whether it is in well form or not : \";\n    cin >> exp;\n\n    if ((exp[0] == ')') || (exp[0] == ']') || (exp[0] == '}'))\n    {\n        cout << \"\\nInvalid Expression.....\\n\";\n        return 0;\n    }\n\n    while (exp[i] != '\\0')\n    { \n        ch = exp[i];\n\n        switch (ch)\n        {\n        case '(':\n            s1.push(ch);\n            break;\n\n        case '[':\n            s1.push(ch);\n            break;\n\n        case '{':\n            s1.push(ch);\n            break;\n\n        case ')':\n            temp = s1.pop();\n            if (temp != '(')\n            {\n                cout << \"\\nInvalid Expression.....\\n\";\n                return 0;\n            }\n            break;\n\n        case ']':\n            temp = s1.pop();\n            if (temp != '[')\n            {\n                cout << \"\\nInvalid Expression.....\\n\";\n                return 0;\n            }\n            break;\n\n        case '}':\n            temp = s1.pop();\n            if (temp != '{')\n            {\n                cout << \"\\nInvalid Expression.....\\n\";\n                return 0;\n            }\n            break;\n        }\n\n        i = i + 1;\n    }\n\n    if (s1.isempty())\n    {\n        cout << \"\\nExpression is well parenthesised...\\n\";\n    }\n    else\n    {\n        cout << \"\\nSorry !!! Invalid Expression or not well parenthesized....\\n\";\n    }\n\n    return 0;\n}",
      "output": "/* Execution Sample:\nEnter expression: {a + (b - c) * [d / e]}\nExpression is well parenthesized!\n\nEnter expression: {a + (b - c]\nSorry !!! Invalid Expression or not well parenthesized.... */"
    }
  },
  {
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
      "requirements": [
        [
          "Requirement",
          "Specification"
        ],
        [
          "Programming Language",
          "C++"
        ],
        [
          "Compiler",
          "GCC / G++"
        ],
        [
          "Hardware",
          "i3 or above, 4 GB RAM"
        ],
        [
          "Operating System",
          "Windows / Linux"
        ]
      ],
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
      "code": "#include <iostream>\nusing namespace std;\n\nstruct piz\n{\n    int ono, ot;\n};\n\nclass PizzaParlor\n{\n    piz p[10];\n    int count, c, rear, front;\n\npublic:\n    PizzaParlor()\n    {\n        c = 0;\n        count = 0;\n        front = 0;\n        rear = -1;\n    }\n\n    void insert();\n    void display();\n    void del();\n};\n\nvoid PizzaParlor::insert()\n{\n    int i, n;\n\n    cout << \"\\n_________________________\";\n    cout << \"\\n| 1. Corn Pizza         |\";\n    cout << \"\\n| 2. Pizza              |\";\n    cout << \"\\n| 3. Chicken Pizza      |\";\n    cout << \"\\n|_______________________|\";\n\n    cout << \"\\n---------------------------------------------\";\n    cout << \"\\nHow many orders you want to place: \";\n    cin >> n;\n\n    for (i = 0; i < n; i++)\n    {\n        if (count >= 10)\n        {\n            cout << \"\\n____________\";\n            cout << \"\\n| OVERFLOW |\";\n            cout << \"\\n|__________|\";\n            break;\n        }\n\n        cout << \"\\nEnter your order (1/2/3): \";\n        cin >> p[(rear + 1) % 10].ot;\n\n        if (p[(rear + 1) % 10].ot < 1 ||\n            p[(rear + 1) % 10].ot > 3)\n        {\n            cout << \"\\nInvalid pizza choice.\";\n            continue;\n        }\n\n        rear = (rear + 1) % 10;\n\n        c++;\n        p[rear].ono = c;\n        count++;\n\n        cout << \"Order placed successfully.\";\n        cout << \"\\nOrder Number: \" << p[rear].ono;\n    }\n\n    cout << \"\\n---------------------------------------------\";\n}\n\nvoid PizzaParlor::display()\n{\n    int i, n, f;\n\n    if (count == 0)\n    {\n        cout << \"\\nQueue is empty. No pending orders.\";\n        return;\n    }\n\n    cout << \"\\n---------------------------------------------\";\n    cout << \"\\nHow many orders you want to display: \";\n    cin >> n;\n    cout << \"---------------------------------------------\";\n\n    f = front;\n\n    for (i = 0; i < n; i++)\n    {\n        if (i >= count)\n        {\n            cout << \"\\nAll pending orders displayed.\";\n            break;\n        }\n\n        cout << \"\\n____________________________________________\";\n        cout << \"\\nOrder Number : \" << p[f].ono;\n        cout << \"\\nPizza        : \";\n\n        if (p[f].ot == 1)\n            cout << \"Corn Pizza\";\n        else if (p[f].ot == 2)\n            cout << \"Pizza\";\n        else if (p[f].ot == 3)\n            cout << \"Chicken Pizza\";\n\n        cout << \"\\n____________________________________________\";\n\n        f = (f + 1) % 10;\n    }\n\n    cout << \"\\n---------------------------------------------\";\n}\n\nvoid PizzaParlor::del()\n{\n    int i, n;\n\n    cout << \"\\n---------------------------------------------\";\n    cout << \"\\nHow many orders you want to serve: \";\n    cin >> n;\n    cout << \"---------------------------------------------\";\n\n    for (i = 0; i < n; i++)\n    {\n        if (count == 0)\n        {\n            cout << \"\\nUNDERFLOW\";\n            cout << \"\\nNo orders available to serve.\";\n            break;\n        }\n\n        cout << \"\\n____________________________________________\";\n        cout << \"\\nServed Order Number : \" << p[front].ono;\n        cout << \"\\nPizza               : \";\n\n        if (p[front].ot == 1)\n            cout << \"Corn Pizza\";\n        else if (p[front].ot == 2)\n            cout << \"Pizza\";\n        else if (p[front].ot == 3)\n            cout << \"Chicken Pizza\";\n\n        cout << \"\\n____________________________________________\";\n\n        p[front].ono = 0;\n        p[front].ot = 0;\n\n        front = (front + 1) % 10;\n        count--;\n    }\n\n    cout << \"\\n---------------------------------------------\";\n}\n\nint main()\n{\n    PizzaParlor q;\n    int choice;\n\n    do\n    {\n        cout << \"\\n\\n____________________________\";\n        cout << \"\\n|       PIZZA PARLOR       |\";\n        cout << \"\\n|__________________________|\";\n        cout << \"\\n| 1. Place Order           |\";\n        cout << \"\\n| 2. Display Orders        |\";\n        cout << \"\\n| 3. Serve Order           |\";\n        cout << \"\\n| 4. Exit                  |\";\n        cout << \"\\n|__________________________|\";\n\n        cout << \"\\nEnter your choice: \";\n        cin >> choice;\n\n        switch (choice)\n        {\n        case 1:\n            q.insert();\n            break;\n\n        case 2:\n            q.display();\n            break;\n\n        case 3:\n            q.del();\n            break;\n\n        case 4:\n            cout << \"\\nThank you!\";\n            break;\n\n        default:\n            cout << \"\\nInvalid choice.\";\n        }\n\n    } while (choice != 4);\n\n    return 0;\n}",
      "output": "/* Execution Sample:\n***** PIZZA PARLOR ORDER SYSTEM *****\n1. Place Order\n2. Serve Order\n3. Display Orders\n4. Exit\nEnter choice: 1\nEnter Order Number: 101\nEnter Pizza Type (1: Veg, 2: Non-Veg): 1\nOrder placed successfully!\n\nEnter choice: 3\nPending Orders in Queue:\nOrder No: 101, Type: Veg */"
    }
  },
  {
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
        [
          "Requirement",
          "Specification"
        ],
        [
          "Operating System",
          "64-bit Open source Linux or its derivative / Windows"
        ],
        [
          "Programming Tool",
          "Open Source C++ Programming tool like G++/GCC"
        ]
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
          "steps": [
            {
              "step": "Step 1: Insert 45",
              "desc": "45 is the first element, so it becomes the root node.",
              "img": "assets/images/theory8/image2.jpeg"
            },
            {
              "step": "Step 2: Insert 15",
              "desc": "As 15 is smaller than 45, insert it as the root node of the left subtree of 45.",
              "img": "assets/images/theory8/image3.jpeg"
            },
            {
              "step": "Step 3: Insert 79",
              "desc": "As 79 is greater than 45, insert it as the root node of the right subtree of 45.",
              "img": "assets/images/theory8/image4.jpeg"
            },
            {
              "step": "Step 4: Insert 90",
              "desc": "90 is greater than 45 and 79, so it is inserted as the right child of 79.",
              "img": "assets/images/theory8/image5.jpeg"
            },
            {
              "step": "Step 5: Insert 10",
              "desc": "10 is smaller than 45 and 15, so it is inserted as the left child of 15.",
              "img": "assets/images/theory8/image6.jpeg"
            },
            {
              "step": "Step 6: Insert 55",
              "desc": "55 is greater than 45 but smaller than 79, so it is inserted as the left child of 79.",
              "img": "assets/images/theory8/image7.jpeg"
            },
            {
              "step": "Step 7: Insert 12",
              "desc": "12 is smaller than 45 and 15, but greater than 10, so it is inserted as the right child of 10.",
              "img": "assets/images/theory8/image8.jpeg"
            },
            {
              "step": "Step 8: Insert 20",
              "desc": "20 is smaller than 45 but greater than 15, so it is inserted as the right child of 15.",
              "img": "assets/images/theory8/image9.jpeg"
            },
            {
              "step": "Step 9: Insert 50",
              "desc": "50 is greater than 45, smaller than 79 and smaller than 55, so it is inserted as the left child of 55.",
              "img": "assets/images/theory8/image10.jpeg"
            }
          ]
        },
        {
          "heading": "Time Complexity Analysis of BST Operations",
          "type": "table",
          "table": [
            [
              "Operation",
              "Best Case",
              "Average Case",
              "Worst Case (Skewed)"
            ],
            [
              "Search",
              "O(log n)",
              "O(log n)",
              "O(n)"
            ],
            [
              "Insertion",
              "O(log n)",
              "O(log n)",
              "O(n)"
            ],
            [
              "Deletion",
              "O(log n)",
              "O(log n)",
              "O(n)"
            ]
          ]
        }
      ]
    },
    "codeDoc": {
      "code": "#include <iostream>\nusing namespace std;\n\nstruct Node\n{\n    int data;\n    Node *left, *right;\n};\n\nclass BST\n{\n    Node *root;\n\n    Node* createNode(int value)\n    {\n        Node *p = new Node;\n        p->data = value;\n        p->left = p->right = NULL;\n        return p;\n    }\n\n    Node* insert(Node *p, int value)\n    {\n        if (p == NULL)\n            return createNode(value);\n\n        if (value < p->data)\n            p->left = insert(p->left, value);\n        else\n            p->right = insert(p->right, value);\n\n        return p;\n    }\n\n    int longestPath(Node *p)\n    {\n        if (p == NULL)\n            return 0;\n\n        int left = longestPath(p->left);\n        int right = longestPath(p->right);\n\n        return (left > right ? left : right) + 1;\n    }\n\n    int minimum(Node *p)\n    {\n        while (p->left != NULL)\n            p = p->left;\n\n        return p->data;\n    }\n\n    void mirror(Node *p)\n    {\n        if (p == NULL)\n            return;\n\n        Node *temp = p->left;\n        p->left = p->right;\n        p->right = temp;\n\n        mirror(p->left);\n        mirror(p->right);\n    }\n\n    bool search(Node *p, int value)\n    {\n        if (p == NULL)\n            return false;\n\n        if (p->data == value)\n            return true;\n\n        if (value < p->data)\n            return search(p->left, value);\n        else\n            return search(p->right, value);\n    }\n\n    void inorder(Node *p)\n    {\n        if (p != NULL)\n        {\n            inorder(p->left);\n            cout << p->data << \" \";\n            inorder(p->right);\n        }\n    }\n\npublic:\n\n    BST()\n    {\n        root = NULL;\n    }\n\n    void insertValue(int value)\n    {\n        root = insert(root, value);\n    }\n\n    void insertNewNode()\n    {\n        int value;\n        cout << \"Enter value: \";\n        cin >> value;\n\n        root = insert(root, value);\n\n        cout << \"Node inserted successfully.\\n\";\n    }\n\n    void findLongestPath()\n    {\n        if (root == NULL)\n            cout << \"Tree is empty.\\n\";\n        else\n            cout << \"Number of nodes in longest path = \"\n                 << longestPath(root) << endl;\n    }\n\n    void findMinimum()\n    {\n        if (root == NULL)\n            cout << \"Tree is empty.\\n\";\n        else\n            cout << \"Minimum data value = \"\n                 << minimum(root) << endl;\n    }\n\n    void swapPointers()\n    {\n        if (root == NULL)\n            cout << \"Tree is empty.\\n\";\n        else\n        {\n            mirror(root);\n            cout << \"Tree has been mirrored successfully.\\n\";\n        }\n    }\n\n    void searchValue()\n    {\n        int value;\n        cout << \"Enter value to search: \";\n        cin >> value;\n\n        if (search(root, value))\n            cout << \"Value found in tree.\\n\";\n        else\n            cout << \"Value not found in tree.\\n\";\n    }\n\n    void display()\n    {\n        cout << \"Inorder Traversal: \";\n        inorder(root);\n        cout << endl;\n    }\n};\n\nint main()\n{\n    BST T;\n    int n, value, choice;\n\n    cout << \"Enter number of nodes: \";\n    cin >> n;\n\n    cout << \"Enter values in insertion order:\\n\";\n\n    for (int i = 0; i < n; i++)\n    {\n        cin >> value;\n        T.insertValue(value);\n    }\n\n    do\n    {\n        cout << \"\\n===== BINARY SEARCH TREE =====\\n\";\n        cout << \"1. Insert New Node\\n\";\n        cout << \"2. Find Longest Path from Root\\n\";\n        cout << \"3. Find Minimum Data Value\\n\";\n        cout << \"4. Swap Left and Right Pointers\\n\";\n        cout << \"5. Search a Value\\n\";\n        cout << \"6. Display Inorder\\n\";\n        cout << \"7. Exit\\n\";\n        cout << \"Enter your choice: \";\n        cin >> choice;\n\n        switch (choice)\n        {\n        case 1:\n            T.insertNewNode();\n            break;\n\n        case 2:\n            T.findLongestPath();\n            break;\n\n        case 3:\n            T.findMinimum();\n            break;\n\n        case 4:\n            T.swapPointers();\n            break;\n\n        case 5:\n            T.searchValue();\n            break;\n\n        case 6:\n            T.display();\n            break;\n\n        case 7:\n            cout << \"Program terminated.\\n\";\n            break;\n\n        default:\n            cout << \"Invalid choice!\\n\";\n        }\n\n    } while (choice != 7);\n\n    return 0;\n}",
      "output": "/* Execution Sample:\n--- BINARY SEARCH TREE MENU ---\n1. Insert Node\n2. Display Inorder\n3. Longest Path (Height)\n4. Minimum Data Value\n5. Mirror Tree (Swap Left & Right)\n6. Search Value\n7. Exit\nEnter choice: 1\nEnter value: 45\n\nEnter choice: 4\nMinimum value in BST: 10\n\nEnter choice: 3\nNumber of nodes in longest path from root: 4 */"
    }
  },
  {
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
        [
          "Requirement",
          "Specification"
        ],
        [
          "Operating System",
          "64-bit Open source Linux or its derivative / Windows"
        ],
        [
          "Programming Tool",
          "Open Source C++ Programming tool like G++/GCC"
        ]
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
      "code": "#include<iostream>\nusing namespace std;\n\nclass tree\n{\n\tint a[20][20],l,u,w,i,j,v,e,visited[20];\npublic:\n\tvoid input();\n\tvoid display();\n\tvoid minimum();\n};\n\nvoid tree::input()\n{\n\tcout<<\"Enter the no. of branches: \";\n\tcin>>v;\n\n\tfor(i=0;i<v;i++)\n\t{\n\t\tvisited[i]=0;\n\t\tfor(j=0;j<v;j++)\n\t\t{\n\t\t\ta[i][j]=999;\n\t\t}\n\t}\n\n\tcout<<\"\\nEnter the no. of connections: \";\n\tcin>>e;\n\n\tfor(i=0;i<e;i++)\n\t{\n\t\tcout<<\"Enter the end branches of connections:  \"<<endl;\n\t\tcin>>l>>u;\n\t\tcout<<\"Enter the phone company charges for this connection:  \";\n\t\tcin>>w;\n\t\ta[l-1][u-1]=a[u-1][l-1]=w;\n\t}\n}\n\nvoid tree::display()\n{\n\tcout<<\"\\nAdjacency matrix:\";\n\tfor(i=0;i<v;i++)\n\t{\n\t\tcout<<endl;\n\t\tfor(j=0;j<v;j++)\n\t\t{\n\t\t\tcout<<a[i][j]<<\"   \";\n\t\t}\n\t\tcout<<endl;\n\t}\n}\n\nvoid tree::minimum()\n{\n\tint p=0,q=0,total=0,min;\n\tvisited[0]=1;\n\tfor(int count=0;count<(v-1);count++)\n\t{\n\t\tmin=999;\n\t\tfor(i=0;i<v;i++)\n\t\t{\n\t\t\tif(visited[i]==1)\n\t\t\t{\n\t\t\t\tfor(j=0;j<v;j++)\n\t\t\t\t{\n\t\t\t\t\tif(visited[j]!=1)\n\t\t\t\t\t{\n\t\t\t\t\t\tif(min > a[i][j])\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tmin=a[i][j];\n\t\t\t\t\t\t\tp=i;\n\t\t\t\t\t\t\tq=j;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tvisited[p]=1;\n\t\tvisited[q]=1;\n\t\ttotal=total+min;\n\t\tcout<<\"Minimum cost connection is\"<<(p+1)<<\" -> \"<<(q+1)<<\"  with charge : \"<<min<< endl;\n\t\t\n\t}\n\tcout<<\"The minimum total cost of connections of all branches is: \"<<total<<endl;\n}\n\nint main()\n{\n\tint ch;\n\ttree t;\n\tdo\n\t{\n\t\tcout<<\"==========PRIM'S ALGORITHM=================\"<<endl;\n\t\tcout<<\"\\n1.INPUT\\n \\n2.DISPLAY\\n \\n3.MINIMUM\\n\"<<endl;\n\t\tcout<<\"Enter your choice :\"<<endl;\n\t\tcin>>ch;\n\t\n\tswitch(ch)\n\t{\t\n\tcase 1: cout<<\"*******INPUT YOUR VALUES*******\"<<endl;\t\n\t\tt.input();\n\t\tbreak;\n\n\tcase 2: cout<<\"*******DISPLAY THE CONTENTS********\"<<endl;\n\t\tt.display();\n\t\tbreak;\n\n\tcase 3: cout<<\"*********MINIMUM************\"<<endl;\n\t\tt.minimum();\n\t\tbreak;\n\t}\n\t\n\t}while(ch!=4);\n\treturn 0;\n}",
      "output": "/* Execution Sample:\n=== PHONE LINES CONNECTION SYSTEM (PRIM'S ALGORITHM) ===\nEnter number of offices (vertices): 4\nEnter number of possible connections (edges): 5\nEnter edges (source destination cost):\n1 2 1\n1 3 4\n2 3 2\n2 4 5\n3 4 3\n\nMinimum Spanning Tree Connections:\nOffice 1 - Office 2 : Cost 1\nOffice 2 - Office 3 : Cost 2\nOffice 3 - Office 4 : Cost 3\nTotal Minimum Cost: 6 */"
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.PRACTICALS_DATA;
}
