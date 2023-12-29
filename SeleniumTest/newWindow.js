const { Builder, By, until } = require("selenium-webdriver");

async function newWindow() {
  describe("New Window Test", function () {
    it("new window/ tab", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        // to check if the window has been added when clicking
        // we use getWindowHandle method
        await driver.get("https://the-internet.herokuapp.com/windows");

        // get the current main window
        const mainWindowHandle = await driver.getWindowHandle();

        // now click the button or link to create a new window
        // targeting the button
        await driver.findElement(By.xpath(`//*[@id="content"]/div/a`)).click();

        // after click the new window will be pop up check if we got the new window if yes
        // test pass else fail
        // wait for the new window to be loaded.
        await driver.sleep(2000);

        // get all the window handles..
        const allWindowHandles = await driver.getAllWindowHandles();

        // now check if we got the window beside main if yes the new window was created.
        const newWindowHandle = allWindowHandles.find(
          (window) => window != mainWindowHandle
        );
        console.log(newWindowHandle);

        // check for the window handle..
        if (newWindowHandle) {
          console.log("New window is created or tab is opened");
        } else {
          console.log("Now new window or tab is opened");
        }

        driver.sleep(5000);
      } catch (err) {
        throw new Error(err);
      } finally {
        after(async function () {
          await driver.quit();
        });
      }
    });
  });
}

module.exports = { newWindow };
