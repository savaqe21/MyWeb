// Globalny stan aplikacji
let activeQuestions = [];
let currentQuestionIndex = 0;
let userScore = 0;
let maxPossibleScore = 0;

// Liczniki dla bieżącego pytania
let currentQuestionCorrectClicked = 0;
let currentQuestionWrongClicked = 0;

// Algorytm mieszający Fishera-Yatesa (prawdziwe losowanie)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funkcja startująca quiz i pobierająca odpowiednie pliki JSON
async function startQuiz(category) {
  try {
    let filesToFetch = [];

    if (category === 'ALL') {
      filesToFetch = [
        'questions_a.json',
        'questions_b.json',
        'questions_c.json',
      ];
    } else {
      filesToFetch = [`questions_${category.toLowerCase()}.json`];
    }

    const promises = filesToFetch.map((file) =>
      fetch(file).then((res) => {
        if (!res.ok) throw new Error(`Nie znaleziono pliku: ${file}`);
        return res.json();
      }),
    );

    const results = await Promise.all(promises);
    activeQuestions = results.flat();

    if (activeQuestions.length === 0) {
      alert('Błąd: Baza pytań jest pusta!');
      return;
    }

    shuffleArray(activeQuestions);

    currentQuestionIndex = 0;
    userScore = 0;
    maxPossibleScore = activeQuestions.length;

    document.getElementById('menu-view').classList.add('hidden');
    document.getElementById('results-view').classList.add('hidden');
    document.getElementById('quiz-view').classList.remove('hidden');

    renderQuestion();
  } catch (error) {
    console.error('Błąd ładowania bazy pytań:', error);
    alert(
      'Nie udało się załadować pytań. Upewnij się, że pliki JSON znajdują się w tym samym katalogu co index.html.',
    );
  }
}

// Renderowanie aktualnego pytania na ekranie (Zoptymalizowane pod Dark Mode)
function renderQuestion() {
  const qData = activeQuestions[currentQuestionIndex];

  currentQuestionCorrectClicked = 0;
  currentQuestionWrongClicked = 0;

  document.getElementById('next-btn').classList.add('hidden');

  const categoryMap = { A: 'Fundamenty PM', B: 'PRINCE2', C: 'Prawo w IT' };
  document.getElementById('info-category').innerText =
    `Sekcja: ${categoryMap[qData.category] || qData.category}`;
  document.getElementById('info-counter').innerText =
    `Pytanie ${currentQuestionIndex + 1} z ${activeQuestions.length}`;

  const progressPercent = (currentQuestionIndex / activeQuestions.length) * 100;
  document.getElementById('progress-bar').style.width = `${progressPercent}%`;

  document.getElementById('question-text').innerText =
    `${qData.id}. ${qData.question}`;

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const shuffledOptions = shuffleArray([...qData.options]);

  shuffledOptions.forEach((option) => {
    const button = document.createElement('button');

    // Klasy domyślne dla kafelka w wersji DARK MODE
    button.className =
      'w-full text-left p-4 border-2 border-slate-700 bg-slate-800 text-slate-200 rounded-xl font-medium transition duration-150 ease-in-out block cursor-pointer hover:border-slate-500 hover:bg-slate-750 shadow-md active:scale-[0.99]';
    button.innerText = option.text;

    button.onclick = () => {
      document.getElementById('next-btn').classList.remove('hidden');

      // Sprawdzenie poprawności i naniesienie kolorów w wersji DARK
      if (option.isCorrect) {
        button.className =
          'w-full text-left p-4 border-2 border-emerald-500 bg-emerald-950/60 text-emerald-300 rounded-xl font-semibold shadow-md option-disabled animate-pulse';
        currentQuestionCorrectClicked++;
      } else {
        button.className =
          'w-full text-left p-4 border-2 border-rose-500 bg-rose-950/60 text-rose-300 rounded-xl font-semibold shadow-md option-disabled';
        currentQuestionWrongClicked++;
      }
    };

    container.appendChild(button);
  });
}

function nextQuestion() {
  const qData = activeQuestions[currentQuestionIndex];
  const totalCorrectInQuestion = qData.options.filter(
    (o) => o.isCorrect,
  ).length;

  if (
    currentQuestionWrongClicked === 0 &&
    currentQuestionCorrectClicked === totalCorrectInQuestion
  ) {
    userScore++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuestions.length) {
    renderQuestion();
  } else {
    showFinalResults();
  }
}

function showFinalResults() {
  document.getElementById('quiz-view').classList.add('hidden');
  document.getElementById('results-view').classList.remove('hidden');

  document.getElementById('progress-bar').style.width = '100%';
  document.getElementById('final-score').innerText =
    `${userScore} / ${maxPossibleScore}`;

  const percentage =
    maxPossibleScore > 0 ? (userScore / maxPossibleScore) * 100 : 0;
  let comment = '';

  if (percentage >= 90)
    comment =
      '🥇 Fenomenalnie! Materiał opanowany w stopniu mistrzowskim. Zaliczenie to formalność!';
  else if (percentage >= 70)
    comment =
      '🥈 Bardzo dobrze! Masz solidną wiedzę, spokojnie poradzisz sobie na teście.';
  else if (percentage >= 50)
    comment =
      '🥉 Próg zaliczenia przekroczony, ale bezpieczniej będzie powtórzyć najtrudniejsze pytania.';
  else
    comment =
      '❌ Wynik poniżej progu zaliczenia. Przejrzyj materiały raz jeszcze i spróbuj ponownie!';

  document.getElementById('final-comment').innerText =
    `${comment} (${percentage.toFixed(1)}%)`;
}

function backToMenu() {
  document.getElementById('quiz-view').classList.add('hidden');
  document.getElementById('results-view').classList.add('hidden');
  document.getElementById('menu-view').classList.remove('hidden');
}
