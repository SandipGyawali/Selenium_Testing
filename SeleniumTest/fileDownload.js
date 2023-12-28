const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

async function fileDownload() {
  describe("Download File Test", function () {
    it("download file", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        // first go to the url from where you want to download the file..
        await driver.get("https://the-internet.herokuapp.com/download");

        // then target the element with href anchor tag where you click to download.
        await driver
          .findElement(By.xpath(`//*[@id="content"]/div/a[1]`))
          .click();

        // wait for the file to be downloaded till 10 seconds
        const downloadedFileName = await driver.wait(async () => {
          const files = fs.readdirSync("C:/Users/ACER/Downloads");
          return files.find((file) => file.startsWith("free-images.avif"));
        }, 10000);

        // now check the file download section if it has been downloaded or not.
        // check the file path if it exists or not..
        const downloadFilePath = path.join(
          "C:/Users/ACER/Downloads",
          downloadedFileName
        );

        const fileExits = fs.existsSync(downloadFilePath);

        // check if file exists or not
        if (fileExits) {
          console.log("File downloaded Successfully");
        } else {
          throw new Error("File download fail");
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

module.exports = { fileDownload };
