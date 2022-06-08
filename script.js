const fetch = require('node-fetch');

async function ApiEatDeliver(){
    const response = await fetch("https://cw-api.takeaway.com/api/v29/restaurants?deliveryAreaId=20756953&postalCode=75015&lat=48.8393843&lng=2.3023659&limit=5&isAccurate=true", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "x-country-code": "fr",
            "x-language-code": "fr",
        },
        "body": null,
        "method": "GET"
    });
    const json = await response.json();
    console.log(json);
}

test();

