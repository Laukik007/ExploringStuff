const puppeteer = require("puppeteer");
const formLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_HwDrQBivEirlRIgrteLsqpFpE_B-ldb8JTEdMOhxx48xmA/viewform";

fill(formLink, true);

async function fill(formLink, submitForm) {
  let dropdownAnswer = "Choice 1";

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      //headless option runs the browser in the command line
      //use false option to launch browser with graphic interface
      args: ["--no-sandbox"],
      slowMo: 30,
    });

    const page = await browser.newPage();
    console.log("Opening form");

    // Opening Form
    await page.goto(formLink, { waitUntil: "networkidle2" });
    const title = await page.$eval("title", (el) => el.textContent);
    console.log("form opened");
    console.log("Form Title: " + title);

    // To answer questions, first identify selectors of all similar questions type
    // then use the selector index to select the question
    // then perform an action to answer the question,
    // e.g. click or type an answer

    // Short Answer questions
    const selectors = await page.$$(".whsOnd.zHQkBf");
    //console.log(selectors);
    await selectors[0].click();
    await page.keyboard.type("Answer to first short answer question");
    console.log("inserting answer to first short answer question");
    await selectors[1].click();
    await page.keyboard.type("Answer to second short answer question");
    console.log("inserting answer to second short answer question");

    //MCQ and Checkbox Questions
    const selectors2 = await page.$$(".docssharedWizToggleLabeledContainer");
    console.log("identifying selectors of all mcq and checkbox questions ");
    await selectors2[1].click();
    console.log("Answered first MCQ question");
    await selectors2[3].click();
    console.log("Answered second mcq question");
    await selectors2[5].click();
    console.log("ticked 1st checkbox");
    await selectors2[6].click();
    console.log("ticked 2nd checkbox");
    await selectors2[7].click();
    console.log("ticked 3rd checkbox");
    await selectors2[8].click();
    console.log("ticked 4th checkbox");
    await page.click(".MocG8c.HZ3kWc.mhLiyf.LMgvRb.KKjvXb.DEh1R");

    // Dropdown menu questions
    await page.waitForTimeout(400);
    await page.click(".MocG8c.HZ3kWc.mhLiyf.LMgvRb");
    //console.log(selector3[1]);
    // await selector3[1].click();
    console.log("answered dropdown question");

    // Form Submission
    if (submitForm) {
      await page.waitForTimeout(500);
      await page.click(".NPEfkd.RveJvd.snByac");
      await page.waitForNavigation();
      const submissionPage = await page.url();
      console.log(submissionPage);
      if (submissionPage.includes("formResponse")) {
        console.log("Form Submitted Successfully");
      }
    }

    await page.close();
    await browser.close();
  } catch (error) {
    console.error(error.message);
  }
}
