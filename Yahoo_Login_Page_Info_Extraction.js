const puppeteer= require("puppeteer");

async function run(){
    // Lanuch the browser instance

    try{
        const browser =  await puppeteer.launch({headless:false});
        const page= await browser.newPage();
        await page.goto("https://login.yahoo.com/?.lang=en-CA&.intl=ca&src=homepage&.done=https%3A%2F%2Fca.yahoo.com%2F%3Fp%3Dus&pspid=2142623533&activity=ybar-signin");
        const title=await page.title();
        console.log(title);
    
        // extract h1 element contents
    
        const heading = await page.$$eval('h1', (element)=> element.textContent);
        console.log(heading);
    
        await page.screenshot({path : 'episode3.png'});
    
        await page.pdf({path : 'example.pdf', format: 'A4',printBackground: true});
        console.log('PDF generated successfully.');
    
        await browser.close();
    }catch (error) {
        console.error('Error:', error);
    }
    
}

 run();