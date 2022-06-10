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

exports.apiEatDeliver = async (lat,lon,postCode) => {

    const location = await getLocationWithAdress();
    const responseEatDeliver = await fetch(`https://cw-api.takeaway.com/api/v29/restaurants?postalCode=${postCode}&lat=${lat}&lng=${lon}&limit=1&isAccurate=true`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "x-country-code": "fr",
            "x-language-code": "fr",
        },
        "body": null,
        "method": "GET"
    });
    const json = await responseEatDeliver.json();
    // console.log(json);
    regex = /[a-zA-Z.]+/g;
    formatted_cuisine_types = []
    cuisine_types = Object.keys(json.aggregates.cuisines);
    cuisine_types.map(cuisine => {
        cuisine = regex.exec(cuisine)
        if (cuisine != null) {
            formatted_cuisine_types.push(cuisine[0])
        } else {
            cuisine = "repas"
            formatted_cuisine_types.push(cuisine)
        }
    })
    let restoIds = [];
    for (let value in json.aggregates.cuisines) {
        if (value.includes("japanese")) {
            restoIds = json.aggregates.cuisines[value];
        }
    }
    let restosList = [];
    for (let i = 0; i <= 10; i++) {
        // console.log(json.restaurants[resto].primarySlug);
        restosList.push(json.restaurants[restoIds[i]].primarySlug);
    }

    let restoObjectList = [];
    let arrayTest = [];
    for (let restoSlug of restosList) {
        let restoObject = {};
        const responseRestos = await fetch(`https://cw-api.takeaway.com/api/v29/restaurant?slug=${restoSlug}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "x-country-code": "fr",
                "x-language-code": "fr",
            },
            "body": null,
            "method": "GET"
        });
        const jsonRestos = await responseRestos.json();
        restoObject.brandImg = jsonRestos.brand.logoUrl;
        restoObject.restoName = restoSlug;
        restoObject.products = Object.entries(jsonRestos.menu.products).slice(0,3)
        restoObjectList.push(restoObject);
    }


    return restoObjectList;

}

