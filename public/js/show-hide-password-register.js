function togglePasswordVisibility(inputId, textId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const toggleText = document.getElementById(textId);
  const toggleIcon = document.getElementById(iconId);

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
