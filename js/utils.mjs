export async function loadHeaderFooter() {
    const headerTemplateFn = loadTemplate("/partials/header.html");
    const footerTemplateFn = loadTemplate("/partials/footer.html");
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
  
  //newsletter
  
  export function initializeNewsletter() {
    var newsletterDiv = document.getElementById("newsletter");
  
    var newslettersignup = document.createElement("p");
    newslettersignup.textContent = "Don't miss out on your FlapNews- sign up for our monthly newsletter!";
    newslettersignup.classList.add("signup-heading");
    var form = document.createElement("form");
    form.id = "newsletterForm";
  
    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "emailInput";
    emailInput.placeholder = "Enter your email address";
    emailInput.required = true;
  
    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Subscribe";
  
    form.appendChild(emailInput);
    form.appendChild(submitButton);
  
    newsletterDiv.appendChild(newslettersignup);
    newsletterDiv.appendChild(form);
  
    // Create the popup message
    var popupDiv = document.getElementById("popup");
  
    var closeButton = document.createElement("button");
    closeButton.textContent = "OK";
    closeButton.classList.add("close-button");
  
    var thanksMessage = document.createElement("p");
    thanksMessage.textContent = "Thanks for subscribing!";
    
    popupDiv.appendChild(thanksMessage);
    popupDiv.appendChild(closeButton);
    
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
  
      popupDiv.style.display = "block";
    });
  
    closeButton.addEventListener("click", function() {
      popupDiv.style.display = "none";
    });
  }