/**
 * Restrained motion: reveal-on-scroll, short staggers, line drawing, and the header's
 * scrolled state. Content is never hidden unless this script runs and motion is allowed.
 */
const root = document.documentElement;
const header = document.querySelector<HTMLElement>('[data-header]');

const setScrolled = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
setScrolled();
window.addEventListener('scroll', setScrolled, { passive: true });

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger], [data-draw]')];

document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  [...group.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--delay', `${Math.min(i * 60, 240)}ms`));
});

const show = (el: HTMLElement, animate: boolean) => {
  el.classList.add('is-in');
  if (animate) window.setTimeout(() => el.classList.add('done'), 2000);
  else el.classList.add('done');
};

if (reduce || !('IntersectionObserver' in window)) {
  targets.forEach((el) => show(el, false));
} else {
  // Anything already on screen is shown at once, so nothing visible flickers away.
  const limit = window.innerHeight * 0.92;
  targets.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < limit && r.bottom > 0) show(el, false);
  });
  root.classList.add('motion');
  // Enable transitions only after the hidden state has been applied, so nothing fades out first.
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('motion-ready')));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        show(e.target as HTMLElement, true);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );
  targets.forEach((el) => !el.classList.contains('is-in') && io.observe(el));
}
