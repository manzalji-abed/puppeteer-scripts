const puppeteer = require("puppeteer");

async function interceptRequest(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        page.on('request',
            (interceptRequest)=>{
                if(interceptRequest.url().endsWith('png')){
                    // do not do anything
                    interceptRequest.abort();
                }
                else{
                    interceptRequest.headers({
                        'secretKey':'abc123'
                    });
                    interceptRequest.continue();
                    console.log("Request Continued with Headers");
                }
            }
        )

        await page.goto(url);

        await browser.close();

        console.log("Request Interception Completed!");
    } catch (error) {
        console.error('Error:', error);
    }

}

const url ="https://yahoo.com";

interceptRequest(url);