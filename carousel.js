(function () {
  var slides = document.querySelectorAll('#ny-carousel .ny-slide');
  var dots = document.querySelectorAll('#ny-carousel-dots .ny-dot');
  if (!slides.length) return;
  var current = 0;
  var total = slides.length;
  var intervalId;

  function goTo(index) {
    slides[current].classList.remove('opacity-100');
    slides[current].classList.add('opacity-0');
    dots[current].classList.remove('bg-primary-container');
    dots[current].classList.add('bg-white');
    current = index;
    slides[current].classList.remove('opacity-0');
    slides[current].classList.add('opacity-100');
    dots[current].classList.remove('bg-white');
    dots[current].classList.add('bg-primary-container');
  }

  function next() { goTo((current + 1) % total); }
  function startAutoplay() { intervalId = setInterval(next, 7000); }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      clearInterval(intervalId);
      goTo(i);
      startAutoplay();
    });
  });

  startAutoplay();
})();
