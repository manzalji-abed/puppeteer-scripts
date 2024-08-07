const puppeteer = require("puppeteer");

async function generateScreenshot(url, outputPath) {
    // Lanuch the browser instance

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);


        await page.screenshot({
            path:outputPath,
        })




        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://google.com";
const outputPath = "google-screenshot.png";

generateScreenshot(url,outputPath);