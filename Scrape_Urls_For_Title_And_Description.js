const puppeteer = require("puppeteer");
const fs = require('fs');
async function scrabeUrls(urls) {

    try {
        const browser = await puppeteer.launch();

        const scrabingPromises = urls.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url);

            const data = await page.evaluate(
                () => {
                    const titleElement = document.querySelector('h1');
                    const descriptionElement = document.querySelector('p');

                    // Check if elements are found before accessing textContent
                    const title = titleElement ? titleElement.textContent.trim() : 'No title found';
                    const description = descriptionElement ? descriptionElement.textContent.trim() : 'No description found';


                    return { title, description };
                }
            );

            await page.close();

            console.log(`${url}    ${JSON.stringify(data)}`); // Use JSON.stringify to log object as string
            return data;
        })

        const scrabedDataArray = await Promise.all(scrabingPromises);


        fs.writeFileSync('scrabedData.json', JSON.stringify(scrabedDataArray));
        console.log("file is written correctly");

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const urls = ["https://hotmail.com", "https://google.com"]
scrabeUrls(urls);