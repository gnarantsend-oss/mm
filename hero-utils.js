export function animateContent() {
  const ids = ['heroTag', 'heroTitle', 'heroMeta', 'heroDesc', 'heroBtns'];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'none';
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, 30);
    });
  });
}

export function startProgress() {
  const fill = document.getElementById('heroProgressFill');
  if (!fill) return;
  fill.style.transition = 'none';
  fill.style.width      = '0%';
  fill.offsetHeight;
  const sec = (window.HERO_TIMER || 12000) / 1000;
  fill.style.transition = `width ${sec}s linear`;
  requestAnimationFrame(() => { fill.style.width = '100%'; });
}

export function stopProgress() {
  const fill = document.getElementById('heroProgressFill');
  if (fill) { fill.style.transition = 'none'; fill.style.width = '0%'; }
}
