import allPets from '../../js/pets.js';
import { openModal } from '../../js/modal.js';
import { createCard, chunkArray, getRandomPets } from '../../js/main.js';

const btnPrevSlide = document.querySelector('#prev-slide');
const btnNextSlide = document.querySelector('#next-slide');
const carousel = document.querySelector('#carousel');

const moveLeft = () => {
  const leftSlide = document.querySelector('.left-slide');
  leftSlide.innerHTML = getRandomSlide();
  carousel.classList.add('transition-left');
  btnPrevSlide.removeEventListener('click', moveLeft);
  btnNextSlide.removeEventListener('click', moveRight);
};

const moveRight = () => {
  const rightSlide = document.querySelector('.right-slide');
  rightSlide.innerHTML = getRandomSlide();
  carousel.classList.add('transition-right');
  btnPrevSlide.removeEventListener('click', moveLeft);
  btnNextSlide.removeEventListener('click', moveRight);
};

btnPrevSlide.addEventListener('click', moveLeft);
btnNextSlide.addEventListener('click', moveRight);

carousel.addEventListener('animationend', (animationEvent) => {
  const leftSlide = document.querySelector('.left-slide');
  const rightSlide = document.querySelector('.right-slide');
  const activeSlide = document.querySelector('.active-slide');
  const activeSlideHtml = activeSlide.innerHTML;
  const rightSlideHtml = rightSlide.innerHTML;
  const leftSlideHtml = leftSlide.innerHTML;

  if (animationEvent.animationName === 'move-left') {
    carousel.classList.remove('transition-left');
    activeSlide.innerHTML = leftSlideHtml;
    rightSlide.innerHTML = activeSlideHtml;
    leftSlide.innerHTML = rightSlideHtml;
  } else {
    carousel.classList.remove('transition-right');
    activeSlide.innerHTML = rightSlideHtml;
    rightSlide.innerHTML = leftSlideHtml;
    leftSlide.innerHTML = activeSlideHtml;
  }

  btnPrevSlide.addEventListener('click', moveLeft);
  btnNextSlide.addEventListener('click', moveRight);

  const cards = activeSlide.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const pet = allPets.find(
        (item) => item.name === e.currentTarget.dataset.name
      );
      openModal(pet);
    });
  });
});

const getRandomSlide = () => {
  const activeSlide = document.querySelector('.active-slide');
  const activeCards = activeSlide.querySelectorAll('.card');
  const names = [];

  for (const slide of activeCards) {
    names.push(slide.dataset.name);
  }

  return generateSlide(names);
};

const generateSlide = (names) => {
  const pets = getRandomPets(allPets).filter(
    (item) => !names.includes(item.name)
  );

  const slides = getSlides(pets);

  return slides[0].reduce((html, slide) => {
    html += createCard(slide);
    return html;
  }, '');
};

const getSlides = (pets) => {
  let slides = [];

  if (window.innerWidth < 768) {
    slides = chunkArray(pets, 1);
  } else if (window.innerWidth < 1280) {
    slides = chunkArray(pets, 2);
  } else {
    slides = chunkArray(pets, 3);
    if (slides[2] && slides[2].length < 3) {
      slides[2].push(slides[0][2]);
    }
  }

  return slides;
};

const generateSlides = () => {
  carousel.innerHTML = '';
  const pets = getRandomPets(allPets);
  const slides = getSlides(pets);

  for (let i = 0; i < 3; i++) {
    const slide = document.createElement('div');
    slide.classList.add('cards');

    if (i === 0) {
      slide.classList.add('left-slide');
    }

    if (i === 1) {
      slide.classList.add('active-slide');
    }

    if (i === 2) {
      slide.classList.add('right-slide');
    }

    for (let j = 0; j < slides[i].length; j++) {
      slide.innerHTML += createCard(slides[i][j]);
    }

    carousel.append(slide);
  }

  const cards = carousel.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      console.log(e.currentTarget.dataset.name);
      const pet = allPets.find(
        (item) => item.name === e.currentTarget.dataset.name
      );
      openModal(pet);
    });
  });
};

generateSlides();

window.addEventListener('resize', () => {
  generateSlides();
});
