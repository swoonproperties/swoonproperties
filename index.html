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
  initListingFilters();
  initContactForm();
});

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
