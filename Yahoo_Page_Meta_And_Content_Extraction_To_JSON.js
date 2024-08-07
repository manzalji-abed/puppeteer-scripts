const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
    // Lanuch the browser instance

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://yahoo.com");


        const title = await page.title();
        const metaDescription = await page.$eval('meta[name=description]',
            (element) => element.textContent
        );
        const metaKeywords = await page.$eval('meta[name=keywords]',
            (element) => element.textContent
        );




        const images = await page.$$eval('img', (elements) =>
            elements.map((element) => ({
                src: element.src,
                alt: element.alt,
            }))

        );


        const links = await page.$$eval('a', (elements) =>
            elements.map((element) => ({
                href: element.href,
                text: element.text
            }))

        );

        const imagesCount = images.length;
        const linksCount = links.length;


        const output = JSON.stringify({ title, metaDescription, metaKeywords, images, links, imagesCount, linksCount });

        fs.writeFileSync("output.json", output);

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

run();