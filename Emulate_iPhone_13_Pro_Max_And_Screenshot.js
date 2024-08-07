const puppeteer = require("puppeteer");
const device=puppeteer.KnownDevices["iPhone 13 Pro Max"];

async function mobileDevices(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.emulate(device);

        await page.goto(url);

        await page.screenshot({
            path:'iphone 13 pro max.png'
        });

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://yahoo.com";

mobileDevices(url);