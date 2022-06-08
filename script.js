const fetch = require('node-fetch');


async function getLocationWithAdress() {
    const requestOptions = {
        method: 'GET',
    };

    const responseGeocoding = await fetch("https://api.geoapify.com/v1/geocode/search?text=173%20Rue%20de%20Vaugirard%2C%2075015%20Paris%2C%20France&apiKey=dff8fa5b77e742859065b71e0d6ddc49", requestOptions);
    const jsonGeocoding = await responseGeocoding.json();
    const postCode = jsonGeocoding.query.parsed.postcode
    const lon = jsonGeocoding.features[0].properties.lon;
    const lat = jsonGeocoding.features[0].properties.lat;
    return {
        postCode,
        lon,
        lat,
    };
}

exports.apiEatDeliver = async () => {

    const location = await getLocationWithAdress();
    const responseEatDeliver = await fetch(`https://cw-api.takeaway.com/api/v29/restaurants?postalCode=${location.postCode}&lat=${location.lat}&lng=${location.lon}&limit=1&isAccurate=true`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "x-country-code": "fr",
            "x-language-code": "fr",
        },
        "body": null,
        "method": "GET"
    });
    const json = await responseEatDeliver.json();
    return json.aggregates.cuisines
}



