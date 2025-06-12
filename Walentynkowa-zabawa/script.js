function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  const size = Math.random() * 20 + 10; //rozne rozmiary 10 - 30 px
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  heart.style.left = Math.random() * 100 + 'vw'; //rozna pozycja horyzontalnie
  heart.style.animationDuration = Math.random() * 3 + 2 + 's'; //rozna predkosc

  document.querySelector('.heart-container').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300); //generuje serce co 300ms

//ujawnianie elementów

//kafelek 2
document.getElementById('inputBox1').addEventListener('input', function () {
  let correctText = 'sloik'; //prawidlowe hasło
  let userInput = this.value.toLowerCase();
  let hiddenElement = document.getElementById('hiddenElement2');

  if (userInput === correctText) {
    hiddenElement.classList.add('visible');
    hiddenElement.classList.remove('hidden');
    this.disabled = true; //blokuje pole po wpisaniu dobrego hasla
  }
});

//kafelek 3
document.getElementById('inputBox2').addEventListener('input', function () {
  let correctText = 'mgielka'; //prawidlowe hasło
  let userInput = this.value.toLowerCase();
  let hiddenElement = document.getElementById('hiddenElement3');

  if (userInput === correctText) {
    hiddenElement.classList.add('visible');
    hiddenElement.classList.remove('hidden');
    this.disabled = true; //blokuje pole po wpisaniu dobrego hasla
  }
});

//kafelek 4
document.getElementById('inputBox3').addEventListener('input', function () {
  let correctText = 'slodycze'; //prawidlowe hasło
  let userInput = this.value.toLowerCase();
  let hiddenElement = document.getElementById('hiddenElement4');

  if (userInput === correctText) {
    hiddenElement.classList.add('visible');
    hiddenElement.classList.remove('hidden');
    this.disabled = true; //blokuje pole po wpisaniu dobrego hasla
  }
});

//kafelek 5
document.getElementById('inputBox4').addEventListener('input', function () {
  let correctText = 'lego'; //prawidlowe hasło
  let userInput = this.value.toLowerCase();
  let hiddenElement = document.getElementById('hiddenElement5');

  if (userInput === correctText) {
    hiddenElement.classList.add('visible');
    hiddenElement.classList.remove('hidden');
    this.disabled = true; //blokuje pole po wpisaniu dobrego hasla
  }
});

//kafelek 6
document.getElementById('inputBox5').addEventListener('input', function () {
  let correctText = 'listy'; //prawidlowe hasło
  let userInput = this.value.toLowerCase();
  let hiddenElement = document.getElementById('hiddenElement6');

  if (userInput === correctText) {
    hiddenElement.classList.add('visible');
    hiddenElement.classList.remove('hidden');
    this.disabled = true; //blokuje pole po wpisaniu dobrego hasla
  }
});

//ujawnianie podpowiedzi

//dodanie klikniecia na przyciski
document.getElementById('button1').addEventListener('click', () => showHint(1));
document.getElementById('button2').addEventListener('click', () => showHint(2));
document.getElementById('button3').addEventListener('click', () => showHint(3));
document.getElementById('button4').addEventListener('click', () => showHint(4));
document.getElementById('button5').addEventListener('click', () => showHint(5));

function showHint(hintNum) {
  let hint = document.getElementById(`hint${hintNum}`);
  if (hint) {
    hint.classList.add('visible');
    hint.classList.remove('hidden');
  }
}
