const puppeteer = require("puppeteer");

async function navigateBackAndForward() {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();        

        await page.goto("https://yahoo.com");

        await page.goto("https://finance.yahoo.com");

        await page.goBack();

        const title=await page.title();
        console.log(title);

        await page.goForward();

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}


navigateBackAndForward();