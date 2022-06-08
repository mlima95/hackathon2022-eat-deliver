const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://deliveroo.fr/');
    // const text = await page.$('#location-search');
    await page.type('#location-search','274 Rue de Vaugirard, 75015 Paris, France', {delay: 100});
    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click('.ccl-d0484b0360a2b432.ccl-233931c277401e86.ccl-ed9aadeaa18a9f19.ccl-a97a150ddadaa172'),
    ]);
    console.log(response);
    await browser.close();
})();
