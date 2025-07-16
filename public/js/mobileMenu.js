function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    setTimeout(() => {
      menu.classList.remove("opacity-0", "scale-95");
      menu.classList.add("opacity-100", "scale-100");
    }, 10);
  } else {
    menu.classList.remove("opacity-100", "scale-100");
    menu.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      menu.classList.add("hidden");
    }, 130);
  }
}
