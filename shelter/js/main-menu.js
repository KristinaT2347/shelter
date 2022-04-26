const burgerBtn = document.querySelector(".btn-burger")
const overlay = document.querySelector(".overlay")
const links = document.querySelectorAll(".main-menu a")

burgerBtn.addEventListener("click", () => {
  document.body.classList.toggle("is-menu-open")
})

window.addEventListener("resize", () => {
  hideMenu()
})

overlay.addEventListener("click", (e) => {
  hideMenu()
})

for (const link of links) {
  link.addEventListener("click", (e) => {
    if (document.body.classList.contains("is-menu-open")) {
      e.preventDefault()
      hideMenu()

      setTimeout(
        () => (window.location.href = e.target.getAttribute("href")),
        500
      )
    }
  })
}

function hideMenu() {
  document.body.classList.remove("is-menu-open")
}
