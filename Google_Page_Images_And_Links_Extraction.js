const puppeteer = require("puppeteer");

async function run() {
    // Lanuch the browser instance

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://google.com");

        const images = await page.$$eval('img', (elements) =>
            elements.map((element) => ({
                src: element.src,
                alt: element.alt,
            }))

        );

        
        console.log(images);
        const links = await page.$$eval('a', (elements) =>
            elements.map((element) => ({
                href: element.href,
                text: element.text
            }))

        );
        console.log(links);

        const imagesCount = images.length;
        const linksCount = links.length;


        const output = JSON.stringify({ images, links, imagesCount, linksCount });
        console.log(output);
        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }

}

run();