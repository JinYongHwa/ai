var express = require('express');
var router = express.Router();

const OpenAI = require("openai");
const openai = new OpenAI();
const uuid = require('uuid')
const fs = require("fs")
const path = require("path")
const puppeteer = require('puppeteer');
let axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/image/:id", async (req, res) => {
  let id = req.params.id
  let fileStaticPath = path.join(__dirname, `../static/${id}`)

  let read = fs.readFileSync(fileStaticPath)
  // res.send(read)
  fs.createReadStream(fileStaticPath).pipe(res)
})


router.post("/image/generate", async (req, res) => {
  console.log(req.body)

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.body.prompt,
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data[0].url;
  console.log(image_url)
  const imageId = uuid.v4()


  //image url 을 받아서 static file로 저장
  let fileStaticPath = path.join(__dirname, `../static/${imageId}`)
  let imageResponse = await axios.get(image_url, {
    responseType: 'stream'
  })
  imageResponse.data.pipe(fs.createWriteStream(fileStaticPath))
  imageResponse.data.on('end', () => {
    res.json({
      result: "success",
      imageUrl: `/api/image/${imageId}`
    })
  })
})
router.post("/url/summary", async (req, res) => {

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
  await browser.close();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", content: `뉴스기사를 요약해주는 서비스
          html 중의 뉴스기사를 요약하는거라 일부 불필요한 내용도 들어감(예: 다음,기사보기등) 해당내용무시하고 뉴스기사만 요약한다
          뉴스기사는 세줄로 요약하며 마크타운 문법으로 작성한다
          ` },
      {
        role: "user",
        content: data,
      },
    ],
  });
  let summary = completion.choices[0].message.content
  console.log(completion.choices[0].message);

  res.json({
    result: "success",
    summary: summary
  })
})

module.exports = router;
