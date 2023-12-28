const { Builder, By, until } = require("selenium-webdriver");

async function fileUpload() {
  describe("File Upload Test", async function () {
    // test case for the file upload from the file explorer
    it("choose file", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      await driver.get("https://the-internet.herokuapp.com/upload");

      try {
        // get the file input element.
        const fileInput = await driver.findElement(By.id("file-upload"));

        // define the filePath
        const filePath = `D:/project1.png`;

        // add the file path to the input field
        await fileInput.sendKeys(filePath);

        // now click the  upload button
        await driver.findElement(By.id("file-submit")).click();

        // wait till the upload message is not found
        const uploadElement = await driver.wait(
          until.elementLocated(By.xpath(`//*[@id="content"]/div/h3`))
        );

        const uploadText = await uploadElement.getText();

        if (uploadText == "File Uploaded!") {
          console.log("File uploaded successfully");
        }
      } catch (err) {
        throw new Error(err);
      } finally {
        await after(async function () {
          await driver.quit();
        });
      }
    });
  });
}

module.exports = { fileUpload };
