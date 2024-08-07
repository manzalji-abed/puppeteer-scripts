const puppeteer = require("puppeteer");

async function checkBrokenLinks(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();        

        await page.goto(url);

        const links= await page.$$eval('a',
            anchors=>anchors.map(a=>a.href)
        );

        const brokenLinks=[];

        for (const link of links){
            const respons=await page.goto(link,
                {
                    waitUntil:'networkidle0',
                    timeout:5000
                }
            );
            if(respons.status()>=400)
            {
                brokenLinks.push({
                    link,
                    status:respons.status
                });
            }
        }

        console.log(brokenLinks);

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = "https://google.com";

checkBrokenLinks(url);