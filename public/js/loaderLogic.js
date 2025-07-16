window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("opacity-0", "transition-opacity", "duration-700");
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
