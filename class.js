const fs = require('fs');
const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.booking.com/searchresults.html?aid=304142&label=gen173nr-1FCAQoggJCDHNlYXJjaF9kaWFuaUgzWARodogBAZgBMbgBF8gBDNgBAegBAfgBA4gCAagCA7gC44-noAbAAgHSAiRhNzA0Y2NiOS04YjUxLTQzY2QtYjYwYi1lOTM3NTY5ZDczYzfYAgXgAgE&ss=diani&offset=150',
    {waitUntil: "load"});

    const is_disabled = await page.$('div > div > div.d7a0553560 > div.a826ba81c4.fa71cba65b.fa2f36ad22.afd256fc79.d08f526e0d.ed11e24d01.ef9845d4b3.b727170def > nav > div > div.f32a99c8d1.f78c3700d2.e77e74597d > button') !== null;
    
    console.log(is_disabled)

    await browser.close();
}

run()