const { Builder, until, By } = require("selenium-webdriver");

const obj = {
  0: "this@gmail.com",
  1: "this@123456",
  2: "sdf@gmail.com",
  3: "sldkfjsd@1242434",
};

const loginErrorMessage =
  "The account sign-in was incorrect or your account is disabled temporarily.";

function loginAccount() {
  describe("Account Login Test", async function () {
    it("login", async () => {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get(
          "https://magento.softwaretestingboard.com/customer/account/login"
        );

        // get the input field containing the email and password.
        const emailElement = await driver.findElement(By.id("email"));
        const passwordElement = await driver.findElement(By.id("pass"));

        // then send the data keys to the website input field.
        // use the obj[2] and obj[3] for unsuccessful login because it's not register to the backend
        await emailElement.sendKeys(obj[0]);
        await passwordElement.sendKeys(obj[1]);

        // click the sign in button
        await driver.findElement(By.className("action login primary")).click();

        try {
          const errorElement = await driver.wait(
            until.elementLocated(
              By.xpath(`//*[@id="maincontent"]/div[2]/div[2]/div/div/div`)
            ),
            5000
          );

          const errorMessage = await errorElement.getText();
          console.log(errorMessage);
          if (errorMessage.startsWith(loginErrorMessage)) {
            throw new Error("Login unsuccessful");
          }
        } catch (err) {
          console.log("The error element was not found, login successful ");
        }
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

module.exports = { loginAccount };
