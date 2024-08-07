const puppeteer = require("puppeteer");

async function disableJavaScript(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setJavaScriptEnabled(false);
        

        await page.goto(url);

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = "https://example.com";

disableJavaScript(url);