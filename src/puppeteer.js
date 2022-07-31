const puppeteer = require('puppeteer');

(async ()=>{

    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width:1920, height:1080})

        await page.goto('https://example.com');
        await page.screenshot({path: 'example.png'});

        await browser.close();

    }catch(e){
        console.log(e);
    }

})();