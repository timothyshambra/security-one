const productsPerPage = 4;
const debounceTime = 200;

let products = [];
let startIndex = 0;
let isLoading = false;

/**
 * Populates the products section with the given products.
 * @param {Array} products - The products to populate the section with.
*/
const populateProducts = (products) => {
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

/**
 * Loads more products when the user scrolls to the bottom of the page.
*/
const loadMoreProducts = () => {
  if (isLoading) {
    return;
  }

  isLoading = true;

  startIndex += productsPerPage;

  setTimeout(() => {
    populateProducts(products);
    isLoading = false;
  }, 250);
};

/**
 * Populates the products section with the given products on page load.
 */
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
      if (scrollTop + clientHeight >= scrollHeight - 15) {
        loadMoreProducts();
      }
    }, debounceTime)
  );
});


/**
 * Debounces a function.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The time to wait before calling the function.
 * @returns {Function} The debounced function.
*/
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
