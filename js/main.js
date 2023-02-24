const chunkArray = (arr, chunk_size) => {
  var results = [];

  while (arr.length) {
    results.push(arr.splice(0, chunk_size));
  }
  return results;
};

const createCard = (pet) => {
  return `
  <div class="card" data-name="${pet.name}">
    <div class="card__image-container">
      <img
        src="${pet.img}"
        alt="${pet.type} - ${pet.name}"
        class="card__image"
      />
    </div>
    <div class="card__title">${pet.name}</div>
    <button class="btn">Learn more</button>
  </div>
  `;
};

const getRandomPets = (arr) => {
  return arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export { chunkArray, createCard, getRandomPets };
