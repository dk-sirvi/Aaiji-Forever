const jsonUrl = "https://raw.githubusercontent.com/dk-sirvi/Aaiji-Forever/refs/heads/main/products.json"; // replace with your GitHub raw JSON URL

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();

  document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchBox").value.toLowerCase();
    filterProducts(query);
  });
});

let allProducts = [];

async function fetchProducts() {
  try {
    const res = await fetch(jsonUrl);
    const data = await res.json();
    allProducts = data.products;
    renderProducts(allProducts);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  const grouped = products.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  for (let category in grouped) {
    const section = document.createElement("div");
    section.className = "category";
    section.innerHTML = `<h3>${category}</h3>`;

    const grid = document.createElement("div");
    grid.className = "product-grid";

    grouped[category].forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <p>${product.name}</p>
        <span>₹${product.price}</span>
      `;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  }
}

function filterProducts(query) {
  const filtered = allProducts.filter(
    product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );
  renderProducts(filtered);
}
