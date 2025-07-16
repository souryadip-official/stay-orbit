function togglePasswordVisibility() {
  const passwordInput = document.getElementById("passwordInput");
  const toggleText = document.getElementById("toggleText");
  const toggleIcon = document.getElementById("toggleIcon");

  if (passwordInput.classList.contains("show")) {
    passwordInput.classList.remove("show");
    passwordInput.type = "password";
    if (toggleText) toggleText.textContent = "View";
    if (toggleIcon) toggleIcon.textContent = "🫣";
  } else {
    passwordInput.classList.add("show");
    passwordInput.type = "text";
    if (toggleText) toggleText.textContent = "Hide";
    if (toggleIcon) toggleIcon.textContent = "🙈";
  }
}
