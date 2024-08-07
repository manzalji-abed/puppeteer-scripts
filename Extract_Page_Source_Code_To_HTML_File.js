const puppeteer = require("puppeteer");
const fs = require("fs");

async function getSourceCode(url, outputPath) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);


        const sourceCode = await page.content();

        fs.writeFileSync(outputPath, sourceCode, "utf-8");



        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://example.com";
const outputPath = "source-code.html";

getSourceCode(url,outputPath);