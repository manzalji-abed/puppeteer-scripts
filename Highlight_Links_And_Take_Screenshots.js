const puppeteer = require("puppeteer");

async function highlightLinks(url) {

    try {
        const browser = await puppeteer.launch({ headless: false, slowMo:500 });
        const page = await browser.newPage();        

        await page.goto(url);

        await page.screenshot({
            path:'beforeHighlight.png'
        })

        await page.evaluate(
            ()=>{
                const links=document.querySelectorAll('a');
                links.forEach(link=>{
                    link.style.border='2px solid red';
                    link.style.backgroundColor="yellow"
                });
            }
        );

        await page.screenshot({
            path:'afterHighlight.png'
        })

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = "https://example.com";

highlightLinks(url);