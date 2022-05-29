const puppeteer = require("puppeteer");
const fs = require("fs");
const url =
  "https://www.amazon.in/Jujutsu-Kaisen-0-Gege-Akutami/dp/1974720144/ref=sr_1_5?crid=2JQWRNCVTU23P&keywords=manga&qid=1653731703&sprefix=manga%2Caps%2C319&sr=8-5";

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.goto(url);

  try {
    const info = await page.evaluate(() => {
      //Get title of product
      let title = document.body.querySelector("#productTitle").innerText;

      //get Total number of reviews of the product
      let reviewCount = document.body.querySelector(
        "#acrCustomerReviewText"
      ).innerText;
      let formattedReviewCount = reviewCount.replace(/[^0-9]/g, "").trim();

      //get rating of the product
      let rating = document.body.querySelector(".a-star-5").innerText;

      //availability of the product
      let availability =
        document.body.querySelector(".a-color-success").innerText;

      //Get price of the product
      let price = document.body.querySelector(".a-color-price").innerText;

      //Get description of the product
      let description = document.body.querySelector(
        ".a-expander-partial-collapse-content"
      ).innerText;

      let pinfo = {
        title: title,
        reviewCount: reviewCount,
        rating: rating,
        availability: availability,
        price: price,
        description: description,
      };

      return pinfo;
    });

    console.log(info);
    fs.writeFile("scrapedData", JSON.stringify(info), "utf8", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  } catch (err) {
    console.log(err);
  }

  await browser.close();
})();
