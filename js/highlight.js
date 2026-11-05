/**
 * Custom High-Contrast C/C++ Syntax Highlighter
 * Zero dependencies, highly robust, preserves 100% exact source code and indentation.
 */

const C_HIGHLIGHTER = {
  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  highlight(code) {
    if (!code) return { html: "", lineCount: 0 };

    const lines = code.split("\n");
    const lineCount = lines.length;

    const keywords = new Set([
      "if", "else", "for", "while", "do", "switch", "case", "default", "break",
      "continue", "return", "goto", "sizeof", "typedef", "struct", "class",
      "union", "enum", "public", "private", "protected", "virtual", "friend",
      "new", "delete", "this", "static", "const", "volatile", "register",
      "inline", "extern"
    ]);

    const types = new Set([
      "int", "char", "float", "double", "void", "long", "short", "signed",
      "unsigned", "bool", "string", "Node", "BST", "DLL", "stackexp", "PizzaParlor",
      "tree", "client", "piz", "FILE", "size_t"
    ]);

    const streams = new Set([
      "printf", "scanf", "cout", "cin", "endl", "cerr", "clog", "getline",
      "malloc", "free", "strcpy", "strcmp", "strlen"
    ]);

    let inBlockComment = false;

    const processedLines = lines.map((line, index) => {
      let result = "";
      let i = 0;
      const len = line.length;

      // Handle block comment continuation
      if (inBlockComment) {
        const closeIdx = line.indexOf("*/");
        if (closeIdx !== -1) {
          result += `<span class="token comment">${this.escapeHtml(line.slice(0, closeIdx + 2))}</span>`;
          i = closeIdx + 2;
          inBlockComment = false;
        } else {
          return `<span class="code-line" id="L${index + 1}"><span class="token comment">${this.escapeHtml(line)}</span></span>`;
        }
      }

      while (i < len) {
        // Line comment
        if (line[i] === "/" && line[i + 1] === "/") {
          result += `<span class="token comment">${this.escapeHtml(line.slice(i))}</span>`;
          break;
        }

        // Block comment start
        if (line[i] === "/" && line[i + 1] === "*") {
          const closeIdx = line.indexOf("*/", i + 2);
          if (closeIdx !== -1) {
            result += `<span class="token comment">${this.escapeHtml(line.slice(i, closeIdx + 2))}</span>`;
            i = closeIdx + 2;
            continue;
          } else {
            result += `<span class="token comment">${this.escapeHtml(line.slice(i))}</span>`;
            inBlockComment = true;
            break;
          }
        }

        // Preprocessor directives (#include, #define)
        if (line[i] === "#") {
          const restOfLine = line.slice(i);
          const prepMatch = restOfLine.match(/^#\s*([a-zA-Z_]+)(\s*(&lt;|<)[^>]+(&gt;|>)|.*)/);
          if (prepMatch) {
            const directive = prepMatch[1];
            result += `<span class="token preprocessor">#${directive}</span>`;
            const headerPart = restOfLine.slice(prepMatch[0].indexOf(directive) + directive.length);
            // Highlight header files like <stdio.h> or "header.h"
            const headerMatch = headerPart.match(/(\s*&lt;.*&gt;|\s*<.*>|\s*".*")/);
            if (headerMatch) {
              const beforeH = headerPart.slice(0, headerPart.indexOf(headerMatch[1]));
              result += this.escapeHtml(beforeH) + `<span class="token header-file">${this.escapeHtml(headerMatch[1])}</span>`;
            } else {
              result += this.escapeHtml(headerPart);
            }
            break;
          }
        }

        // Strings
        if (line[i] === '"' || line[i] === "'") {
          const quote = line[i];
          let strVal = quote;
          i++;
          while (i < len) {
            if (line[i] === "\\" && i + 1 < len) {
              strVal += line[i] + line[i + 1];
              i += 2;
              continue;
            }
            strVal += line[i];
            if (line[i] === quote) {
              i++;
              break;
            }
            i++;
          }
          result += `<span class="token string">${this.escapeHtml(strVal)}</span>`;
          continue;
        }

        // Numbers
        if (/\d/.test(line[i]) && (i === 0 || /[\s,;+\-*/=()[\]<>%]/.test(line[i - 1]))) {
          let numVal = "";
          while (i < len && /[\d.xXa-fA-F]/.test(line[i])) {
            numVal += line[i];
            i++;
          }
          result += `<span class="token number">${numVal}</span>`;
          continue;
        }

        // Words (Keywords, Types, Functions, Identifiers)
        if (/[a-zA-Z_]/.test(line[i])) {
          let word = "";
          const startIdx = i;
          while (i < len && /[a-zA-Z0-9_]/.test(line[i])) {
            word += line[i];
            i++;
          }

          if (word === "using" || word === "namespace" || word === "std") {
            result += `<span class="token namespace">${word}</span>`;
          } else if (keywords.has(word)) {
            result += `<span class="token keyword">${word}</span>`;
          } else if (types.has(word)) {
            result += `<span class="token type">${word}</span>`;
          } else if (streams.has(word)) {
            result += `<span class="token stream">${word}</span>`;
          } else {
            // Check if followed by '(' -> function
            let lookAhead = i;
            while (lookAhead < len && /\s/.test(line[lookAhead])) lookAhead++;
            if (lookAhead < len && line[lookAhead] === "(") {
              result += `<span class="token function">${word}</span>`;
            } else {
              result += word;
            }
          }
          continue;
        }

        // Operators & Punctuation
        if (/[+\-*/%=&|!<>^~]/.test(line[i])) {
          result += `<span class="token operator">${this.escapeHtml(line[i])}</span>`;
          i++;
          continue;
        }

        if (/[{}()[\];,.]/.test(line[i])) {
          result += `<span class="token punctuation">${this.escapeHtml(line[i])}</span>`;
          i++;
          continue;
        }

        // Any other characters (whitespace, etc.)
        result += this.escapeHtml(line[i]);
        i++;
      }

      return `<span class="code-line" id="L${index + 1}">${result || "&nbsp;"}</span>`;
    });

    return {
      html: processedLines.join("\n"),
      lineCount: lineCount
    };
  }
};

window.C_HIGHLIGHTER = C_HIGHLIGHTER;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = C_HIGHLIGHTER;
}
