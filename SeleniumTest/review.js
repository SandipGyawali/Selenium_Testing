// adding the review to the item
const { Builder, By, until } = require("selenium-webdriver");

const data = {
  email: "this@gmail.com",
  password: "this@123456",
};

function review() {
  describe("Add Review Test", () => {
    it("add review to the product", async () => {
      const driver = new Builder().forBrowser("chrome").build();
      try {
        await driver.get(
          "https://magento.softwaretestingboard.com/customer/account/login/"
        );

        // first login to the site
        await driver.findElement(By.id("email")).sendKeys(data.email);
        await driver.findElement(By.id("pass")).sendKeys(data.password);

        // click the sign in button
        await driver.findElement(By.className("action login primary")).click();

        // navigate to the home page
        await driver
          .findElement(By.xpath(`/html/body/div[2]/header/div[2]/a`))
          .click();

        // now get one product and navigate to the review section.
        await driver
          .findElement(
            By.xpath(
              `//*[@id="maincontent"]/div[3]/div/div[3]/div[3]/div/div/ol/li[3]/div`
            )
          )
          .click();

        // get to the reviews section
        await driver
          .findElement(By.xpath(`//*[@id="tab-label-reviews"]`))
          .click();

        // fill the form section for the review.
        // first giving the review stars.
        await driver.findElement(By.xpath(`//*[@id="Rating_2_label"]`)).click();

        // give the summary of the product
        await driver
          .findElement(By.id("summary_field"))
          .sendKeys(
            `The online-purchased cloth is a stylish and comfortable addition to your wardrobe.`
          );

        // write the actual description for the review of the product
        await driver.findElement(By.id("review_field")).sendKeys(
          `The online-purchased cloth is a stylish and comfortable addition to your wardrobe. Crafted with quality materials,
             it offers a trendy design that aligns with current fashion trends. Its versatile nature makes it suitable for various occasions,
              providing both fashion and comfort in one. Check the product details for specific features and care instructions.`
        );

        // submit the review
        await driver.findElement(By.className("action submit primary")).click();

        // navigate to my product reviews
        await driver.get(
          "https://magento.softwaretestingboard.com/review/customer/"
        );

        // if you found the see details button then the review was successfully added
        const detailElement = await driver.findElement(
          By.xpath(`//*[@id="my-reviews-table"]/tbody/tr[1]/td[5]/a`)
        );

        if (detailElement) {
          console.log("The review was successfully added");
          console.log(await detailElement.getText());
        } else {
          throw new Error("The review was not added");
        }
        await await driver.sleep(5000);
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

module.exports = { review };
