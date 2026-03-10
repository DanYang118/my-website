// ====== Helpers ======
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
//--- about me---
function scrollGallery(direction) {
  const grid = document.getElementById('photoGrid');
  // 计算滚动距离：取第一张图片的宽度 + 间距
  const scrollAmount = grid.clientWidth * 0.8; 
  
  grid.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.work-card-v3');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. 处理按钮激活状态
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. 获取筛选类别
      const filterValue = button.getAttribute('data-filter');

      // 3. 执行筛选动画
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          // 增加一个小延迟，让淡入动画更自然
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // 动画结束后隐藏元素，防止占位
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});




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

