/* ─── CURSOR PERSONALIZADO ─── */
(function () {
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .filter-btn, .project-card, .blog-card, .contact-card, .cert-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
})();

/* ─── SCROLL REVEAL ─── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ─── NAV HAMBURGER ─── */
(function () {
  const btn = document.querySelector('.nav-hamburger');
  const menu = document.querySelector('.nav-mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
})();

/* ─── FRASES ROTATIVAS — index.html ─── */
(function () {
  const quotes = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.quote-dot');
  if (!quotes.length) return;

  let current = 0;
  let timer;

  function show(i) {
    quotes[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = i;
    quotes[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { show((current + 1) % quotes.length); }

  quotes[0].classList.add('active');

  timer = setInterval(next, 4000);
  dots.forEach((d, i) => {
    d.addEventListener('click', () => { clearInterval(timer); show(i); timer = setInterval(next, 4000); });
  });
})();

/* ─── TYPEWRITER — index.html ─── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = el.dataset.text || el.textContent;
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) { el.textContent += text[i++]; setTimeout(type, 50); }
  }
  setTimeout(type, 600);
})();

/* ─── COUNTERS ANIMADOS — sobre-mi.html ─── */
(function () {
  const counters = document.querySelectorAll('.counter-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('es-AR') + suffix;
      if (current >= target) clearInterval(iv);
    }, 16);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => obs.observe(c));
})();

/* ─── SKILL BARS — sobre-mi.html ─── */
(function () {
  const section = document.querySelector('.skills-section');
  if (!section) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        section.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = bar.dataset.p + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  obs.observe(section);
})();

/* ─── FILTROS — proyectos.html y blog.html ─── */
(function () {
  document.querySelectorAll('.filters').forEach(filterWrap => {
    const btns = filterWrap.querySelectorAll('.filter-btn');
    const grid = filterWrap.nextElementSibling;
    if (!grid) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const cat = btn.dataset.cat;
        grid.querySelectorAll('[data-cat]').forEach(card => {
          if (cat === 'todos' || card.dataset.cat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
})();

/* ─── CONTADOR CARACTERES — contacto.html ─── */
(function () {
  const ta = document.getElementById('mensaje');
  const counter = document.getElementById('char-count');
  if (!ta || !counter) return;
  ta.addEventListener('input', () => { counter.textContent = ta.value.length; });
})();

/* ─── PANTALLA ÉXITO — contacto.html ─── */
(function () {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('success-screen');
  if (!form || !success) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    success.classList.add('show');
  });
})();
