const { assert } = require("chai");
const chai = require("chai");

async function shoppingCart() {
  // this test case ensures the parallel test case implemented in selenium using mocha.

  // Important
  // parallel testing must have each test case independent of other..

  // Why parallel testing
  // 1. Increase Speed.
  // 2. Reduce Feedback Loop

  const { Builder, By, until } = require("selenium-webdriver");

  // describe block
  // it is used to group test.

  // The describe function is used to group together
  // related test cases. It is a way to create a test suite,
  // which is a collection of test cases that are logically related
  //  or test the same functionality.
  describe("Add item to cart", function () {
    // it block
    it("successfully adds item to cart", async function () {
      // setting up the driver for chrome.
      const driver = await new Builder().forBrowser("chrome").build();

      // try catch method to ensure the site close
      // after successful or failure cases
      try {
        await driver.get("https://magento.softwaretestingboard.com/");

        // select the item that you want to add to the cart.
        await driver.findElement(By.className("product-item-info")).click();

        // before adding the item to the cart the size and color field should be filled.
        // so targeting the size and color field..
        await driver.findElement(By.className("swatch-option text")).click();

        // targeting the color field.
        await driver
          .findElement(By.id("option-label-color-93-item-50"))
          .click();

        // target the add to cart button in order to add the item to the cart.
        await driver.findElement(By.className("action primary tocart")).click();

        // now check if the item has been added successfully to the cart or not.
        await driver.findElement(By.className("showcart")).click();

        // wait for the mini cart to be visible after adding the item
        await driver.wait(
          until.elementLocated(By.className("minicart-items-wrapper")),
          5000
        );

        // check the element for the number of items in the cart..
        const countElem = await driver.findElement(
          By.className("counter-number")
        );

        // get the number form the cart tag.
        const countNum = await countElem.getText();

        // if the item is greater then 0 then we know that the item has been added to the cart.
        if (countNum > 0) {
          console.log("The item is added to the cart");
        } else {
          console.log("The item is not added to the cart.");
        }
      } finally {
        await driver.quit();
      }
    });
  });
}

module.exports = shoppingCart;
