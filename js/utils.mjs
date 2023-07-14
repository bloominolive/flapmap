export async function loadHeaderFooter() {
    const headerTemplateFn = loadTemplate("/public/partials/header.html");
    const footerTemplateFn = loadTemplate("/public/partials/footer.html");
    const headerEl = document.getElementById("main-header");
    const footerEl = document.getElementById("main-footer");
    renderWithTemplate(headerTemplateFn, headerEl);
    renderWithTemplate(footerTemplateFn, footerEl);
  }

export async function renderWithTemplate(
    templateFn,
    parentElement,
    data,
    callback,
    position = "afterbegin",
    clear = true
  ) {
    if (clear) {
      parentElement.innerHTML = "";
    }
    const htmlString = await templateFn(data);
    parentElement.insertAdjacentHTML(position, htmlString);
    if(callback) {
      callback(data);
    }
  }

  function loadTemplate(path) {
    return async function () {
        const res = await fetch(path);
        if (res.ok) {
        const html = await res.text();
        return html;
        }
    };
  } 


  export async function getBirds(stateAb, day, month, year, maxResults) {
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "j3ujg9aifboj");
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(`https://api.ebird.org/v2/data/obs/US-${stateAb}/historic/${year}/${month}/${day}?maxResults=${maxResults}`, requestOptions)
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log('Error fetching bird data:', error);
      return [];
    }
  }