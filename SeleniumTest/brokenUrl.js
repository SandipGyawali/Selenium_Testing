const { Builder, By } = require("selenium-webdriver");
const axios = require("axios");

function brokenUrl() {
  describe("broken Url Test", function () {
    it("Test broken Url", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get("https://www.openai.com");

        // first get the images from the site
        const images = await driver.findElements(By.tagName("img"));
        for (const img of images) {
          const src = await img.getAttribute("src");
          const response = await axios.get(src, { validateStatus: false });

          if (response.status != 200) {
            throw new Error(
              `The image is broken= ${src}. Status: ${response.status} Error: ${response.statusText}`
            );
          }
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

module.exports = { brokenUrl };
