const puppeteer = require("puppeteer");

async function captureAndGeneratePDF(url, outputPath) {
    // Lanuch the browser instance

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);


        await page.screenshot({
            path:'google-screenshot9.png',
        });

        await page.pdf({
            pdf:outputPath,
            format:'A4'
        });





        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://google.com";
const outputPath = "episode-9.pdf";

captureAndGeneratePDF(url,outputPath);