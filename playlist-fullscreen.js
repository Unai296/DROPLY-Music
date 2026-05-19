/* ═══════════════════════════════════════════════════════════
   DROPLY — playlist-fullscreen.js
   Patches the playlist-detail modal to behave like a
   full-screen immersive page (Spotify-style).
   Load AFTER script.js — zero original files touched.
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Grab elements ────────────────────────────────────── */
  const modal   = document.getElementById('playlistDetailModal');
  const card    = modal?.querySelector('.modal-card.playlist-detail-card');
  const cover   = document.getElementById('playlistDetailCover');
  const header  = modal?.querySelector('.playlist-detail-header');

  if (!modal || !card || !cover || !header) return;

  /* ── 1. Intercept openPlaylistDetail to set CSS cover var ── */
  //  We watch for the modal gaining the "open" class via MutationObserver
  //  so we can read the first <img> src inside the cover grid.
  const observer = new MutationObserver(() => {
    if (modal.classList.contains('open')) {
      applyHeroBackground();
      // Scroll the card back to top on each open
      card.scrollTop = 0;
      card.classList.remove('scrolled');
    }
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['class'] });

  /* ── 2. Derive dominant-ish cover colour for the hero tint ── */
  function applyHeroBackground() {
    // Find the first image inside the cover grid
    const img = cover.querySelector('img');
    if (img && img.src) {
      header.style.setProperty('--pl-cover-url', `url("${img.src}")`);
    } else {
      header.style.setProperty('--pl-cover-url', 'none');
    }
  }

  /* ── 3. Scrolled-state topbar ─────────────────────────── */
  card.addEventListener('scroll', () => {
    // Show the frosted topbar once the user scrolls past the cover art
    const threshold = cover.offsetHeight + 40;
    if (card.scrollTop > threshold) {
      card.classList.add('scrolled');
    } else {
      card.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── 4. Prevent body scroll while fullscreen modal is open ── */
  //  The original code does body.overflow = 'hidden' only for the evento
  //  modal; we piggyback the same pattern here via the MutationObserver.
  const origClose = document.getElementById('playlistDetailClose');
  if (origClose) {
    // The original close handler is already wired in script.js.
    // We just need to make sure overflow is restored.
    origClose.addEventListener('click', () => {
      document.body.style.overflow = '';
    }, true);
  }

  // Also restore on backdrop click (already wired in script.js, but add a
  // listener here to handle overflow restoration)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.style.overflow = '';
    }
  });

  // Patch open — we watch the class change and lock body scroll
  const scrollObserver = new MutationObserver(() => {
    if (modal.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    }
  });
  scrollObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });

  /* ── 5. Replace "✕" close button text with an SVG arrow ── */
  const closeBtn = document.getElementById('playlistDetailClose');
  if (closeBtn) {
    closeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18"
           fill="none" stroke="currentColor"
           stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    `;
    closeBtn.setAttribute('aria-label', 'Volver');
  }

  /* ── 6. Add duration column to track rows (cosmetic) ──── */
  //  We hook the openPlaylistDetail function by patching the list after
  //  each modal open, since the list is rebuilt in script.js.
  const listEl = document.getElementById('playlistDetailList');
  if (!listEl) return;

  const listObserver = new MutationObserver(() => {
    if (!modal.classList.contains('open')) return;
    listEl.querySelectorAll('.playlist-detail-item').forEach(item => {
      if (item.dataset.fsPatched) return;
      item.dataset.fsPatched = '1';

      // Try to find duration from the global `media` array by matching
      // the track title shown in the item
      const titleEl = item.querySelector('.playlist-detail-track');
      if (!titleEl) return;
      const title = titleEl.textContent.trim();

      // `media` is a global defined in script.js
      const track = (window.media || []).find(m => m.title === title);
      if (track?.duration) {
        const dur = document.createElement('span');
        dur.className = 'pl-item-duration';
        dur.textContent = track.duration;
        dur.style.cssText = `
          font-size:.75rem;
          color:var(--text-soft);
          font-variant-numeric:tabular-nums;
          margin-right:.3rem;
          flex-shrink:0;
          pointer-events:none;
        `;
        // Insert before the remove button
        const removeBtn = item.querySelector('.playlist-detail-remove');
        if (removeBtn) {
          item.insertBefore(dur, removeBtn);
        } else {
          item.appendChild(dur);
        }
      }
    });
  });
  listObserver.observe(listEl, { childList: true });

  console.info('[DROPLY] ✓ playlist-fullscreen.js cargado — vista inmersiva activa');
})();
