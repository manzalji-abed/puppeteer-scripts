const puppeteer = require("puppeteer");

async function codeCoverage(url) {

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage()
        ]);

        await page.goto(url);

        // ToDO

        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage()
        ]);

        let totalBytes = 0;
        let usedBytes = 0;

        for (const entry of jsCoverage) {
            totalBytes += entry.text.length;
            for (const range of entry.ranges) {
                usedBytes += range.end - range.start - 1;
            }
        }

        console.log(totalBytes);
        console.log(usedBytes);

        totalBytes = 0;
        usedBytes = 0;

        for (const entry of cssCoverage) {
            totalBytes += entry.text.length;
            for (const range of entry.ranges) {
                usedBytes += range.end - range.start - 1;
            }
        }


        console.log(totalBytes);
        console.log(usedBytes);

        await browser.close();

    } catch (error) {
        console.error('Error:', error);
    }

}

const url = "https://example.com";

codeCoverage(url);