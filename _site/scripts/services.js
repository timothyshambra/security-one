const searchInput=document.querySelector("#services-search-input"),filterServicesByTag=(e,t)=>e.filter(e=>e.tags.some(e=>e.toLowerCase()===t.toLowerCase())),filterServicesBySearchTerm=(e,t)=>e.filter(e=>e.tags.some(e=>e.toLowerCase().includes(t))),createDetailsList=e=>{let t="";for(const s in e.details)"cost"===s?t+=`<li><strong>${s}: </strong>$${e.details[s]}</li>`:"duration"===s?t+=`<li><strong>${s}: </strong>${e.details[s]} days</li>`:t+=`<li><strong>${s}: </strong>${e.details[s]}</li>`;return t},createTagList=e=>{let t="";return e.tags.forEach(e=>{t+=`<li class="tag">${e}</li>`}),t},populateServices=e=>{const t=document.querySelector(".results");t.innerHTML="",0===e.length?t.innerHTML='<div class="no-results"><h3>No services found</h3></div>':e.forEach(e=>{e=`<a id="service-${e.id}" class="service-card show" href="#">
          <img src="/images/service-image.svg" alt="service image">
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
      </a>`;t.insertAdjacentHTML("beforeend",e)}),document.querySelectorAll(".tag").forEach(e=>{e.addEventListener("click",e=>{e=e.target.textContent.trim();searchInput.value=e,searchInput.dispatchEvent(new Event("input"))})})};document.addEventListener("DOMContentLoaded",()=>{fetch("/data/services.json").then(e=>e.json()).then(e=>{const t=e.results;populateServices(t),searchInput.addEventListener("input",e=>{e=e.target.value.trim().toLowerCase(),e=filterServicesBySearchTerm(t,e);populateServices(e)})}).catch(e=>{console.error(e)})});