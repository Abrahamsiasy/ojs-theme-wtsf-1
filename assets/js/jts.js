/* JTS Theme — interactive behaviors */

(function () {
  'use strict';

  // ---- Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav   = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close on outside click
    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Language toggle (EN / 中文)
  const langToggle = document.querySelector('[data-lang-toggle]');
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const html = document.documentElement;
      const next = html.getAttribute('lang') === 'zh' ? 'en' : 'zh';
      html.setAttribute('lang', next);
      langToggle.textContent = next === 'zh' ? 'English' : '中文';
      document.body.classList.toggle('lang-zh-active', next === 'zh');
    });
  }

  // ---- Scroll reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // ---- Filter buttons (archive page, etc.)
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const btns = group.querySelectorAll('[data-filter]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  });

})();
