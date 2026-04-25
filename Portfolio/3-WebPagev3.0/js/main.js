//przelaczanie motywu strony
$(function () {
  const d = new Date();
  const hours = d.getHours();
  const night = hours >= 19 || hours <= 7; // pomiedzy 7pm i 7am
  const body = document.querySelector('body');
  const input = document.getElementById('switch');

  // Ustawienie początkowe na podstawie godziny
  if (night) {
    input.checked = true;
    body.classList.add('night');
  }

  // Płynna zmiana motywu przy przełączaniu
  input.addEventListener('change', function () {
    if (this.checked) {
      body.classList.add('night');
    } else {
      body.classList.remove('night');
    }
  });

  //element wracania na gore strony
  const introHeight = document.querySelector('.intro').offsetHeight;
  const topButton = document.getElementById('top-button');
  const $topButton = $('#top-button');

  window.addEventListener(
    'scroll',
    function () {
      if (window.scrollY > introHeight) {
        $topButton.fadeIn();
      } else {
        $topButton.fadeOut();
      }
    },
    false
  );

  topButton.addEventListener('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  //poruszajaca sie reka
  const hand = document.querySelector('.emoji.wave-hand');

  function waveOnLoad() {
    if (hand) {
      hand.classList.add('wave');
      setTimeout(function () {
        hand.classList.remove('wave');
      }, 2000);
    }
  }

  setTimeout(function () {
    waveOnLoad();
  }, 1000);

  if (hand) {
    hand.addEventListener('mouseover', function () {
      hand.classList.add('wave');
    });

    hand.addEventListener('mouseout', function () {
      hand.classList.remove('wave');
    });
  }

  //amimacje elementow
  window.sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    viewFactor: 0.3,
  });

  sr.reveal('.background');
  sr.reveal('.skills');
  sr.reveal('.experience', { viewFactor: 0.2 });
  sr.reveal('.featured-projects', { viewFactor: 0.1 });
  sr.reveal('.other-projects', { viewFactor: 0.05 });
});

//bierzaca data na copyright
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
