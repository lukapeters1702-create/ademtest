/* AdemRuimte — interactie: mobiel menu, modal, scroll-reveal, jaartal */
(function () {
  'use strict';

  /* ---- Navigatie: transparant over de hero, beige bij scrollen ---- */
  const nav = document.querySelector('[data-nav]');
  const overHero = document.body.classList.contains('has-hero');
  function updateNav() {
    if (!nav) return;
    if (!overHero) { nav.classList.add('solid'); return; }
    nav.classList.toggle('solid', window.scrollY > 40);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ---- Mobiel menu ---- */
  const menu = document.querySelector('[data-mobile-menu]');
  const back = document.querySelector('[data-menu-back]');
  const toggle = document.querySelector('[data-nav-toggle]');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    back && back.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle && toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  back && back.addEventListener('click', () => setMenu(false));
  menu && menu.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
    if (!a.hasAttribute('data-open-modal')) setMenu(false);
  }));

  /* ---- Modal (Plan een kennismaking) ---- */
  const modal = document.querySelector('[data-modal]');
  function setModal(open) {
    if (!modal) return;
    modal.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { setMenu(false); const f = modal.querySelector('input,textarea'); f && setTimeout(() => f.focus(), 350); }
  }
  document.querySelectorAll('[data-open-modal]').forEach(b =>
    b.addEventListener('click', (e) => { e.preventDefault(); setModal(true); }));
  document.querySelectorAll('[data-modal-close]').forEach(b =>
    b.addEventListener('click', () => setModal(false)));
  modal && modal.addEventListener('click', (e) => { if (e.target === modal) setModal(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setModal(false); setMenu(false); } });

  /* ---- Contactformulier ----
     Werkt direct via de e-mailclient van de bezoeker (mailto naar CONTACT_EMAIL).
     Wil je een nette formulier-inbox zonder mailclient? Vraag een gratis access key
     aan op https://web3forms.com met ademruimte@ziggo.nl en plak die hieronder in
     WEB3FORMS_KEY. Dan worden inzendingen automatisch naar dat adres gemaild. */
  const CONTACT_EMAIL = 'ademruimte@ziggo.nl';
  const WEB3FORMS_KEY = ''; // <-- plak hier je Web3Forms access key voor een echte formulier-inbox
  const toast = document.querySelector('.toast');

  function showToast(msg) {
    if (!toast) return;
    if (msg) toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  function fields(form) {
    const els = form.querySelectorAll('input, textarea');
    return {
      naam: (els[0] && els[0].value.trim()) || '',
      contact: (els[1] && els[1].value.trim()) || '',
      bericht: (els[2] && els[2].value.trim()) || ''
    };
  }

  function sendMailto(f) {
    const body =
      'Naam: ' + f.naam + '\n' +
      'E-mail of telefoon: ' + f.contact + '\n\n' +
      'Bericht:\n' + (f.bericht || '(geen toelichting)');
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Aanvraag via AdemRuimte website') +
      '&body=' + encodeURIComponent(body);
    showToast('Je mailprogramma opent met je bericht. Verstuur het om af te ronden.');
  }

  document.querySelectorAll('[data-form]').forEach(form =>
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = fields(form);
      setModal(false);
      if (WEB3FORMS_KEY) {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: 'Nieuwe aanvraag via AdemRuimte website',
            from_name: 'AdemRuimte website',
            Naam: f.naam, Contact: f.contact, Bericht: f.bericht
          })
        }).then(r => r.json()).then(data => {
          if (data && data.success) { showToast('Bedankt, ik neem binnen één werkdag contact op.'); form.reset(); }
          else { sendMailto(f); }
        }).catch(() => sendMailto(f)).finally(() => { if (btn) btn.disabled = false; });
      } else {
        sendMailto(f);
        form.reset();
      }
    }));

  /* ---- Scroll-reveal ---- */
  const items = document.querySelectorAll('.reveal, .reveal-img');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  /* ---- Jaartal ---- */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
