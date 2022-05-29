const pupeteer = require("puppeteer");
const codeObj = require("./Codes");
const url = "https://www.hackerrank.com/auth/login";
require("dotenv").config();

const email = process.env.email;
const password = process.env.password;
let browser = pupeteer.launch({
  headless: false,
  args: ["--start-maximize"],

  defaultViewport: null,
});

let page;
browser
  .then(function (browserObj) {
    let browserPromise = browserObj.newPage();
    return browserPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerRankOpen = newTab.goto(url);
    return hackerRankOpen;
  })
  .then(function () {
    let emailEnter = page.type("input[id='input-1']", email, { delay: 50 });
    return emailEnter;
  })
  .then(function () {
    let passwordEnter = page.type("input[type='password']", password, {
      delay: 50,
    });
    return passwordEnter;
  })
  .then(function () {
    let loginClick = page.click('button[data-analytics="LoginPassword"]', {
      delay: 50,
    });
    return loginClick;
  })
  .then(function () {
    let clickAlgo = wait_Click('.topic-card a[data-attr1="algorithms"]', page);
    return clickAlgo;
  })
  .then(function () {
    let goTowarmup = wait_Click('input[value="warmup"]', page);
    return goTowarmup;
  })
  .then(function () {
    let waitfor3 = page.waitFor(3000);
    return waitfor3;
  })
  .then(function () {
    let allchallenge = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return allchallenge;
  })
  .then(function (questionArr) {
    console.log("number of question", questionArr.length);
    let questionWillSolve = questionSolver(
      page,
      questionArr[0],
      codeObj.answers[0]
    );
    return questionWillSolve;
  });

function wait_Click(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModal = cPage.click(selector);
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let qWillBeCLickedPromise = question.click();
    qWillBeCLickedPromise
      //click
      // code type
      // ctrl A+ ctrl x
      // click on editor
      // ctrl A+ctrl v
      //  reached to editor
      .then(function () {
        // focus
        let waitFOrEditorToBeInFocus = wait_Click(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitFOrEditorToBeInFocus;
      })
      .then(function () {
        return wait_Click(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector("textarea.custominput", { visible: true });
      })
      .then(function () {
        return page.type("textarea.custominput", answer, { delay: 10 });
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("A", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        return page.keyboard.press("X", { delay: 100 });
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        // focus
        let waitFOrEditorToBeInFocus = wait_Click(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitFOrEditorToBeInFocus;
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("A", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        let AIsPressedP = page.keyboard.press("V", { delay: 100 });
        return AIsPressedP;
      })
      .then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 50 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject(err);
      });
  });
}
