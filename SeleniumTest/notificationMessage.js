const { Builder, By, until } = require("selenium-webdriver");

function notificationMessage() {
  const driver = new Builder().forBrowser("chrome").build();

  describe("Notification Message Test", async function () {
    // this block is for success
    // here the successful and the unsuccessful notification case might be random so
    // we don't apply parallel testing over here
    // we use the sequential condition for the case
    it("notification check", async () => {
      // first navigate to the specific url.
      await driver.get("https://the-internet.herokuapp.com/");

      // now click on the message notification section.
      await driver
        .findElement(By.xpath(`//*[@id="content"]/ul/li[35]/a`))
        .click();

      // now wait until the page is not loaded..
      await driver.wait(
        until.urlIs(
          "https://the-internet.herokuapp.com/notification_message_rendered"
        ),
        5000
      );

      // after page has been fully loaded check for the notification button and click
      await driver.findElement(By.xpath(`//*[@id="content"]/div/p/a`)).click();

      // after clicking the button check for the message element whether it  exists or not.
      // wait until the element is loaded or rendered.
      // after the element is found or loaded then check for the message and see if it is successful or unsuccessful
      const messageElement = await driver.wait(
        until.elementLocated(By.id("flash"))
      );
      // get the text from the specific notification element.
      const message = (await messageElement.getText()).split(",");

      console.log(message[0]);
      if (message === "Action unsuccesful") {
        console.log("Notification was not received");
      } else {
        console.log("Notification was received.");
      }
    });
  });

  // after all the block has been finished executing..
  after(async () => {
    await driver.quit();
  });
}

module.exports = { notificationMessage };
