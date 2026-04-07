(function() {
    const sections = document.querySelectorAll("section");
  
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animar');
          } else {
            entry.target.classList.remove('animar');
          }
        });
      });
  
      sections.forEach(section => {
        observer.observe(section);
      });
    }
})();