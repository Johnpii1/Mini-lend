
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-[#2b0f0f]", "shadow-lg");
    } else {
      header.classList.remove("bg-[#2b0f0f]", "shadow-lg");
    }
  });

