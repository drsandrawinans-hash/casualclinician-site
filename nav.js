document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (!toggle || !header || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    var statusEl = document.getElementById('form-status');

    contactForm.addEventListener('submit', function (e) {
          e.preventDefault();
          var submitBtn = contactForm.querySelector('button[type="submit"]');
          var originalText = submitBtn ? submitBtn.textContent : '';
          if (submitBtn) {
                  submitBtn.disabled = true;
                  submitBtn.textContent = 'Sending...';
          }
          if (statusEl) {
                  statusEl.textContent = '';
                  statusEl.className = 'form-status';
          }

          fetch(contactForm.action, {
                  method: 'POST',
                  headers: { 'Accept': 'application/json' },
                  body: new FormData(contactForm)
          })
            .then(function (response) { return response.json(); })
            .then(function (data) {
                      if (data.success) {
                                  contactForm.reset();
                                  if (statusEl) {
                                                statusEl.textContent = 'Thanks for reaching out! Your message has been sent.';
                                                statusEl.className = 'form-status form-status-success';
                                  }
                      } else {
                                  if (statusEl) {
                                                statusEl.textContent = 'Something went wrong sending your message. Please email DrSandraWinans@casualclinician.com directly.';
                                                statusEl.className = 'form-status form-status-error';
                                  }
                      }
            })
            .catch(function () {
                      if (statusEl) {
                                  statusEl.textContent = 'Something went wrong sending your message. Please email DrSandraWinans@casualclinician.com directly.';
                                  statusEl.className = 'form-status form-status-error';
                      }
            })
            .finally(function () {
                      if (submitBtn) {
                                  submitBtn.disabled = false;
                                  submitBtn.textContent = originalText;
                      }
            });
    });
});
