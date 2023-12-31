// this test helps in checking the alert, confirm, prompt test..
const { Builder, By, until } = require("selenium-webdriver");

async function alertEvent() {
  describe("Alert, Confirm and Prompt Test", function () {
    it("alert Event Test", async () => {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get(
          "https://the-internet.herokuapp.com/javascript_alerts"
        );
        // target the button/event trigger that triggers the event
        // then trigger the event by clicking it.
        const alertElement = await driver.findElement(
          By.xpath(`//*[@id="content"]/div/ul/li[1]/button`)
        );

        // after finding then click.
        await alertElement.click();

        // await till the alert shows.
        await driver.wait(until.alertIsPresent());

        // now switch to the alert section
        const alert = await driver.switchTo().alert();

        // now after getting the alert accept the alert.
        await alert.accept();
      } catch (err) {
        throw new Error(err);
      } finally {
        after(async () => {
          await driver.quit();
        });
      }
    });

    //test for the confirm event handling
    it("Confirm Event Test", async () => {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get(
          "https://the-internet.herokuapp.com/javascript_alerts"
        );
        // target the button/event trigger that triggers the event
        // then trigger the event by clicking it.
        const alertElement = await driver.findElement(
          By.xpath(`//*[@id="content"]/div/ul/li[2]/button`)
        );

        // after finding then click.
        await alertElement.click();

        // await till the alert shows.
        await driver.wait(until.alertIsPresent());

        // now switch to the alert section
        const alert = await driver.switchTo().alert();

        // now after getting the alert accept the alert.
        await alert.accept();
      } catch (err) {
        throw new Error(err);
      } finally {
        after(async () => {
          await driver.quit();
        });
      }
    });

    // test for the event prompt
    it("Prompt Event Test", async () => {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get(
          "https://the-internet.herokuapp.com/javascript_alerts"
        );
        // target the button/event trigger that triggers the event
        // then trigger the event by clicking it.
        const alertElement = await driver.findElement(
          By.xpath(`//*[@id="content"]/div/ul/li[3]/button`)
        );

        // after finding then click.
        await alertElement.click();

        // await till the alert shows.
        await driver.wait(until.alertIsPresent());

        // now switch to the alert section
        const prompt = await driver.switchTo().alert();

        // now after getting the alert accept the alert.
        await prompt.sendKeys("Hello, Selenium");
        await prompt.accept();
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

module.exports = { alertEvent };
