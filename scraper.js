const express = require('express')
const PORT = 4000
const app = express()
const cors = require('cors')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

let url = `https://learnwebcode.github.io/practice-requests/`
let names;
const FindH1 = async(url) =>{
    // const filepath = path.join(__dirname, `${name}.txt`)
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto(url)
    // const title = await page.title()
    // const content = await page.$eval("*", (element) => element.innerText)
    // const strippedContent = content.replace(/\s+/g, " ").trim()
    names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    })



    // const h1s = await page.$$eval("h1", (headers) => {
    //     return headers.map(x => x.textContent)
    // })
    // for (const h1 of h1s) {
    //     const h1element = await page.goto(h1)
    // }
    await browser.close()
}

app.post('/getinfo', async(req,res) =>{
    let { names }  = req.body
})

app.get('/getinfo', async(req,res) =>{
    FindH1(url)
    res.send({names: names, url: url})
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})