// initial test case trial

const { Builder, By } = require("selenium-webdriver");

// chai is the assertion library for selenium.
const chai = require("chai");

async function Login_Test() {
  // launch the driver.
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:5173");

    // maximizes the window screen..
    await driver.manage().window().maximize();

    // loads the website and navigates to the login page..
    await driver.findElement(By.className("login")).click();

    // targets the email input section and add it to the input field.
    await driver.findElement(By.name("e")).sendKeys("asd@gmail.com");

    // targets the password input section and add it to the input field.
    await driver.findElement(By.name("p")).sendKeys("12345678");

    // clicks the login button..
    await driver.findElement(By.className("sc-jRQCJB ejOKsO")).click();

    // first find the error message tag...
    const errorMessageElement = await driver.findElement(By.name("err_txt"));

    // wait till the error element shows up.

    // await driver.wait(until.elementIsVisible(errorMessageElement), 3000);

    // checking if the error message is visible.
    if (await errorMessageElement.isDisplayed()) {
      // we can use the call back method after the promise has beenx
      //  resolved to work with the text further by using then method.
      const errTxt = await errorMessageElement.getText();

      // assert implementation using chai should api for chai library.
      // also testing whether the given error message is same as we desired or not.
      // here is the given error message is same as we expect then it will not show any message simply
      // goes to the next line.
      chai
        .should()
        .equal(
          errTxt,
          "Password invalid. Enter correct Password",
          "the expected error message is not same"
        );
    } else {
      // login successful navigates to the home page.
      console.log("Login Successful");
    }
  } finally {
    // runs the block after any error or successful test pass.
    await driver.quit();
  }
}

// the method above is the auto invoking function which doesn't need any caller..
module.exports = { Login_Test };
