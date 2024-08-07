const puppeteer = require("puppeteer");
const axios = require("axios");
const { parseStringPromise } = require('xml2js');
const fs = require('fs');
async function extractDataFromSitemap(sitemapUrl) {

    try {

        const respone=await axios.get(sitemapUrl);
        const sitemap=respone.data;
        const parsedXml = await parseStringPromise(sitemap, { explicitArray: false });

        const sitemaps = parsedXml.sitemapindex.sitemap;


        // Extracting URLs from parsed XML
        const urls = sitemaps.map(sitemap => sitemap.loc);
        
        const browser = await puppeteer.launch();

        const scrabingPromises = urls.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url);

            const data = await page.evaluate(
                () => {
                    const titleElement = document.title;

                    // Check if elements are found before accessing textContent
                    const title = titleElement ? titleElement.textContent : 'No title found';

                    return { title };
                }
            );

            await page.close();

            return data;
        })

        const scrabedDataArray = await Promise.all(scrabingPromises);


        fs.writeFileSync('sitemapData.json', JSON.stringify(scrabedDataArray));
        console.log("file is written correctly");

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = ["https://google.com/sitemap.xml"];
extractDataFromSitemap(url);