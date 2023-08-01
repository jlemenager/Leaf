const express = require('express')
const PORT = 4000
const app = express()
const cors = require('cors')
const puppeteer = require('puppeteer')
const fs = require('fs/promises')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

// let url = `https://learnwebcode.github.io/practice-requests/`
let names;
const FindH1 = async(url) =>{
    // const filepath = path.join(__dirname, `${name}.txt`)
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    console.log('scraper running')

    await page.goto(url)
    // await page.screenshot({path: "website.png"})
    // const title = await page.title()
    // const content = await page.$eval("*", (element) => element.innerText)
    // const strippedContent = content.replace(/\s+/g, " ").trim()
    names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    })

    console.log(names)

    await page.screenshot({ path: `leaf_project/src/images/website.png`})
    // const h1s = await page.$$eval("h1", (headers) => {
    //     return headers.map(x => x.textContent)
    // })
    // for (const h1 of h1s) {
    //     const h1element = await page.goto(h1)
    // }
    await browser.close()
    return names
    // res.json(data)
}

// FindH1(url)
// app.post('/getinfo', async(req,res) =>{
//     let { url }  = req.body
// })

app.post('/getinfo', async(req,res) =>{
    // let { url }  = req.body
    // let { url } = req.body
    console.log('logging body', req.body)
    let response = await FindH1(req.body.url)
    console.log(response)
    res.send(response)
})



app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})