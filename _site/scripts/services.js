const searchInput=document.querySelector("#services-search-input");function fetchData(t){return fetch(t).then(e=>{if(e.ok)return e.json();throw new Error(`Failed to fetch data from ${t}: ${e.status} `+e.statusText)}).catch(e=>{throw console.error(e),new Error(`Fetching data from ${t} failed. Please check your network connection
        and try again later.`)})}const filterServicesByTag=(e,t)=>e.filter(e=>e.tags.some(e=>e.toLowerCase()===t.toLowerCase())),filterServicesBySearchTerm=(e,t)=>e.filter(e=>e.tags.some(e=>e.toLowerCase().includes(t))),createDetailsList=e=>{let t="";for(const s in e.details)"cost"===s?t+=`<li><strong>${s}: </strong>$${e.details[s]}</li>`:"duration"===s?t+=`<li><strong>${s}: </strong>${e.details[s]} days</li>`:t+=`<li><strong>${s}: </strong>${e.details[s]}</li>`;return t},createTagList=e=>{let t="";return e.tags.forEach(e=>{t+=`<li class="tag">${e}</li>`}),t},populateServices=e=>{const t=document.querySelector(".results");t.innerHTML="",0===e.length?t.innerHTML='<div class="no-results"><h3>No services found</h3></div>':e.forEach(e=>{e=`<a id="service-${e.id}" class="service-card show" href="#">
          <img src="./images/service-image.svg" alt="service image">
        <div class="service-info">
          <span class="category">${e.category}</span>
          <h2 class="title">${e.title}</h2>
          <ul class="meta">
            ${createDetailsList(e)}
          </ul>
        </div>
        <ul class="tags">
          <li><strong>Tags:</strong></li>
          ${createTagList(e)}
        </ul>
      </a>`;t.insertAdjacentHTML("beforeend",e)}),document.querySelectorAll(".tag").forEach(e=>{e.addEventListener("click",e=>{e=e.target.textContent.trim();searchInput.value=e,searchInput.dispatchEvent(new Event("input"))})})};document.addEventListener("DOMContentLoaded",()=>{fetchData("/data/services.json").then(e=>{services=e.results,populateServices(services)}).catch(e=>{console.error(e)}),searchInput.addEventListener("input",e=>{e=e.target.value.trim().toLowerCase(),e=filterServicesBySearchTerm(services,e);populateServices(e)})});