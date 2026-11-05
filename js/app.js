/**
 * DSA Practical Revision Portal - Main Application Logic
 * Academic Developer Dashboard Architecture
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currentId: 1,
    activeTab: 'theory', // 'theory', 'code', 'output'
    searchQuery: '',
    codeFontSize: 14,
    lineWrap: false,
    mobileMenuOpen: false
  };

  // DOM Elements Cache
  const elements = {
    practicalList: document.getElementById('practicalList'),
    mainStage: document.getElementById('mainStage'),
    stageHeader: document.getElementById('stageHeader'),
    tabTheoryBtn: document.getElementById('tabTheoryBtn'),
    tabCodeBtn: document.getElementById('tabCodeBtn'),
    tabOutputBtn: document.getElementById('tabOutputBtn'),
    tabTheoryContent: document.getElementById('tabTheoryContent'),
    tabCodeContent: document.getElementById('tabCodeContent'),
    tabOutputContent: document.getElementById('tabOutputContent'),
    prevPracticalBtn: document.getElementById('prevPracticalBtn'),
    nextPracticalBtn: document.getElementById('nextPracticalBtn'),
    quickSearchInput: document.getElementById('quickSearchInput'),
    toastContainer: document.getElementById('toastContainer'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    pCountBadge: document.getElementById('pCountBadge')
  };

  // Initialize Application
  function init() {
    if (!window.PRACTICALS_DATA || !Array.isArray(window.PRACTICALS_DATA)) {
      showErrorState("Unable to load practicals data. Please ensure data.js is loaded.");
      return;
    }

    renderSidebar();
    attachEventListeners();
    loadPractical(1);
    updatePracticalCount();
  }

  function updatePracticalCount() {
    if (elements.pCountBadge) {
      elements.pCountBadge.textContent = `${window.PRACTICALS_DATA.length} Practicals`;
    }
  }

  // Render Sidebar List
  function renderSidebar(filteredData) {
    const data = filteredData || window.PRACTICALS_DATA;
    elements.practicalList.innerHTML = '';

    if (data.length === 0) {
      elements.practicalList.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No practicals match "${escapeHtml(state.searchQuery)}"
        </div>
      `;
      return;
    }

    data.forEach(p => {
      const btn = document.createElement('button');
      btn.className = `practical-btn ${p.id === state.currentId ? 'active' : ''}`;
      btn.setAttribute('data-id', p.id);
      btn.setAttribute('aria-label', `Select Practical ${p.id}: ${p.shortTitle}`);

      btn.innerHTML = `
        <div class="p-number-badge">${p.id}</div>
        <div class="p-btn-content">
          <div class="p-btn-title">${escapeHtml(p.shortTitle)}</div>
          <div class="p-btn-topic">${escapeHtml(p.topic)}</div>
        </div>
        <span class="p-lang-tag">${p.language}</span>
      `;

      btn.addEventListener('click', () => {
        loadPractical(p.id);
        if (state.mobileMenuOpen) toggleMobileMenu(false);
      });

      elements.practicalList.appendChild(btn);
    });
  }

  // Load Practical by ID
  function loadPractical(id) {
    const practical = window.PRACTICALS_DATA.find(p => p.id === id);
    if (!practical) return;

    state.currentId = id;

    // Update active button in sidebar
    const allBtns = elements.practicalList.querySelectorAll('.practical-btn');
    allBtns.forEach(b => {
      const bId = parseInt(b.getAttribute('data-id'), 10);
      b.classList.toggle('active', bId === id);
    });

    // Update Stepper Navigation buttons
    elements.prevPracticalBtn.disabled = (id <= 1);
    elements.nextPracticalBtn.disabled = (id >= window.PRACTICALS_DATA.length);

    // Render Stage Header Meta
    renderStageHeader(practical);

    // Render Content Tabs
    renderTheoryTab(practical);
    renderCodeTab(practical);
    renderOutputTab(practical);

    // Ensure active tab view
    switchTab(state.activeTab);

    // Scroll stage to top
    const stageBody = document.querySelector('.stage-body');
    if (stageBody) stageBody.scrollTop = 0;
  }

  // Render Stage Header
  function renderStageHeader(practical) {
    document.getElementById('headerPNumber').textContent = `Practical ${practical.id}`;
    document.getElementById('headerPTitle').textContent = practical.shortTitle;
    document.getElementById('headerSourceInfo').textContent = `Source: ${practical.sourceFiles.theory} & ${practical.sourceFiles.code}`;
  }

  // Render Theory Tab
  function renderTheoryTab(p) {
    const t = p.theoryDoc;
    let html = `
      <div class="theory-view">
        <!-- Problem Statement Card -->
        <div class="problem-statement-card">
          <div class="card-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            Problem Statement
          </div>
          <div class="problem-text">${formatHighlightedText(t.problemStatement)}</div>
        </div>

        <!-- Meta Grid: Outcomes & Requirements -->
        <div class="meta-grid">
          ${t.outcomes && t.outcomes.length > 0 ? `
            <div class="meta-card">
              <h3>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Expected Outcomes
              </h3>
              <ul class="outcomes-list">
                ${t.outcomes.map(item => `<li>${formatHighlightedText(item)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${t.requirements && t.requirements.length > 0 ? `
            <div class="meta-card">
              <h3>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Hardware & Software Requirements
              </h3>
              <table class="academic-table">
                <tbody>
                  ${t.requirements.slice(1).map(row => `
                    <tr>
                      <td>${escapeHtml(row[0])}</td>
                      <td>${escapeHtml(row[1])}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>
    `;

    // Process all theory sections
    if (t.sections && t.sections.length > 0) {
      t.sections.forEach(sec => {
        html += `<div class="theory-section">`;
        html += `<h2 class="theory-section-heading">${escapeHtml(sec.heading)}</h2>`;

        if (sec.type === 'algorithm' && sec.steps) {
          html += `
            <div class="algorithm-box">
              ${sec.steps.map((st, sidx) => {
                const isStepHeader = st.startsWith('Step') || st.startsWith('Linear Search') || st.startsWith('Binary Search') || st.startsWith('SELECTION') || st.startsWith('BUBBLE');
                return `<div class="step-line ${isStepHeader ? 'step-title' : ''}">${formatHighlightedText(st)}</div>`;
              }).join('')}
            </div>
          `;
        } else if (sec.type === 'code' && sec.code) {
          html += `
            <div class="algorithm-box">
              <pre><code>${escapeHtml(sec.code)}</code></pre>
            </div>
          `;
        } else if (sec.type === 'image' && sec.src) {
          html += `
            <div class="diagram-container">
              <img src="${sec.src}" alt="${escapeHtml(sec.alt || sec.heading)}" loading="lazy" />
              <div class="diagram-caption">${escapeHtml(sec.heading)}</div>
            </div>
          `;
        } else if (sec.type === 'bst_steps' && sec.steps) {
          html += `
            <div class="bst-steps-grid">
              ${sec.steps.map(step => `
                <div class="bst-step-card">
                  <div class="bst-step-header">${escapeHtml(step.step)}</div>
                  <img src="${step.img}" alt="${escapeHtml(step.step)}" class="bst-step-img" loading="lazy" />
                  <div class="bst-step-desc">${escapeHtml(step.desc)}</div>
                </div>
              `).join('')}
            </div>
          `;
        } else if (sec.type === 'table' && sec.table) {
          html += `
            <div style="overflow-x: auto;">
              <table class="academic-table" style="background-color: var(--bg-primary); border-radius: var(--radius-sm);">
                <thead>
                  <tr>
                    ${sec.table[0].map(h => `<th>${escapeHtml(h)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${sec.table.slice(1).map(row => `
                    <tr>
                      ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;
        } else if (sec.content) {
          sec.content.forEach(pText => {
            html += `<p class="theory-paragraph">${formatHighlightedText(pText)}</p>`;
          });
        }

        html += `</div>`;
      });
    }

    html += `</div>`;
    elements.tabTheoryContent.innerHTML = html;
  }

  // Render Code Tab
  function renderCodeTab(p) {
    const code = p.codeDoc.code || '// No code available';
    const highlighted = C_HIGHLIGHTER.highlight(code);

    // Line Numbers generator
    let lineNumbersHtml = '';
    for (let i = 1; i <= highlighted.lineCount; i++) {
      lineNumbersHtml += `<div class="line-number">${i}</div>`;
    }

    const html = `
      <div class="code-view">
        <div class="code-toolbar">
          <div class="code-meta">
            <span class="lang-pill">${p.language === 'C++' ? 'C++17' : 'C99 (ANSI C)'}</span>
            <span class="code-stats">${highlighted.lineCount} lines &bull; ${code.length} chars</span>
          </div>
          <div class="code-actions">
            <button class="action-btn" id="wrapToggleBtn" title="Toggle Line Wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4M16 16l-2 2 2 2"/></svg>
              <span>${state.lineWrap ? 'Unwrap' : 'Wrap'}</span>
            </button>
            <button class="action-btn" id="zoomInBtn" title="Increase font size">A+</button>
            <button class="action-btn" id="zoomOutBtn" title="Decrease font size">A-</button>
            <button class="action-btn" id="downloadCodeBtn" title="Download C/C++ Source File">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download</span>
            </button>
            <button class="action-btn primary" id="copyCodeBtn" title="Copy exact code to clipboard">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy Code</span>
            </button>
          </div>
        </div>
        <div class="code-container" style="font-size: ${state.codeFontSize}px;">
          <div class="line-numbers">${lineNumbersHtml}</div>
          <div class="code-content ${state.lineWrap ? 'wrap' : ''}" id="codeBlockContent">${highlighted.html}</div>
        </div>
      </div>
    `;

    elements.tabCodeContent.innerHTML = html;

    // Attach Code View Event Listeners
    document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
      copyToClipboard(code, 'Source code copied to clipboard!');
    });

    document.getElementById('downloadCodeBtn')?.addEventListener('click', () => {
      const ext = p.language === 'C++' ? 'cpp' : 'c';
      const filename = `practical_${p.id}_${p.shortTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${ext}`;
      downloadFile(filename, code);
      showToast(`Downloaded ${filename}`);
    });

    document.getElementById('wrapToggleBtn')?.addEventListener('click', () => {
      state.lineWrap = !state.lineWrap;
      const codeBlock = document.getElementById('codeBlockContent');
      if (codeBlock) {
        codeBlock.classList.toggle('wrap', state.lineWrap);
      }
      const label = document.querySelector('#wrapToggleBtn span');
      if (label) label.textContent = state.lineWrap ? 'Unwrap' : 'Wrap';
    });

    document.getElementById('zoomInBtn')?.addEventListener('click', () => {
      if (state.codeFontSize < 24) {
        state.codeFontSize += 2;
        const container = document.querySelector('.code-container');
        if (container) container.style.fontSize = `${state.codeFontSize}px`;
      }
    });

    document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
      if (state.codeFontSize > 10) {
        state.codeFontSize -= 2;
        const container = document.querySelector('.code-container');
        if (container) container.style.fontSize = `${state.codeFontSize}px`;
      }
    });
  }

  // Render Output Tab
  function renderOutputTab(p) {
    const output = p.codeDoc.output || 'No sample output provided in original document.';

    const html = `
      <div class="output-view">
        <div class="terminal-header">
          <div class="terminal-dots">
            <div class="terminal-dot dot-red"></div>
            <div class="terminal-dot dot-yellow"></div>
            <div class="terminal-dot dot-green"></div>
          </div>
          <div class="terminal-title">Terminal &mdash; Execution Sample Run (${p.shortTitle})</div>
          <button class="action-btn" id="copyOutputBtn" style="padding: 4px 8px; font-size: 0.72rem;">
            Copy Output
          </button>
        </div>
        <div class="terminal-body">${escapeHtml(output)}</div>
      </div>
    `;

    elements.tabOutputContent.innerHTML = html;

    document.getElementById('copyOutputBtn')?.addEventListener('click', () => {
      copyToClipboard(output, 'Output sample copied to clipboard!');
    });
  }

  // Tab Switching
  function switchTab(tabName) {
    state.activeTab = tabName;

    elements.tabTheoryBtn.classList.toggle('active', tabName === 'theory');
    elements.tabCodeBtn.classList.toggle('active', tabName === 'code');
    elements.tabOutputBtn.classList.toggle('active', tabName === 'output');

    elements.tabTheoryContent.style.display = tabName === 'theory' ? 'block' : 'none';
    elements.tabCodeContent.style.display = tabName === 'code' ? 'block' : 'none';
    elements.tabOutputContent.style.display = tabName === 'output' ? 'block' : 'none';
  }

  // Quick Search
  function handleSearch(query) {
    state.searchQuery = query.trim().toLowerCase();

    if (!state.searchQuery) {
      renderSidebar();
      loadPractical(state.currentId);
      return;
    }

    // Filter practicals where title, topic, problem statement, or code matches query
    const filtered = window.PRACTICALS_DATA.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(state.searchQuery);
      const matchTopic = p.topic.toLowerCase().includes(state.searchQuery);
      const matchProblem = p.theoryDoc.problemStatement.toLowerCase().includes(state.searchQuery);
      const matchCode = p.codeDoc.code.toLowerCase().includes(state.searchQuery);
      return matchTitle || matchTopic || matchProblem || matchCode;
    });

    renderSidebar(filtered);

    // If current practical is in filtered, re-render to highlight; else switch to first match
    if (filtered.length > 0) {
      const isCurrentInFiltered = filtered.some(p => p.id === state.currentId);
      if (!isCurrentInFiltered) {
        loadPractical(filtered[0].id);
      } else {
        loadPractical(state.currentId);
      }
    }
  }

  // Format and Highlight Matching Search Query in Text
  function formatHighlightedText(text) {
    if (!text) return '';
    const escaped = escapeHtml(text);
    if (!state.searchQuery || state.searchQuery.length < 2) return escaped;

    const regex = new RegExp(`(${escapeRegExp(state.searchQuery)})`, 'gi');
    return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  // Toast System
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${escapeHtml(message)}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  // Clipboard Utility
  function copyToClipboard(text, successMessage) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || 'Copied to clipboard!');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(successMessage || 'Copied to clipboard!');
    });
  }

  // File Download Utility
  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Mobile Menu Toggle
  function toggleMobileMenu(isOpen) {
    state.mobileMenuOpen = (typeof isOpen === 'boolean') ? isOpen : !state.mobileMenuOpen;
    elements.sidebar.classList.toggle('open', state.mobileMenuOpen);
    elements.sidebarBackdrop.classList.toggle('active', state.mobileMenuOpen);
  }

  // Error State Handler
  function showErrorState(msg) {
    elements.mainStage.innerHTML = `
      <div style="padding: 60px 20px; text-align: center; color: var(--accent-rose);">
        <h2>Application Error</h2>
        <p style="margin-top: 10px; color: var(--text-secondary);">${escapeHtml(msg)}</p>
      </div>
    `;
  }

  // Attach All Event Listeners
  function attachEventListeners() {
    // Tabs Navigation
    elements.tabTheoryBtn.addEventListener('click', () => switchTab('theory'));
    elements.tabCodeBtn.addEventListener('click', () => switchTab('code'));
    elements.tabOutputBtn.addEventListener('click', () => switchTab('output'));

    // Stepper Navigation
    elements.prevPracticalBtn.addEventListener('click', () => {
      if (state.currentId > 1) loadPractical(state.currentId - 1);
    });

    elements.nextPracticalBtn.addEventListener('click', () => {
      if (state.currentId < window.PRACTICALS_DATA.length) loadPractical(state.currentId + 1);
    });

    // Quick Search Input
    let debounceTimer;
    elements.quickSearchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => handleSearch(e.target.value), 200);
    });

    // Mobile Menu Toggle
    elements.mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());
    elements.sidebarBackdrop.addEventListener('click', () => toggleMobileMenu(false));

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Ignore if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft' && state.currentId > 1) {
        e.preventDefault();
        loadPractical(state.currentId - 1);
      } else if (e.key === 'ArrowRight' && state.currentId < window.PRACTICALS_DATA.length) {
        e.preventDefault();
        loadPractical(state.currentId + 1);
      } else if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key, 10);
        if (num <= window.PRACTICALS_DATA.length) {
          e.preventDefault();
          loadPractical(num);
        }
      } else if (e.key.toLowerCase() === 't') {
        switchTab('theory');
      } else if (e.key.toLowerCase() === 'c') {
        switchTab('code');
      } else if (e.key.toLowerCase() === 'o') {
        switchTab('output');
      }
    });
  }

  // Helper Escape Functions
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Start Application when DOM is Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
