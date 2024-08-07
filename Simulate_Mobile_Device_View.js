const puppeteer = require("puppeteer");

async function simulateMobileDevice(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (iPhone; CPY iPhone OS 11_0 like Mac OS X 10 ');

        await page.setViewport({
            width:375,
            height:812
        });

        await page.goto(url);

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://yahoo.com";

simulateMobileDevice(url);