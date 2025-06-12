const techCard = document.querySelectorAll('.card');
const techTitleOne = document.querySelectorAll('.nameOne');
const techTitleTwo = document.querySelectorAll('.nameTwo');
const techTitleThree = document.querySelectorAll('.nameThree');
const itemtech = document.querySelectorAll('.item');
const titletech = document.querySelectorAll('.item p');
const colorArray = ['ff605c', 'ffbd44', '00ca4e'];

techCard.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    techTitleOne.forEach((title) => {
      let i = 0;
      i = Math.floor(Math.random() * colorArray.length);
      title.style.color = `#${colorArray[i]}`;
    });
    techTitleTwo.forEach((title) => {
      let i = 0;
      i = Math.floor(Math.random() * colorArray.length);
      title.style.color = `#${colorArray[i]}`;
    });
    techTitleThree.forEach((title) => {
      let i = 0;
      i = Math.floor(Math.random() * colorArray.length);
      title.style.color = `#${colorArray[i]}`;
    });
  });
});

itemtech.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    titletech.forEach((title) => {
      let i = 0;
      i = Math.floor(Math.random() * colorArray.length);
      title.style.color = `#${colorArray[i]}`;
    });
  });
});

const hideCards = document.querySelectorAll('.hide');
const btn = document.querySelector('.btn-more');
const btnDiv = document.querySelector('.show-more');
let text = true;

btn.addEventListener('click', function () {
  if (text) {
    hideCards.forEach((card) => {
      card.classList.remove('hide');
    });
    btn.textContent = 'zwiń';
    text = false;
  } else {
    hideCards.forEach((card) => {
      card.classList.add('hide');
    });
    btn.textContent = 'rozwiń';
    text = true;
  }
});
