import allPets from "../../js/pets.js"
import { openModal } from "../../js/modal.js"

let PAGES = []
let PAGE = 0

const getRandomPets = (arr) => {
  return arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
}

const chunkArray = (arr, chunk_size) => {
  var results = []

  while (arr.length) {
    results.push(arr.splice(0, chunk_size))
  }
  return results
}

const generatePages = () => {
  let pets = []

  for (let i = 0; i < 6; i++) {
    pets = [...pets, ...getRandomPets(allPets)]
  }

  if (window.innerWidth < 768) {
    return chunkArray(pets, 3)
  }

  if (window.innerWidth < 1280) {
    return chunkArray(pets, 6)
  }

  return chunkArray(pets, 8)
}

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
  `
}
const firstPageButton = document.getElementById("first-page")
const lastPageButton = document.getElementById("last-page")
const prevPageButton = document.getElementById("prev-page")
const nextPageButton = document.getElementById("next-page")
const currentPage = document.getElementById("current-page")
const cardsContainer = document.getElementById("cards-container")

const generatePage = () => {
  let html = ""
  PAGES[PAGE].forEach((pet) => (html += createCard(pet)))

  return html
}

const onChangePage = () => {
  cardsContainer.classList.add("fade-out")

  currentPage.textContent = PAGE + 1

  if (PAGE === 0) {
    firstPageButton.setAttribute("disabled", true)
    prevPageButton.setAttribute("disabled", true)
  } else {
    firstPageButton.removeAttribute("disabled")
    prevPageButton.removeAttribute("disabled")
  }

  if (PAGE + 1 === PAGES.length) {
    nextPageButton.setAttribute("disabled", true)
    lastPageButton.setAttribute("disabled", true)
  } else {
    nextPageButton.removeAttribute("disabled")
    lastPageButton.removeAttribute("disabled")
  }
}

PAGES = generatePages()
cardsContainer.innerHTML = generatePage()

const cards = cardsContainer.querySelectorAll(".card")

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    const pet = allPets.find((item) => item.name === e.currentTarget.dataset.name)
    openModal(pet)
  })
})

firstPageButton.addEventListener("click", () => {
  PAGE = 0
  onChangePage()
})

prevPageButton.addEventListener("click", () => {
  PAGE--
  onChangePage()
})

nextPageButton.addEventListener("click", () => {
  PAGE++
  onChangePage()
})

lastPageButton.addEventListener("click", () => {
  PAGE = PAGES.length - 1
  onChangePage()
})

cardsContainer.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "fade-out") {
    cardsContainer.innerHTML = generatePage()
    cardsContainer.classList.remove("fade-out")
    cardsContainer.classList.add("fade-in")
    const cards = cardsContainer.querySelectorAll(".card")

    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        console.log(e.currentTarget.dataset.name);
        const pet = allPets.find((item) => item.name === e.currentTarget.dataset.name)
        openModal(pet)
      })
    })
  } else {
    cardsContainer.classList.remove("fade-in")
  }
})

window.addEventListener("resize", () => {
  PAGES = generatePages()
  PAGE = 0
  onChangePage()
})
