const { expect } = require("chai");
const { Builder, By } = require("selenium-webdriver");

// broken image check logic.
async function brokenImageCheck() {
  describe("Test Broken Image or Not", function () {
    // check for the image that is broken.
    // Note: the it block should be independent to one another because we are running the test parallel
    // Also the driver instance is created in both the it block because of the independent block during the parallel run.
    // To run the test parallel enter npm run parallel-test in the terminal.
    it("broken Image", async function () {
      // first create a chrome driver.
      const driver = new Builder().forBrowser("chrome").build();

      await driver.get("https://the-internet.herokuapp.com/broken_images");

      // find the image by it's element, name, id or class.
      const imageElement = await driver.findElement(
        By.xpath(`//*[@id="content"]/div/img[1]`)
      );

      // now after getting the element check for the natural width and height.
      // if the natural width and height is 0 then the image is broken

      const isBroken = await driver.executeScript(
        `return arguments[0].complete && arguments[0].naturalWidth != "undefined" && arguments[0].naturalWidth > 0 `,
        imageElement
      );

      // we aspect the isBroken to be false
      // because that indicate the image is brsken
      expect(isBroken).to.be.false;

      after(async function () {
        await driver.quit();
      });
    });

    // check for the image that is not broken
    it("Not-Broken Image", async function () {
      // first create a chrome driver.
      const driver = new Builder().forBrowser("chrome").build();

      await driver.get("https://the-internet.herokuapp.com/broken_images");

      // find the image by it's element, name, id or class.
      const imageElement = await driver.findElement(
        By.xpath(`//*[@id="content"]/div/img[3]`)
      );

      // now after getting the element check for the natural width and height.
      // if the natural width and height is 0 then the image is broken

      const isBroken = await driver.executeScript(
        `return arguments[0].complete && arguments[0].naturalWidth != "undefined" && arguments[0].naturalWidth > 0 `,
        imageElement
      );

      // we aspect the isBroken to be false
      // because that indicate the image is broken
      expect(isBroken).to.be.true;

      after(async function () {
        await driver.quit();
      });
    });
  });
}

module.exports = { brokenImageCheck };
