var express = require('express');
var router = express.Router();

const OpenAI = require("openai");
const openai = new OpenAI();
const uuid = require('uuid')
const fs = require("fs")
const path = require("path")

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

module.exports = router;
