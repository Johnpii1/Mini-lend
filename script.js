  //FOR HEADER BACKGROUND
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-[#2b0f0f]", "shadow-lg");
    } else {
      header.classList.remove("bg-[#2b0f0f]", "shadow-lg");
    }
  });


  //FOR MODULAR
  const openBtns = document.querySelectorAll(".openModal");
  const closeBtn = document.getElementById("closeModal");
  const modal = document.getElementById("modalOverlay");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });


//FOR MOBILE FQ AND WHITE PAPER
const headerBtn = document.getElementById("headers");
const headermenus = document.querySelector(".menus");
const closeBtns = document.getElementById("closebtn");

headerBtn.addEventListener("click", () => {
  headermenus.classList.toggle("hidden");

closeBtns.addEventListener("click", () => {
    headermenus.classList.toggle("hidden");

  });
});






