const puppeteer = require("puppeteer");

async function generatePDF(url, outputfile) {
    // Lanuch the browser instance

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);


        await page.pdf({
            path:outputfile,
            format:'A4'
        })




        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://google.com";
const outputfile = "output.file";

generatePDF(url,outputfile);