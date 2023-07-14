import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

// Create the parent slider container
const sliderContainer = document.createElement('div');
sliderContainer.classList.add('slider');

// Create slide elements
const images = [
  'public/images/bird-berries.jpg',
  'public/images/bluebird-branch.jpg',
  'public/images/owl-branch.jpg',
  'public/images/sparrows-branch.jpg'
];

images.forEach(imageSrc => {
  const slide = document.createElement('div');
  slide.classList.add('slide');

  const img = document.createElement('img');
  img.src = imageSrc;
  const altText = imageSrc.split('/').pop().split('.')[0]; // Extract alt text from the image filename
  img.alt = altText;

  slide.appendChild(img);
  sliderContainer.appendChild(slide);
});

// Create previous and next buttons
const prevButton = document.createElement('button');
prevButton.classList.add('btn-slide', 'prev');
prevButton.innerHTML = '<i class="fas fa-3x fa-chevron-circle-left"></i>';

const nextButton = document.createElement('button');
nextButton.classList.add('btn-slide', 'next');
nextButton.innerHTML = '<i class="fas fa-3x fa-chevron-circle-right"></i>';

// Create dots container
const dotsContainer = document.createElement('div');
dotsContainer.classList.add('dots-container');

// Create dot elements
images.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) {
    dot.classList.add('active');
  }
  dot.setAttribute('data-slide', index.toString());
  dotsContainer.appendChild(dot);
});

// Append all elements to the document
const sliderParentElement = document.getElementById('image-slider'); // Parent element to append the slider
sliderParentElement.appendChild(sliderContainer);
sliderParentElement.appendChild(prevButton);
sliderParentElement.appendChild(nextButton);
sliderParentElement.appendChild(dotsContainer);


function Slider() {
  const carouselSlides = document.querySelectorAll('.slide');
  const dotsSlide = document.querySelector('.dots-container');
  const slideCount = carouselSlides.length;
  let currentSlide = 0;
  let previousSlide = 0;
  carouselSlides[currentSlide].style.opacity = '1';
  carouselSlides[currentSlide].style.zIndex = '1';

  const activeSlide = function (slide) {
    document.querySelectorAll('.dot').forEach((dot) =>
      dot.classList.remove('active')
    );
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add('active');
  };

  const changeSlide = function () {
    carouselSlides[previousSlide].style.opacity = '0';
    carouselSlides[previousSlide].style.zIndex = '0';
    carouselSlides[currentSlide].style.opacity = '1';
    carouselSlides[currentSlide].style.zIndex = '1';
  };

  const fadeTransition = function () {
    setTimeout(() => {
      carouselSlides.forEach((slide) => {
        slide.classList.add('fade-transition');
      });
    }, 10);
  };

  const nextSlide = function () {
    previousSlide = currentSlide;
    currentSlide = (currentSlide + 1) % slideCount;
    changeSlide();
    activeSlide(currentSlide);
  };

  const fadeDuration = 500; // Adjust the duration of the fade transition (in milliseconds)

  fadeTransition();

  // Start the slideshow
  const interval = setInterval(nextSlide, 4000);


  dotsSlide.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      const slide = parseInt(e.target.dataset.slide);
      previousSlide = currentSlide;
      currentSlide = slide;
      changeSlide();
      activeSlide(currentSlide);
    }
  });
}

Slider();

function getRandomBirdFact() {
  const apiKey = 'l8rA1gA1atTAa5jqSv5xkw==10Ma4atoVKCepEBx';
  const apiUrl = 'https://api.api-ninjas.com/v1/animals';

  const params = {
    name: 'bird',
    limit: 10 // Retrieve 10 results
  };

  const url = new URL(apiUrl);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result); // Log the API response to the console

      const birdFactsDiv = document.getElementById('bird-facts');

      // Randomly select a fact from the results
      const facts = result;
      if (facts && facts.length > 0) {
        const randomIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[randomIndex];

        // Extract desired properties
        const birdName = randomFact.name || 'N/A';
        const birdColor = randomFact.characteristics.color || 'N/A';
        const birdPrey = randomFact.characteristics.main_prey || 'N/A';
        const birdWingspan = randomFact.characteristics.wingspan || 'N/A';
        const birdTopSpeed = randomFact.characteristics.top_speed || 'N/A';
        const birdLocations = randomFact.locations || [];

        const colors = birdColor.match(/[A-Z][a-z]+/g);

        // Create the <p> elements for each property
        const birdNameHeader = document.createElement('h2');
        birdNameHeader.innerHTML = `Learn More About The <br> <i>${birdName}!</i>`;

        const birdColorElement = document.createElement('p');
        birdColorElement.innerHTML = `<b>Color:</b> ${colors ? colors.join(', ') : 'N/A'}`;

        const birdPreyElement = document.createElement('p');
        birdPreyElement.innerHTML = `<b>Prey:</b> ${birdPrey}`;

        const birdWingspanElement = document.createElement('p');
        birdWingspanElement.innerHTML = `<b>Wingspan:</b> ${birdWingspan}`;

        const birdTopSpeedElement = document.createElement('p');
        birdTopSpeedElement.innerHTML = `<b>Top Speed:</b> ${birdTopSpeed}`;

        const birdLocationsElement = document.createElement('p');
        birdLocationsElement.innerHTML = `<b>Locations:</b> ${birdLocations.join(', ')}`;

        // Append the <p> elements to the bird-facts div
        birdFactsDiv.appendChild(birdNameHeader);
        birdFactsDiv.appendChild(birdColorElement);
        birdFactsDiv.appendChild(birdPreyElement);
        birdFactsDiv.appendChild(birdWingspanElement);
        birdFactsDiv.appendChild(birdTopSpeedElement);
        birdFactsDiv.appendChild(birdLocationsElement);
        
      } else {
        console.error('No bird facts found.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



// Call the function to fetch bird facts and display a random fact
getRandomBirdFact();













