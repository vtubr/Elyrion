 /* ─── CURSOR ─── */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  /* ─── NAV SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ─── SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  /* ─── CONTACT FORM ─── */
  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#1a7a3e,#00ff88)';
    setTimeout(() => {
      btn.textContent = 'Send Message ✦';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  }

  /* ─── PARALLAX ORBS ─── */
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector('.orb-1').style.transform = `translate(${x*0.8}px,${y*0.8}px)`;
    document.querySelector('.orb-3').style.transform = `translate(${-x*0.5}px,${-y*0.5}px)`;
  });

  /* ─── ANIMATED COUNTER ─── */
  function animateCounter(el, target, suffix) {
    let current = 0; const step = target / 80;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = (target >= 100 ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, 20);
  }

  const achObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = document.querySelectorAll('.ach-number');
        const data = [{v:1.49,s:'K'},{v:46.8,s:'K'},{v:35,s:'+'},{v:1.5,s:'×'}];
        cards.forEach((c, i) => animateCounter(c, data[i].v, data[i].s));
        achObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const achSection = document.getElementById('achievements');
  if (achSection) achObserver.observe(achSection);