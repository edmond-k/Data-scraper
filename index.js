const fs = require('fs');
const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.booking.com/searchresults.html?ss=diani');
    // await page.waitForNavigation(),
    // await page.setDefaultNavigationTimeout(10000);

    // await page.screenshot({path: 'example.png', fullPage: true });



    // const title = await page.evaluate(() => document.title);
    // console.log(title)

    // Get courses using $$eval
    // const courses = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
    //         title: e.querySelector('.card-body h3').innerText,
    //         level: e.querySelector('.card-body .level').innerText,
    //         url: e.querySelector('.card-footer a').href,
    //     }))
    // );

    // const courses = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll('.d4924c9e74 .a826ba81c4 .fe821aea6c .fa2f36ad22 .afd256fc79 .d08f526e0d .ed11e24d01 .ef9845d4b3 .da89aeb942'), (e) => ({
    //         title: e.querySelector('> div > h3 > a > div.fcab3ed991.a23c043802').innerText,
    //         // level: e.querySelector('.card-body .level').innerText,
    //         // url: e.querySelector('.card-footer a').href,
    //     }))
    // );

    
    let listings = [];

    let isBtnDisabled = false;
    while (!isBtnDisabled) {

        const listingHandles = await page.$$('.d4924c9e74 > .a826ba81c4')


        for (const listinghandle of listingHandles) {




            try {
                const title = await page.evaluate(el => el.querySelector("div > h3 > a > div.fcab3ed991.a23c043802").textContent, listinghandle)

                const distanceFromCenter = await page.evaluate(el => el.querySelector("div.a1fbd102d9 > span > span > span").textContent, listinghandle)

                const beachFront = await page.evaluate(el => el.querySelector("span > span > span.a196e30dac").textContent, listinghandle)

                const sustainability = await page.evaluate(el => el.querySelector("div.d20f4628d0 > div.b978843432 > div > div > div > div.b1e6dd8416.aacd9d0b0a > div > div.d8eab2cf7f.f0d4d6a2f5.ff07fc41e3 > span.a51f4b5adb").textContent, listinghandle)

                const description = await page.evaluate(el => el.querySelector("div.d20f4628d0 > div.b978843432 > div > div > div > div.b1e6dd8416.aacd9d0b0a > div > div:nth-child(4)").textContent, listinghandle)

                listings.push({ title, distanceFromCenter, beachFront, sustainability, description })

            } catch (error) {}


        }
        await page.waitForSelector('div > div > div.d7a0553560 > div.a826ba81c4.fa71cba65b.fa2f36ad22.afd256fc79.d08f526e0d.ed11e24d01.ef9845d4b3.b727170def > nav > div > div.f32a99c8d1.f78c3700d2 > button', { visible: true });

        const is_disabled = (await page.$('div > div > div.d7a0553560 > div.a826ba81c4.fa71cba65b.fa2f36ad22.afd256fc79.d08f526e0d.ed11e24d01.ef9845d4b3.b727170def > nav > div > div.f32a99c8d1.f78c3700d2.e77e74597d > button')) !== null;
        isBtnDisabled = is_disabled
        if (!is_disabled) {
            await page.click('div > div > div.d7a0553560 > div.a826ba81c4.fa71cba65b.fa2f36ad22.afd256fc79.d08f526e0d.ed11e24d01.ef9845d4b3.b727170def > nav > div > div.f32a99c8d1.f78c3700d2 > button')
            await page.waitForNavigation()
        }
        
    }
    console.log(listings);
}



// // save data to Json file
// fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
//     if (err) throw err;
//     console.log('File Saved')
// })

// await browser.close();




run()