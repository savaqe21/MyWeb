//funkcja mieszajaca tablice
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//generowanie divow z powodami
async function loadSentences() {
  try {
    const response = await fetch('powody.txt');
    const text = await response.text();
    let sentences = text.split('\n').filter((line) => line.trim() !== '');

    shuffleArray(sentences);

    const container = document.getElementById('container');
    sentences.forEach((sentence, index) => {
      const div = document.createElement('div');
      div.className = 'sentence-box';
      div.textContent = `${index + 1}. ${sentence}`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Błąd wczytywania pliku:', error);
  }
}

loadSentences();

//animowane tlo z serduszkami
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
