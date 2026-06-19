(() => {
  // Smooth scroll for in-page jump links
  document.querySelectorAll('a[data-jump]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Highlight active jump-nav link based on visible section
  const sections = document.querySelectorAll('main section[id]');
  const jumpLinks = document.querySelectorAll('.jump-nav__link, .sub-nav__links a');

  const setActive = (id) => {
    jumpLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isMatch);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleVisibility = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 480);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
