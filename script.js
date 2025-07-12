// Replace with your actual JSON file URL on GitHub
const PRODUCTS_JSON_URL = "https://raw.githubusercontent.com/yourusername/yourrepo/main/products.json";

async function fetchProducts() {
  try {
    const response = await fetch(PRODUCTS_JSON_URL);
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(data) {
  const container = document.getElementById("productCategories");
  container.innerHTML = "";

  Object.keys(data).forEach(category => {
    const section = document.createElement("div");
    section.className = "category-section";
    section.innerHTML = `<h3>${category}</h3>`;
    
    const productList = document.createElement("div");
    productList.className = "product-list";

    data[category].forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
      `;
      productList.appendChild(card);
    });

    section.appendChild(productList);
    container.appendChild(section);
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const name = card.querySelector("h4").innerText.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", fetchProducts);
