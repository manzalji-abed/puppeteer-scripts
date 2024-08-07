const puppeteer = require("puppeteer");
const device0 = puppeteer.KnownDevices["iPhone 13 Pro Max"];
const device1 = puppeteer.KnownDevices["Galaxy Note 3"];
const device2 = puppeteer.KnownDevices["Blackberry PlayBook landscape"];
const device3 = puppeteer.KnownDevices["Galaxy S9+"];
const device4 = puppeteer.KnownDevices["iPad Mini"];

const devices = [device0, device1, device2, device3, device4];

async function multiDevices(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();


        for(var i=0;i<devices.length;i++){
            await page.emulate(devices[i]);
            await page.goto(url);
            await page.screenshot({
                path:'screenshots'+ i +'.png'
            });
        }

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = "https://yahoo.com";

multiDevices(url);