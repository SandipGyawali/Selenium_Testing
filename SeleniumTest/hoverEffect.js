const { Builder, By, until } = require("selenium-webdriver");

function hoverEffect() {
  describe("Hover Effect Test", () => {
    it("element Visible During Hover", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get("https://the-internet.herokuapp.com/hovers");

        const elementToHover = await driver.findElement(
          By.xpath(`//*[@id="content"]/div/div[2]/img`)
        );

        // perform the hover action.
        await driver.actions().move({ origin: elementToHover }).perform();

        // find if the element is visible or not.
        const elementToShow = await driver.wait(
          until.elementIsVisible(
            driver.findElement(By.xpath(`//*[@id="content"]/div/div[2]/div`))
          )
        );

        const isElementVisible = await elementToShow.isDisplayed();

        // adding the message for the visible element.
        if (isElementVisible) {
          console.log("The element is visible");
        } else {
          console.log("The element is not visible");
        }
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

module.exports = { hoverEffect };
