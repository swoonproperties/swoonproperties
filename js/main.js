// ---------- Mobile nav ----------
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav.links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  renderListingGrids();
  initCalculator();
  initListingFilters();
  initContactForm();
  initHeroPhotoScroll();
});

// ---------- New Project listing grids (homepage preview + full page) ----------
// Both grids render from the shared PROJECT_LISTINGS array in
// js/projects-data.js, so editing a listing there updates both places.
function renderListingGrids() {
  if (typeof PROJECT_LISTINGS === 'undefined') return;

  function cardHtml(item) {
    return `
      <div class="listing-card" data-type="${item.type}">
        <div class="listing-photo"><span class="listing-tag">${item.tag}</span></div>
        <div class="listing-body">
          <div class="listing-price">${item.price}</div>
          <div class="listing-loc">${item.location}</div>
          <div class="listing-specs">
            <span><b>${item.beds}</b> bed</span><span><b>${item.baths}</b> bath</span><span><b>${item.sqft}</b> sqft</span>
          </div>
        </div>
      </div>`;
  }

  const homeGrid = document.getElementById('home-listings-grid');
  if (homeGrid) {
    const featured = PROJECT_LISTINGS.filter(item => item.featured).slice(0, 3);
    homeGrid.innerHTML = featured.map(cardHtml).join('');
  }

  const projectGrid = document.getElementById('project-listings-grid');
  if (projectGrid) {
    projectGrid.innerHTML = PROJECT_LISTINGS.map(cardHtml).join('');
  }
}

// ---------- Hero photo scroll effect ----------
// Fades and slides the hero photo out as the user scrolls past the hero.
// Tied directly to scroll position (not a one-shot animation), so scrolling
// back up naturally brings the photo back in — no extra logic needed.
function initHeroPhotoScroll() {
  const photo = document.getElementById('hero-photo');
  const hero = document.querySelector('.hero');
  if (!photo || !hero) return;

  let ticking = false;

  function update() {
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
    photo.style.opacity = String(1 - progress);
    photo.style.transform = `translateY(${progress * -60}px) scale(${1 - progress * 0.08})`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

// ---------- Loan / mortgage calculator ----------
function initCalculator() {
  const priceEl = document.getElementById('calc-price');
  const downEl = document.getElementById('calc-down');
  const rateEl = document.getElementById('calc-rate');
  const yearsEl = document.getElementById('calc-years');
  if (!priceEl) return; // calculator not on this page

  const priceOut = document.getElementById('calc-price-out');
  const downOut = document.getElementById('calc-down-out');
  const rateOut = document.getElementById('calc-rate-out');
  const yearsOut = document.getElementById('calc-years-out');

  const monthlyOut = document.getElementById('calc-monthly');
  const loanOut = document.getElementById('calc-loan-amount');
  const totalInterestOut = document.getElementById('calc-total-interest');
  const totalPaidOut = document.getElementById('calc-total-paid');

  function fmt(n) {
    return 'RM ' + Math.round(n).toLocaleString('en-MY');
  }

  function recalc() {
    const price = Number(priceEl.value);
    const downPct = Number(downEl.value);
    const rate = Number(rateEl.value);
    const years = Number(yearsEl.value);

    priceOut.textContent = fmt(price);
    downOut.textContent = downPct + '%';
    rateOut.textContent = rate.toFixed(2) + '%';
    yearsOut.textContent = years + ' yrs';

    const downAmount = price * (downPct / 100);
    const loanAmount = price - downAmount;
    const monthlyRate = (rate / 100) / 12;
    const n = years * 12;

    let monthly;
    if (monthlyRate === 0) {
      monthly = loanAmount / n;
    } else {
      monthly = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - loanAmount;

    monthlyOut.textContent = fmt(monthly);
    loanOut.textContent = fmt(loanAmount);
    totalInterestOut.textContent = fmt(totalInterest);
    totalPaidOut.textContent = fmt(totalPaid);
  }

  [priceEl, downEl, rateEl, yearsEl].forEach(el => el.addEventListener('input', recalc));
  recalc();
}

// ---------- Listing filters (project pages) ----------
function initListingFilters() {
  const buttons = document.querySelectorAll('.filter-row button');
  const cards = document.querySelectorAll('[data-type]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
      });
    });
  });
}

// ---------- Contact form (placeholder submit handling) ----------
function initContactForm() {
  const form = document.querySelector('form.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    // NOTE: this is a placeholder. To actually receive messages, connect this
    // form to a free service like Formspree, Google Forms, or Netlify Forms.
    // See the README for setup steps.
    if (status) {
      status.textContent = 'Thanks — this is a demo form. Connect it to Formspree/Netlify Forms (see README) so messages reach your inbox.';
      status.style.color = '#A9793C';
    }
    form.reset();
  });
}
