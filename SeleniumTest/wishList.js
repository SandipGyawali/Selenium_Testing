const { Builder, By, until } = require("selenium-webdriver");

// basic step overview of test.

/*
  1. First we must login
  2. then go to the user dashboard/profile section
  3. check for the myWish list section if it exists or not 
  4. before checking the wish list we make sure that we add the item to wish list
  5. then we check the wish list.
  6. if we found item in the wish list our test is successful else not.
*/
const user = {
  email: "this@gmail.com",
  password: "this@123456",
};

const errorMessage = "You have no items in your wish list.";

function myWishList() {
  describe("WishList-Test", () => {
    it("check item in the wish list", async function () {
      const driver = new Builder().forBrowser("chrome").build();

      // navigating to the website.
      await driver.get(
        "https://magento.softwaretestingboard.com/customer/account/login/"
      );

      try {
        // login
        // email
        await driver.findElement(By.id("email")).sendKeys(user.email);
        // password
        await driver.findElement(By.id("pass")).sendKeys(user.password);

        // now click the login button
        await driver.findElement(By.className("action login primary")).click();

        //now add an item to the wish list
        // navigating to the home page/items page.
        await driver.findElement(By.className("logo")).click();

        // now select the item and add to the wish list.s
        // navigate to the main page of item then add to wish list
        const itemElement = await driver.wait(
          until.elementLocated(
            By.xpath(
              `//*[@id="maincontent"]/div[3]/div/div[3]/div[3]/div/div/ol/li[3]/div/a/span/span/img`
            )
          )
        );

        await itemElement.click();

        // now add the item to the wish list.
        const wishListButton = await driver.wait(
          until.elementLocated(
            By.xpath(`//*[@id="maincontent"]/div[2]/div/div[2]/div[5]/div/a[1]`)
          )
        );

        await wishListButton.click();

        // now check for the wish list item
        // first check how many items we have in the wish list
        const numElement = await driver.wait(
          until.elementLocated(
            By.xpath(`//*[@id="maincontent"]/div[2]/div[1]/div[4]/div/p/span`)
          )
        );

        console.log(
          `The items in the wish list is: ${await numElement.getText()}`
        );
        // we found that the number of items in the wish list is 2.
        // now let's get the item name and price of it.
        // case for if the items is not in the wish list then
        try {
          const errElement = await driver.wait(
            until.elementLocated(By.className("message info empty")),
            5000
          );

          if ((await errElement.getText()) == errorMessage) {
            throw new Error(errorMessage);
          }
        } catch (err) {
          const wishListItemElement = await driver.findElement(
            By.className("product-item")
          );

          console.log(await wishListItemElement.getText());

          // here i have only one item that i have in my wish list so it shows only
          // one item.
          for (let i = 0; i < wishListItemElement.length - 2; i++) {
            console.log(await wishListItemElement.getText());
          }
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

module.exports = { myWishList };
