const puppeteer = require("puppeteer");

async function checkElementsPresent(url, elements) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(url);

        const prsenceResults = [];

        for (const element of elements) {
            const foundElements = await page.$$(element);
            prsenceResults[element] = foundElements.length > 0;
        }

        console.log(prsenceResults);

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = "https://example.com";
const elements = [".header", "#main-content", 'footer', 'div'];
checkElementsPresent(url, elements);