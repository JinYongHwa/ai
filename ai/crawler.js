const puppeteer = require('puppeteer');


(async () => {

    let browser = await puppeteer.launch({ headless: false, width: 1920, height: 1080 });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.jemin.com/news/articleView.html?idxno=778145')
    //document.querySelector("section").textContent 안의 내용 추출하기
    let data = await page.evaluate(() => {
        const title = document.querySelector("section").innerHTML;
        return title;
    });

    //script, style 태그 제거
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const regex2 = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;

    data = data.replace(regex, '');
    data = data.replace(regex2, '');

    //태그 안의 내용만 추출
    const regex3 = /<[^>]*>/g;
    data = data.replace(regex3, '');

    //공백, &nbsp; 탭 제거
    const regex4 = /&nbsp;|\t|\n/g;
    data = data.replace(regex4, '');

    console.log(data)
    console.log(data.length)

    await browser.close();
})()