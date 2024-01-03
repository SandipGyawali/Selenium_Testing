const { Builder, By, until } = require("selenium-webdriver");
const { Actions } = require("selenium-webdriver/lib/input");

function roomBookingTest() {
  describe("Room Booking Test", function () {
    it("pre-booking-test", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get("https://automationintesting.online/");

        // navigate to the booking page.
        await driver
          .wait(
            until.elementLocated(
              By.className("btn btn-outline-primary float-right openBooking")
            )
          )
          .click();

        let obj = {
          firstName: "Adam",
          lastName: "Lee",
          email: "this@gmail.com",
          phone: "94929153823423",
        };
        // makes the object accessable in the form of the array indexes
        obj = Object.values(obj);
        // then fill the form with the appropriate date to proceed the login.
        for (let i = 0; i < 4; i++) {
          await driver
            .findElement(
              By.xpath(
                `//*[@id="root"]/div/div/div[4]/div/div[2]/div[3]/div[${
                  i + 1
                }]/input`
              )
            )
            .sendKeys(obj[i]);
        }

        // now set the date using drag method for the n night and n days package.
        const startDate = await driver.findElement(
          By.xpath(
            `//*[@id="root"]/div/div/div[4]/div/div[2]/div[2]/div/div[2]/div[2]/div[1]/div[1]`
          )
        );
        const endDate = await driver.findElement(
          By.xpath(
            `//*[@id="root"]/div/div/div[4]/div/div[2]/div[2]/div/div[2]/div[2]/div[1]/div[4]`
          )
        );

        // manually drag the data that you want.. then let selenium handle other thing.
        // now perform the drag action
        // const actions = new Actions(driver);
        // performs the drag operation.
        // await actions
        //   .move({ origin: startDate })
        //   .press()
        //   .move({ origin: endDate })
        //   .release()
        //   .perform();
        // perform the drag operation for the selection of date.
        await driver.sleep(5000);
        await driver
          .findElement(
            By.xpath(
              `//*[@id="root"]/div/div/div[4]/div/div[2]/div[3]/button[2]`
            )
          )
          .click();

        // then get the data from the over lay of the booking confirmation.
        const overlay = await driver.wait(
          until.elementLocated(By.className("col-sm-6 text-center"))
        );
        console.log("\n");
        console.log(await overlay.getText());
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

module.exports = { roomBookingTest };
