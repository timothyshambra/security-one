const searchInput = document.querySelector("#services-search-input");

function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Failed to fetch data from ${url}: ${response.status} ${response.statusText}`
        );
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error(
        `Fetching data from ${url} failed. Please check your network connection
        and try again later.`
      );
    });
}

const filterServicesByTag = (services, tag) => {
  return services.filter((service) => {
    return service.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
  });
};

const filterServicesBySearchTerm = (services, searchTerm) => {
  return services.filter((service) => {
    return service.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
  });
};

const createDetailsList = (service) => {
  let detailsList = "";
  for (const key in service.details) {
    if (key === "cost") {
      detailsList += `<li><strong>${key}: </strong>$${service.details[key]}</li>`;
    } else if (key === "duration") {
      detailsList += `<li><strong>${key}: </strong>${service.details[key]} days</li>`;
    } else {
      detailsList += `<li><strong>${key}: </strong>${service.details[key]}</li>`;
    }
  }

  return detailsList;
};

const createTagList = (service) => {
  let tagList = "";
  service.tags.forEach((tag) => {
    tagList += `<li class="tag">${tag}</li>`;
  });
  return tagList;
};

const populateServices = (services) => {
  const results = document.querySelector(".results");

  results.innerHTML = "";

  if (services.length === 0) {
    const noResultsMessage =
      '<div class="no-results"><h3>No services found</h3></div>';
    results.innerHTML = noResultsMessage;
  } else {
    services.forEach((service) => {
      const serviceCard = `<a id="service-${
        service.id
      }" class="service-card show" href="#">
          <img src="./images/service-image.svg" alt="service image">
        <div class="service-info">
          <span class="category">${service.category}</span>
          <h2 class="title">${service.title}</h2>
          <ul class="meta">
            ${createDetailsList(service)}
          </ul>
        </div>
        <ul class="tags">
          <li><strong>Tags:</strong></li>
          ${createTagList(service)}
        </ul>
      </a>`;
      results.insertAdjacentHTML("beforeend", serviceCard);
    });
  }

  const tagLists = document.querySelectorAll(".tag");

  tagLists.forEach((tagList) => {
    tagList.addEventListener("click", (event) => {
      const tag = event.target.textContent.trim();
      searchInput.value = tag;
      searchInput.dispatchEvent(new Event("input"));
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const url = "/data/services.json";

  fetchData(url)
    .then((data) => {
      services = data.results;
      populateServices(services);
    })
    .catch((error) => {
      console.error(error);
    });

  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    const filteredServices = filterServicesBySearchTerm(services, searchTerm);
    populateServices(filteredServices);
  });
});
