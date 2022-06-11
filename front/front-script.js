

/*********************** CONSTANT *************************/

const API_KEY = "dff8fa5b77e742859065b71e0d6ddc49";
const REQUEST_OPTIONS = {
    method: "GET",
};


/*********************** FUNCTION & WORKFLOW *************************/

/**
 * Get location from the geolocation API
 * @returns {Promise<void>}
 */
async function getLocation() {

    //  Ask for location
    navigator.geolocation.getCurrentPosition(async (pos) => {

        // If the user accept the gelocation request, make a request to the location API to retrieve current location data
        // This allow us to have the postCode and be more precise when retrieving the restaurants
        const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&apiKey=${API_KEY}`;
        const responseGeocoding = await fetch(
            reverseGeocodingUrl,
            REQUEST_OPTIONS
        );
        const jsonGeocoding = await responseGeocoding.json();

        // Get the postcode from the location data
        const { postcode } = jsonGeocoding.features[0].properties;

        // Get the resto
        await getResto(pos.coords.longitude, pos.coords.latitude, postcode);
    });
}

/**
 * Get location from the address in the textarea
 * @returns {Promise<void>}
 */
async function getLocationWithAddress() {

    // Retrieve the string address from the textarea
    const address = encodeURIComponent(
        document.querySelector("#address").value
    );

    // Fetching the geoapify api to retrieve the location data
    const responseGeocoding = await fetch(
        `https://api.geoapify.com/v1/geocode/search?apiKey=${API_KEY}&text=${address}`,
        REQUEST_OPTIONS
    );
    const jsonGeocoding = await responseGeocoding.json();

    // Extract the longitude, latitude and the postcode from the location data
    const { lon, lat, postcode } = jsonGeocoding.features[0].properties;
    // Get the resto
    await getResto(lon, lat, postcode);
}

/**
 * Get the resto from the given location
 * @param lon
 * @param lat
 * @param postcode
 * @returns {Promise<void>}
 */
async function getResto(lon, lat, postcode) {
    // Fetching the api to retrieve the resto data
    const responseGeocoding = await fetch(
        `${window.location}/eatDeliver?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&postCode=${encodeURIComponent(postcode)}`,
        REQUEST_OPTIONS
    );

    // Getting ans setting the zone where the restaurant will be displayed
    const element = document.querySelector(".valuesApiDeliver");
    element.innerHTML = getCards(await responseGeocoding.json());
}

/**
 * HTML template for the cards
 * @param data
 * @returns {string}
 */
function getCards(data) {
    let cards = "";
    data.forEach((resto) => {
        cards += `<div class="w3-card-2 w3-center w3-animate-top w3-third w3-round-large w3-padding-16  w3-margin w3-white">
       
        <img src="${resto.brandImg}" alt="img" style="width:25%" class="w3-round" >
        
        <div class="w3-container">
          <h3>${formatText(resto.restoName)}</h3>
          <a target="_blank" href="https://www.just-eat.fr/menu/${resto.restoName}">
            <div class="w3-container w3-center">
                <button class="w3-btn w3-red w3-round-large">Commander </button>      
            </div>
        </a>
        </div>
      </div>`;
    });
    return cards;
}

// replace hyphens with a space and capitalize the output
function formatText(str) {
    return capitalizeFirstLetter(str.replace(/-/g, " "));
}

// capitalize the first letter of the string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
