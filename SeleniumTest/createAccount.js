const { Builder, By, until } = require("selenium-webdriver");

// object data for creating the user.
const obj = {
  0: "Dumb",
  1: "ler",
  2: "this@gmail.com",
  3: "this@123456",
  4: "this@123456",
  5: "this@123456",
};

const errMessage = "There is already an account with this email address.";

function createAccount() {
  describe("Account Creation Test", async function () {
    it("create an Account", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get(
          "https://magento.softwaretestingboard.com/customer/account/create/"
        );

        // form contains the two field text form targeting those form
        const fieldText = (
          await driver.findElements(By.className("input-text"))
        ).slice(1, 6);

        // two field contains the multiple input fields so targeting the fields
        for (let i = 0; i < fieldText.length; i++) {
          const input = await fieldText[i];
          await input.sendKeys(obj[i]);
        }

        // now click the create account button
        await driver.findElement(By.className("action submit primary")).click();

        // after this we have been redirected to the account
        // page which means the account has been created
        const errorElement = await driver.wait(
          until.elementLocated(
            By.xpath(`//*[@id="maincontent"]/div[2]/div[2]/div/div/div`)
          )
        );

        const errorMessage = await errorElement.getText();
        console.log(errorMessage);
        if (errMessage.startsWith(errMessage)) {
          // you can pass the different object email and password to check if the
          // for account creation
          // try different email and password
          console.log("account creation unsuccessful");
          throw new Error("The data already exists try login please");
        }
        // this is the test case for checking the sign-inTest if the
        // error message is show with the email already we can throw the error
        // that fails the signInTest or further proceed to the login page.
      } catch (err) {
        throw new Error(err);
      } finally {
        after(async () => {
          await driver.quit();
        });
      }
    });
  });
}

module.exports = { createAccount };
