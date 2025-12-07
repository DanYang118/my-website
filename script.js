// ====== Helpers ======
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// ====== Mobile menu ======
(() => {
  const nav = $('#navLinks');
  const toggle = $('.menu-toggle');
  const links = $$('#navLinks a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  links.forEach(a => a.addEventListener('click', () => nav && nav.classList.remove('open')));
})();

// ====== Auto highlight current nav (optional) ======
(() => {
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('#navLinks a').forEach(a => {
    const target = a.getAttribute('href') || '';
    const leaf = target.split('/').pop();
    if ((here === '' && leaf === 'index.html') || here === leaf) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

// ====== Dynamic year ======
(() => {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ====== Visual Lightbox (only runs on visual pages that have the elements) ======
(() => {
  const box = $('#lightbox');
  if (!box) return;

  const boxImg = $('#lightboxImg');
  const boxClose = $('#lightboxClose');

  function openBox(src, alt){
    if (!boxImg) return;
    boxImg.src = src;
    boxImg.alt = alt || '';
    box.classList.add('open');
  }
  function closeBox(){ box.classList.remove('open'); }

  $$('.zoom').forEach(a => a.addEventListener('click', e => {
    const img = a.querySelector('img');
    if (!img) return;
    e.preventDefault();
    openBox(img.src, a.dataset.title || img.alt);
  }));

  if (boxClose) boxClose.addEventListener('click', closeBox);
  box.addEventListener('click', (e) => { if (e.target === box) closeBox(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBox(); });
})();
(() => {
    // you may like 随机推荐所有项目（对应你 grid 里的数据）
    const projects = [
      //{ href: "aritzia.html", img: "images/aritzia 1.png", title: "Aritzia App Research" },
      { href: "employer assessment guide.html", img: "images/employer assessment guide 0.png", title: "Brightspace Launch: Employer Assessment Guide" },
      { href: "shein.html", img: "images/shein 00.png", title: "Shein Product Detail Page Redesign" },
      { href: "dashboard.html", img: "images/dashboard 1.png", title: "Project Management Desktop App - Dashboard Design" },
      { href: "suit.html", img: "images/suit 1.png", title: "Suit Store Checkout - Flow Redesign" },
      { href: "senior.html", img: "images/senior 1.png", title: "Senior Chore Share (SOS)" },
      { href: "investment.html", img: "images/investment 00.png", title: "Investment App - Sign-In Wireframe" },
      { href: "rentfaster.html", img: "images/rentfaster 0.png", title: "RentFaster - UX Evaluation & Redesign" }
    ];
  
    // 获取当前页面文件名（比如 "aritzia.html"）
    const current = location.pathname.split("/").pop();
  
    // 过滤掉当前项目
    const others = projects.filter(p => p.href !== current);
  
    // 随机选 4 个
    const random3 = others.sort(() => Math.random() - 0.5).slice(0, 4);
  
    // 渲染到 #youMayLikeGrid
    const grid = document.getElementById("youMayLikeGrid");
    if (grid) {
      grid.innerHTML = random3.map(p => `
        <a class="card" href="${p.href}">
          <img class="thumb" src="${p.img}" alt="${p.title}">
          <h3 class="card-title">${p.title}</h3>
        </a>
      `).join("");
    }
  })();
  

// ====== Contact form (only runs on contact page) ======
(() => {
  const form = $('#contactForm');
  if (!form) return;

  // Replace with your real endpoint (e.g., Formspree/Netlify)
  const FORM_ENDPOINT = null; // 'https://formspree.io/f/xxxxxx'
  const btn = $('#submitBtn');

  function mailtoFallback(name, email, message){
    const subject = encodeURIComponent('Message from portfolio site');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:dannieyang118@gmail.com?subject=${subject}&body=${body}`;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){ alert('Please fill out all fields.'); return; }

    if(!FORM_ENDPOINT){ mailtoFallback(name, email, message); form.reset(); return; }

    try{
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if(res.ok){ alert("Message sent. I'll get back to you soon."); form.reset(); }
      else { alert('Something went wrong. Please try again.'); }
    }catch(err){
      alert('Network error. Please try again or email me directly.');
    }finally{
      if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
    }
  });
})();
