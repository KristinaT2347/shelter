const modal = document.getElementById("modal")
const closeButtonModal = document.getElementById("modal-close-button")
const modalOverlay = document.querySelector(".modal-overlay")

const openModal = (pet) => {
  modal.classList.toggle("modal-container--active")
  modal.classList.add("fade-in")
  document.body.classList.add('is-modal-open');

  document.getElementById('modal-image').setAttribute('src', pet.img)
  document.getElementById('modal-title').textContent = pet.name
  document.getElementById('modal-breed').textContent = pet.breed
  document.getElementById('modal-description').textContent = pet.description
  document.getElementById('modal-age').textContent = pet.age
  document.getElementById('modal-inoculations').textContent = pet.inoculations.join(',')
  document.getElementById('modal-diseases').textContent = pet.diseases.join(',')
  document.getElementById('modal-parasites').textContent = pet.parasites.join(',')
}

closeButtonModal.addEventListener("click", () => {
  modal.classList.add("fade-out")
  document.body.classList.remove('is-modal-open')
  setTimeout(() => {
    modal.classList.toggle("modal-container--active")
  }, 200)
})

modalOverlay.addEventListener("click", () => {
  modal.classList.add("fade-out")
  document.body.classList.remove('is-modal-open')
  setTimeout(() => {
    modal.classList.toggle("modal-container--active")
  }, 200)
})

modal.addEventListener('click', (e) => e.preventDefault(), true)

export { openModal }
