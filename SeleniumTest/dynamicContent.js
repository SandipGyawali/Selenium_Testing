const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// this is to store the prevous
// Content and check if the element is dynamically rendered or not
// each time the dynamic element gives the different result than the previous one.

const previousData = {
  content: "",
};

function dynamicContent() {
  describe("Dynamic Content Test", () => {
    it("Dynamic Content Loading in each Refresh", async function () {
      // making the driver headless..
      // setting up the chrome option for the headless mode.
      const chromeOptions = new chrome.Options();
      chromeOptions.addArguments("--headless"); //enable headless mode.
      chromeOptions.addArguments("--disable-gpu"); //disable gpu acceleration.

      const driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

      try {
        await driver.get(
          "https://the-internet.herokuapp.com/dynamic_content?with_content=static"
        );

        // navigate the event that clicks the button to load the dynamic content.
        await driver
          .findElement(By.xpath(`//*[@id="content"]/div/p[2]/a`))
          .click();

        // now check the element whether it has been changed or not.
        const dynamicElement = await driver.wait(
          until.elementLocated(By.xpath(`//*[@id="content"]/div[3]/div[2]`))
        );

        // get the content of the element and store it in the object.
        const dynamicElementData = await dynamicElement.getText();

        // now compare if the previous data is not same as the current data.
        if (dynamicElementData == previousData.content) {
          throw new Error(
            "Dynamic Content loading failed. While page refresh the content was not loaded."
          );
        } else {
          console.log(
            "Dynamic content loaded successfully, with the content not similar than the previous one."
          );
        }

        // update the previous  content with the new one..
        previousData.content = dynamicElementData;
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

module.exports = { dynamicContent };
