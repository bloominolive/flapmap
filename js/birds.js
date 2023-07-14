import { loadHeaderFooter, getBirds } from "./utils.mjs"
import { getLocationInfo, zipEntry, getUserLocation, GetZipCodeFromLongLat } from "./location.mjs";

loadHeaderFooter();
zipEntry();

getUserLocation()
  .then(location => {
    return GetZipCodeFromLongLat(location.getLongitude(), location.getLatitude());
  })
  .then(zipCode => {
    if (zipCode) {
      const zipInput = document.getElementById('zipInput');
      zipInput.value = zipCode;
    }
  })
  .catch(error => {
    console.log('Error:', error.message);
  });

var form = document.getElementById("zipcodeForm");
form.addEventListener('submit', getBirdListFromLocation);

export async function getBirdListFromLocation(event) {
  event.preventDefault();
  const zipInput = document.getElementById('zipInput');
  const zipcode = zipInput.value;
  var dateInput = document.getElementById('date');
  var userDate = new Date(dateInput.value);

  var day =  userDate.getDate();
  var month = userDate.getMonth() + 1;
  var year = userDate.getFullYear();

  try {
    const location = await getLocationInfo(zipcode);
    const maxResults = 100;
    const birdsList = await getBirds(location.getStateAb(), day, month, year, maxResults);
    console.log(birdsList);
  if (birdsList) {
      displayBirdList(birdsList);
    } else {
      birdsList = [];
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayBirdList(birds) {
  const birdListContainer = document.getElementById('birdListContainer');
  birdListContainer.innerHTML = ''; // Clear previous content

  birds.forEach(bird => {
    const birdName = document.createElement('h2');
    birdName.textContent = bird.comName;
    const birdSciName = document.createElement('p');
    birdSciName.textContent = "Scientific Name: " + bird.sciName;
    const birdLocation = document.createElement('p');
    birdLocation.textContent = "Location Seen: " + extractLocationName(bird.locName);
    const birdQuantity = document.createElement('p');
    birdQuantity.textContent = "Quantity Seen: " + bird.howMany;
    birdListContainer.appendChild(birdName);
    birdListContainer.appendChild(birdSciName);
    birdListContainer.appendChild(birdLocation);
    birdListContainer.appendChild(birdQuantity);
  });
}

function extractLocationName(locName) {
  // Split the locName by whitespace and remove the last two elements (latitude and longitude)
  const locParts = locName.split(' ').slice(0, -2);
  // Join the remaining parts to form the extracted location name
  const extractedName = locParts.join(' ');
  return extractedName;
}
