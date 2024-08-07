const puppeteer = require("puppeteer");

async function getSearchResults(url, searchQuery) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);

        // to get element by selector you know by inspect
        await page.focus('textarea[name="q"]');

        // to wait for typing
        await page.keyboard.type(searchQuery);

        // to press enter
        await page.keyboard.press('Enter');

        // to wait unti showing the result successfully
        await page.waitForNavigation({
            waitUntil:'networkidle2'
        });

        await page.screenshot({
            path:'query.png'
        });

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://google.com";
const query = "sunrise";

getSearchResults(url,query);