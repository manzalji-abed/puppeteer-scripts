const puppeteer = require("puppeteer");

async function fakeGeoLocation(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        const latitude = 40.8136;
        const longitude = -96.7026;

        await page.browserContext().overridePermissions(url,['geolocation']);

        // Set the geolocation
        await page.setGeolocation({ latitude, longitude });

        await page.goto(url);

        // Example: Clicking a button with id 'myButton'
        await page.click('body > div.container > div.row.mb-2 > div > ul > li:nth-child(1) > span > a');

        // Wait for navigation to complete (optional)
        await page.waitForNavigation();

        await page.screenshot({
            path:'screesnshotforlocation.png'
        });

        // Example: Get the current URL after setting geolocation
        const currentUrl = await page.url();
        console.log(`Current URL: ${currentUrl}`);

        // Example: Get the content of the page to verify location-based content
        const pageTitle = await page.title();
        console.log(`Page title: ${pageTitle}`);

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

const url="https://whatmylocation.com/";
fakeGeoLocation(url);