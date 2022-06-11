const apiKey = "dff8fa5b77e742859065b71e0d6ddc49";
const requestOptions = {
    method: "GET",
};
async function getLocation() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&apiKey=${apiKey}`;
        const responseGeocoding = await fetch(
            reverseGeocodingUrl,
            requestOptions
        );
        const jsonGeocoding = await responseGeocoding.json();
        const { postcode } = jsonGeocoding.features[0].properties;
        await getResto(pos.coords.longitude, pos.coords.latitude, postcode);
    });
}

async function getLocationWithAddress() {
    console.log("hello");
    const address = encodeURIComponent(
        document.querySelector("#address").value
    );
    const responseGeocoding = await fetch(
        `https://api.geoapify.com/v1/geocode/search?apiKey=${apiKey}&text=${address}`,
        requestOptions
    );
    const jsonGeocoding = await responseGeocoding.json();
    const { lon, lat, postcode } = jsonGeocoding.features[0].properties;
    await getResto(lon, lat, postcode);
}

async function getResto(lon, lat, postcode) {
    const responseGeocoding = await fetch(
        `${window.location}/eatDeliver?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&postCode=${encodeURIComponent(postcode)}`,
        requestOptions
    );
    const elment = document.querySelector(".valuesApiDeliver");
    elment.innerHTML = getCards(await responseGeocoding.json());
}

function getCards(data) {
    let cards = "";
    data.forEach((resto) => {
        cards += `<div class="w3-card-4 w3-third w3-margin w3-white">
        <img src="${resto.brandImg}" alt="img" style="width:25%">
        <div class="w3-container">
          <h3>${formatText(resto.restoName)}</h3>
          <a target="_blank" href="https://www.just-eat.fr/menu/${resto.restoName}">
        <button class="w3-btn w3-red">
          Commander
        </button>        
      </a>
        </div>
      </div>`;
    });
    return cards;
}

// function that replace hyphens with a space and capitalize the output
function formatText(str) {
    return capitalizeFirstLetter(str.replace(/-/g, " "));
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
