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

  initCalculator();
  initEligibilityCalculator();
  initListingFilters();
  initContactForm();
  initHeroPhotoScroll();
});

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

// ---------- DSR / loan eligibility calculator ----------
function initEligibilityCalculator() {
  const incomeEl = document.getElementById('elig-income');
  if (!incomeEl) return; // eligibility calculator not on this page

  const carEl = document.getElementById('elig-car');
  const cardEl = document.getElementById('elig-card');
  const personalEl = document.getElementById('elig-personal');
  const otherEl = document.getElementById('elig-other');

  const incomeOut = document.getElementById('elig-income-out');
  const totalOut = document.getElementById('elig-total-commitments');
  const dsrOut = document.getElementById('elig-dsr');
  const verdictOut = document.getElementById('elig-verdict');

  function fmt(n) {
    return 'RM ' + Math.round(n).toLocaleString('en-MY');
  }

  function recalc() {
    const income = Math.max(Number(incomeEl.value) || 0, 0);
    const commitments = [carEl, cardEl, personalEl, otherEl]
      .reduce((sum, el) => sum + (Math.max(Number(el.value) || 0, 0)), 0);

    const dsr = income > 0 ? (commitments / income) * 100 : 0;

    incomeOut.textContent = fmt(income);
    totalOut.textContent = fmt(commitments);
    dsrOut.textContent = dsr.toFixed(1) + '%';

    if (income === 0) {
      verdictOut.textContent = 'Enter your net monthly income to see your DSR.';
    } else if (dsr <= 30) {
      verdictOut.textContent = 'Strong position — you likely have plenty of room left for a new home loan.';
    } else if (dsr <= 50) {
      verdictOut.textContent = 'Moderate — you likely still have room, but how much depends on the loan amount. Let’s talk through it.';
    } else {
      verdictOut.textContent = 'Tight — your existing commitments are already high. Let’s review your numbers together before house-hunting.';
    }
  }

  [incomeEl, carEl, cardEl, personalEl, otherEl].forEach(el => el.addEventListener('input', recalc));
  recalc();
}

// ---------- Listing filters (subsale / project pages) ----------
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
