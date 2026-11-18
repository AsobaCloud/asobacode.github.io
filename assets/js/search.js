/**
 * Search functionality for Asoba Open Source docs.
 *
 * Strategy: fetch /search-index.json (built by Jekyll from search-index.json
 * in the repo root), then filter client-side on every keystroke.
 */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────────────
  var searchIndex = null;   // Array of { title, url, content, section }
  var loadAttempted = false;

  // ── DOM refs (resolved after DOMContentLoaded) ───────────────────────────────
  var inputEl, resultsEl, containerEl;

  // ── Helpers ───────────────────────────────────────────────────────────────────

  /** Determine the site base-path from the current script tag src attribute. */
  function basePath() {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('search.js') !== -1) {
        // Strip /assets/js/search.js to get the base path
        return src.replace(/\/assets\/js\/search\.js.*$/, '') || '';
      }
    }
    return '';
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    var re = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    return escapeHtml(text).replace(re, '<mark>$1</mark>');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Extract a ~160-char snippet around the first match in `text`. */
  function snippet(text, query) {
    if (!text) return '';
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) idx = 0;
    var start = Math.max(0, idx - 60);
    var end   = Math.min(text.length, idx + 100);
    var excerpt = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    return highlight(excerpt, query);
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  function showResults(items, query) {
    resultsEl.innerHTML = '';
    resultsEl.style.display = 'block';

    if (!items.length) {
      resultsEl.innerHTML = '<p>No results for "<strong>' + escapeHtml(query) + '</strong>"</p>';
      return;
    }

    var ul = document.createElement('ul');
    items.slice(0, 8).forEach(function (item) {
      var li = document.createElement('li');
      var a  = document.createElement('a');
      a.href = item.url;

      var titleEl = document.createElement('strong');
      titleEl.innerHTML = highlight(item.title, query);

      var snippetEl = document.createElement('span');
      snippetEl.innerHTML = snippet(item.content, query);

      a.appendChild(titleEl);
      a.appendChild(snippetEl);
      li.appendChild(a);
      ul.appendChild(li);
    });

    resultsEl.appendChild(ul);
  }

  function hideResults() {
    resultsEl.style.display = 'none';
    resultsEl.innerHTML = '';
  }

  // ── Search logic ──────────────────────────────────────────────────────────────

  function runSearch(query) {
    query = query.trim();
    if (!query) { hideResults(); return; }

    if (!searchIndex) {
      resultsEl.innerHTML = '<p>Loading index…</p>';
      resultsEl.style.display = 'block';
      return;
    }

    var lower = query.toLowerCase();
    var words = lower.split(/\s+/).filter(Boolean);

    var results = searchIndex
      .map(function (item) {
        var titleLower   = (item.title   || '').toLowerCase();
        var contentLower = (item.content || '').toLowerCase();

        // Score: title match worth more than content match
        var score = 0;
        words.forEach(function (w) {
          if (titleLower.indexOf(w) !== -1)   score += 10;
          if (contentLower.indexOf(w) !== -1) score += 1;
        });
        return { item: item, score: score };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (r) { return r.item; });

    showResults(results, query);
  }

  // ── Index loading ─────────────────────────────────────────────────────────────

  function loadIndex() {
    if (loadAttempted) return;
    loadAttempted = true;

    var base = basePath();
    var url  = base + '/search-index.json';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try {
          searchIndex = JSON.parse(xhr.responseText);
          // If the user already typed something, run the search now
          if (inputEl && inputEl.value.trim()) {
            runSearch(inputEl.value);
          }
        } catch (e) {
          console.warn('[search] Failed to parse search-index.json', e);
        }
      } else {
        console.warn('[search] Could not load search-index.json (status ' + xhr.status + ')');
      }
    };
    xhr.send();
  }

  // ── Wiring ────────────────────────────────────────────────────────────────────

  function init() {
    inputEl    = document.getElementById('search-input');
    resultsEl  = document.getElementById('search-results');
    containerEl = resultsEl && resultsEl.parentElement;

    if (!inputEl || !resultsEl) return; // search bar not on this page

    // Make the results container relative-positioned so the dropdown anchors correctly
    if (containerEl) {
      var pos = window.getComputedStyle(containerEl).position;
      if (pos === 'static') containerEl.style.position = 'relative';
    }

    // Load the index as soon as the user focuses the input (lazy)
    inputEl.addEventListener('focus', loadIndex, { once: true });

    // Also pre-load after a short idle to make first keystroke instant
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(loadIndex, { timeout: 3000 });
    } else {
      setTimeout(loadIndex, 1500);
    }

    // Live search on each keystroke
    inputEl.addEventListener('input', function () {
      runSearch(this.value);
    });

    // Keyboard navigation
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        hideResults();
        inputEl.blur();
      } else if (e.key === 'Enter') {
        var first = resultsEl.querySelector('a');
        if (first) { window.location.href = first.href; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        var links = Array.from(resultsEl.querySelectorAll('a'));
        if (links.length) links[0].focus();
      }
    });

    // Arrow-key navigation inside results
    resultsEl.addEventListener('keydown', function (e) {
      var links = Array.from(resultsEl.querySelectorAll('a'));
      var idx   = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && idx < links.length - 1) {
        e.preventDefault(); links[idx + 1].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx <= 0) inputEl.focus();
        else links[idx - 1].focus();
      } else if (e.key === 'Escape') {
        hideResults(); inputEl.focus();
      }
    });

    // Close results when clicking outside
    document.addEventListener('click', function (e) {
      if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
        hideResults();
      }
    });
  }

  // Run after the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
