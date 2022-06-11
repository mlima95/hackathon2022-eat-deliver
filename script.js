const fetch = require('node-fetch');


/**
 * With location, return a formatted list of restaurants
 * @param lat
 * @param lon
 * @param postCode
 * @returns {Promise<void>}
 */
exports.apiEatDeliver = async (lat, lon, postCode) => {
    // Get the json data from the Just eat
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

    // format the json to return to the front with the data
    return formatJustEatResponse(json);
};


/**
 * Format the json to return to the front with the data
 * @param json
 * @returns {Promise<*[]>}
 */
async function formatJustEatResponse(json) {

    // Get all restaurant
    let restoIds = [];
    for (const value in json.aggregates.cuisines) {
        restoIds = [...restoIds, ...json.aggregates.cuisines[value]];
    }
    let restosList = [];
    for (let i = 0; i <= 10; i++) {
        const resto =json.restaurants[restoIds[i]];
        if(resto){
            restosList.push(resto.primarySlug);
        }
    }
    // Getting the restaurant data from just eat api
    let restoObjectList = [];
    for (let restoSlug of restosList) {
        restoObjectList.push(await getRestaurantData(restoSlug));
    }
    return restoObjectList;
}

/**
 * Fetching just eat api to get the restaurant data
 * @returns {Promise<{brandImg: *, restoName: *, products: [string, unknown][]}>}
 */
async function getRestaurantData(restoSlug){
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
    return {
        brandImg: jsonRestos.brand.logoUrl || "https://upload.wikimedia.org/wikipedia/commons/0/07/Just_eat_%28allo_resto%29_logo.png",
        restoName: restoSlug,
        products: Object.entries(jsonRestos.menu.products).slice(0, 3)
    };
}
