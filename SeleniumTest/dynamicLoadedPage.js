//Note: When the action is triggered the element that was hidden can be shown
// Note if the test case fail for the hidden element Test then increase the sleep time on the line 29.

const { Builder, until, By } = require("selenium-webdriver");

// other case is the element is loaded/rendered dynamically which is not hidden in the dom
function dynamicLoadedPage() {
  describe("Hidden Element/ Dynamic Render Element Test", () => {
    it("hidden Element Test", async () => {
      // here we try to find the element that is hidden and based on the
      // event the element is shown we try to compare the hidden element with the
      // shown element.
      const driver = new Builder().forBrowser("chrome").build();
      try {
        // now the hidden element is gotten
        // unhide the element by navigating through the event.
        await driver.get(
          "https://the-internet.herokuapp.com/dynamic_loading/1"
        );
        // first target the hidden element..
        // the element is hidden and will be shown based on the event that has been occurred.
        const hiddenElement = await driver.wait(
          until.elementLocated(By.xpath(`//*[@id="finish"]/h4`))
        );
        // find the element until it has been found
        await driver.findElement(By.xpath(`//*[@id="start"]/button`)).click();
        // after the element is found click the button
        await driver.sleep(5000);
        // after triggering the event the element is visible so check if it is displayed or not.
        const isHidden = await hiddenElement.isDisplayed();
        if (isHidden) {
          console.log("The Hidden element is displayed");
        } else {
          throw new Error("The hidden element is not displayed");
        }
      } catch (err) {
        throw new Error(err);
      } finally {
        after(async function () {
          await driver.quit();
        });
      }
    });
    // dynamic render test
    it("Dynamic Rendered Test", async () => {
      // we try to check if the dynamic element is rendered after the event that occurred or not.
      const driver = new Builder().forBrowser("chrome").build();
      try {
        await driver.get(
          "https://the-internet.herokuapp.com/dynamic_loading/2"
        );
        // first try to search for the dynamic element..
        let dynamicElementFound = true;
        try {
          // this will give error because this element is rendered dynamically after the element only
          await driver.findElement(By.xpath(`//*[@id="finish"]/h4`));
        } catch (err) {
          dynamicElementFound = false;
        }
        if (!dynamicElementFound) {
          console.log(
            "The element is not rendered try triggering the event to render."
          );
        }
        // now we know the element is not rendered so we will trigger the event
        await driver.findElement(By.xpath(`//*[@id="start"]/button`)).click();
        // now check for the rendered element.
        const renderedELement = await driver.wait(
          until.elementLocated(By.xpath(`//*[@id="finish"]/h4`))
        );
        const renderedText = await renderedELement.getText();
        // print the rendered message.
        console.log(renderedText);
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

module.exports = { dynamicLoadedPage };
