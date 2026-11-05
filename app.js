const state = { data: null, selected: 0, tab: 'theory', query: '' };
const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function highlightCode(code) {
  let safe = escapeHtml(code);
  safe = safe.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
  safe = safe.replace(/("(?:\\.|[^"\\])*")/g, '<span class="string">$1</span>');
  safe = safe.replace(/\b(#include|define|int|float|double|char|void|long|return|if|else|while|for|do|switch|case|break|continue|class|struct|public|private|using|namespace|new|delete|bool|true|false|NULL)\b/g, '<span class="keyword">$1</span>');
  return safe;
}

function renderTheory(practical) {
  const blocks = practical.theory.map((block) => {
    if (block.type === 'h1') return `<h2>${escapeHtml(block.text)}</h2>`;
    if (block.type === 'h2') return `<h3>${escapeHtml(block.text)}</h3>`;
    if (block.type === 'li') return `<li>${escapeHtml(block.text)}</li>`;
    if (block.type === 'table') return `<div class="table-wrap"><table>${block.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</table></div>`;
    return `<p>${escapeHtml(block.text)}</p>`;
  }).join('').replace(/(<li>.*?<\/li>)+/gs, (list) => `<ul>${list}</ul>`);
  const images = practical.images.map((image, index) => `<figure><img src="${image}" alt="Figure ${index + 1} from ${practical.sources.theory}" loading="lazy" /><figcaption>Source figure ${index + 1}</figcaption></figure>`).join('');
  $('#theory-panel').innerHTML = blocks + images;
}

function renderNavigation() {
  $('#practical-nav').innerHTML = state.data.practicals.map((item, index) => `<button class="practical-button ${index === state.selected ? 'is-selected' : ''}" data-index="${index}"><span>${String(item.id).padStart(2, '0')}</span> Practical ${item.id}</button>`).join('');
  document.querySelectorAll('.practical-button').forEach(button => button.addEventListener('click', () => selectPractical(Number(button.dataset.index))));
}

function applySearch() {
  const query = state.query.trim().toLowerCase();
  const panel = state.tab === 'theory' ? $('#theory-panel') : $('#code-panel');
  panel.querySelectorAll('.search-hit').forEach(node => node.replaceWith(document.createTextNode(node.textContent)));
  if (!query) { $('#search-result').textContent = ''; return; }
  const source = state.tab === 'theory' ? state.data.practicals[state.selected].theory.map(item => item.text || item.rows?.flat().join(' ') || '').join(' ') : state.data.practicals[state.selected].code;
  const matches = source.toLowerCase().split(query).length - 1;
  $('#search-result').textContent = `${matches} match${matches === 1 ? '' : 'es'} in ${state.tab}.`;
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const index = node.nodeValue.toLowerCase().indexOf(query);
    if (index === -1) return;
    const fragment = document.createDocumentFragment();
    fragment.append(node.nodeValue.slice(0, index));
    const hit = document.createElement('mark');
    hit.className = 'search-hit';
    hit.textContent = node.nodeValue.slice(index, index + query.length);
    fragment.append(hit, node.nodeValue.slice(index + query.length));
    node.replaceWith(fragment);
  });
}

function selectPractical(index) {
  state.selected = Math.max(0, Math.min(index, state.data.practicals.length - 1));
  state.query = ''; $('#search').value = '';
  render();
  document.body.classList.remove('nav-open');
}

function render() {
  const practical = state.data.practicals[state.selected];
  renderNavigation(); renderTheory(practical);
  $('#eyebrow').textContent = `PRACTICAL ${String(practical.id).padStart(2, '0')}`;
  $('#practical-title').textContent = practical.title;
  $('#progress-label').textContent = `${practical.id} / ${state.data.practicals.length}`;
  $('#progress-bar').style.width = `${(practical.id / state.data.practicals.length) * 100}%`;
  $('#language-badge').textContent = practical.language === 'cpp' ? 'C++' : 'C';
  $('#code-viewer').innerHTML = highlightCode(practical.code);
  $('#source-label').textContent = `Sources: ${practical.sources.theory} · ${practical.sources.code}`;
  $('#previous').disabled = state.selected === 0;
  $('#next').disabled = state.selected === state.data.practicals.length - 1;
  setTab(state.tab); applySearch();
}

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll('.tab').forEach(button => { const active = button.dataset.tab === tab; button.classList.toggle('is-active', active); button.setAttribute('aria-selected', active); });
  $('#theory-panel').classList.toggle('is-hidden', tab !== 'theory');
  $('#code-panel').classList.toggle('is-hidden', tab !== 'code');
  applySearch();
}

async function init() {
  try {
    const response = await fetch('data/practicals.json');
    if (!response.ok) throw new Error(`Source data could not be loaded (${response.status}).`);
    state.data = await response.json();
    $('#status').remove(); render();
  } catch (error) {
    $('#status').textContent = `Unable to load the practical material. ${error.message}`;
    $('#status').classList.add('is-error');
  }
}

document.addEventListener('click', (event) => { if (event.target.matches('.tab')) setTab(event.target.dataset.tab); });
$('#previous').addEventListener('click', () => selectPractical(state.selected - 1));
$('#next').addEventListener('click', () => selectPractical(state.selected + 1));
$('#search').addEventListener('input', (event) => { state.query = event.target.value; applySearch(); });
$('#copy-code').addEventListener('click', async () => { const button = $('#copy-code'); try { await navigator.clipboard.writeText(state.data.practicals[state.selected].code); button.textContent = 'Copied!'; setTimeout(() => { button.textContent = 'Copy code'; }, 1600); } catch { button.textContent = 'Copy unavailable'; } });
$('#menu-toggle').addEventListener('click', () => document.body.classList.toggle('nav-open'));
init();
