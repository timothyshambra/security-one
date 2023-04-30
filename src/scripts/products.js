const productsPerPage = 4;
const debounceTime = 200;

let products;
let startIndex = 0;
let isLoading = false;

function populateProducts(products) {
  const results = document.querySelector(".results");

  if (products.length === 0) {
    const noResultsMessage =
      '<div class="no-results"><h3>No products found<h3></div>';
    results.innerHTML = noResultsMessage;
  } else {
    products.forEach((product, index) => {
      if (index >= startIndex && index < startIndex + productsPerPage) {
        const productCard = `
          <a href="#" class="product-card">
            <img src="${product.image}" alt="product photo" class="product-image">
            <h2>${product.title}</h2>
            <p class="description">${product.description}</p>
          </a>`;
        results.innerHTML += productCard;
      }
    });
  }
}

function loadMoreProducts() {
  if (isLoading) {
    return;
  }

  isLoading = true;

  startIndex += productsPerPage;

  setTimeout(() => {
    populateProducts(products);
    isLoading = false;
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data.results;
      populateProducts(products);
    })
    .catch((error) => {
      console.error(error);
    });

  window.addEventListener(
    "scroll",
    debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreProducts();
      }
    }, debounceTime)
  );
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
