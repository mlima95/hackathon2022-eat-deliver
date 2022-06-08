const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.just-eat.fr/');
    console.log(await page.$("body"));
    // const bodyHandle = await page.$('body');
    // // const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    // const [response] = await Promise.all([
    //     page.waitForNavigation(), // The promise resolves after navigation has finished
    //     page.evaluate((body) => body.innerHTML, bodyHandle), // Clicking the link will indirectly cause a navigation
    // ]);
    // console.log(response);
    // const bodyHandle = await page.$('body');
    // const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    // // console.log(html);
    // // await bodyHandle.dispose();
    // await browser.close();
})();
