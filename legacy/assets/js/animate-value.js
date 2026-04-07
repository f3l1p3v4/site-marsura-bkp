function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = "+R$ " + Math.floor(progress * (end - start) + start).toLocaleString('pt-BR');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function handleScroll() {
    const elements = [
      {id: 'count1', endValue: 2000000},
      {id: 'count2', endValue: 1000000},
      {id: 'count3', endValue: 10000000},
    ];
    elements.forEach(({id, endValue}) => {
      const element = document.getElementById(id);
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        animateValue(id, 0, endValue, 2000); // duração de 2 segundos
      }
    });
  }
  
  // Adiciona o listener para o scroll
  window.addEventListener('scroll', handleScroll);