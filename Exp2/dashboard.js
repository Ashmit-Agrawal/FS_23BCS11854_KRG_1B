const toggleBtn = document.getElementById("theme-toggle");
const htmlEl = document.getElementById("html");
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  htmlEl.classList.add("dark");
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    htmlEl.classList.contains("dark") ? "dark" : "light"
  );
});

// Toggle sidebar (mobile)
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});
