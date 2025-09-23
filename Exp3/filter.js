const products = [
  { name: "Laptop", category: "electronics" },
  { name: "Smartphone", category: "electronics" },
  { name: "T-Shirt", category: "clothing" },
  { name: "Jeans", category: "clothing" },
  { name: "Novel", category: "books" },
  { name: "Textbook", category: "books" },
];

const productList = document.getElementById("product-list");
const categorySelect = document.getElementById("category");

function renderProducts(filter = "all") {
  productList.innerHTML = products
    .filter(p => filter === "all" || p.category === filter)
    .map(
      p => `
      <div class="p-4 border rounded shadow bg-white text-center">
        ${p.name}
      </div>
    `
    )
    .join("");
}

categorySelect.addEventListener("change", (e) => {
  renderProducts(e.target.value);
});

// Initial render
renderProducts();
