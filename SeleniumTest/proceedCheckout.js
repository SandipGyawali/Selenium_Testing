const { By, until } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/select");

// the order placed button and email should be manually entered..s

async function proceedCheckout(driver) {
  describe("Proceed to Checkout", async function () {
    // it block
    it("shipping Address, Review and Payment", async function () {
      // first go the cart section.
      await driver.findElement(By.className("showcart")).click();

      // sleep till the cart container/layout does not show up
      await driver.sleep(3000);

      // wait until the cart is visible in the page.
      await driver.findElement(By.id("ui-id-1"));

      // then proceed to the checkout button by clicking.
      await driver
        .wait(until.elementLocated(By.id("top-cart-btn-checkout")))
        .click();

      // wait till we navigate to the defined uri
      await driver.wait(
        until.urlIs(
          "https://magento.softwaretestingboard.com/checkout/#shipping"
        )
      );

      try {
        // Note: here the email field is not enabled and cannot be accessed by the
        //  selenium driver manually write the email by yourself.

        // input the email to the email-input field.
        // const emailInput = await driver.wait(
        //   until.elementLocated(By.name("username"))
        // );
        // execute this script to input the email in the input field.
        // add input to the first name field
        const firstName = await driver.wait(
          until.elementLocated(By.name("firstname"))
        );
        await firstName.sendKeys("Austin");
        // add input to the last name field
        const lastName = await driver.wait(
          until.elementLocated(By.name("lastname"))
        );
        await lastName.sendKeys("Reeve");
        // add value to the company field
        const companyInput = await driver.wait(
          until.elementLocated(By.name("company"))
        );
        await companyInput.sendKeys("Octa Wave");
        // add value to the street input field
        const streetInput = await driver.wait(
          until.elementLocated(By.name("street[0]"))
        );
        await streetInput.sendKeys("Nepal");
        // adding the value to the city input field
        const cityInput = await driver.wait(
          until.elementLocated(By.name("city"))
        );
        await cityInput.sendKeys("Kathmandu");
        // select the given option of state/province.
        const stateProvinceInput = await driver.wait(
          until.elementLocated(By.name("region_id"))
        );
        const select = new Select(stateProvinceInput);
        select.selectByVisibleText("Alabama");
        const postalCodeInput = await driver.wait(
          until.elementLocated(By.name("postcode"))
        );
        postalCodeInput.sendKeys("35004");
        const phoneNumberInput = await driver.wait(
          until.elementLocated(By.name("telephone"))
        );
        phoneNumberInput.sendKeys("760-555-0187");
        const countryInput = await driver.wait(
          until.elementLocated(By.name("country_id"))
        );
        const country = new Select(countryInput);
        country.selectByVisibleText("United States");
        const shippingMethodInput = await driver.wait(
          until.elementLocated(By.name("ko_unique_3"))
        );
        await shippingMethodInput.click();
        // after adding all the required field move to the next section.
        await driver.sleep(7000);
        await driver
          .findElement(By.className("button action continue primary"))
          .click();
        // caller of payment method.
        await paymentMethod(driver);
      } catch (err) {
        // throw the error to fail the test case if the test was not successful.
        throw new Error(err.message);
      }
      await driver.sleep(5000);
      // await driver.findElement(By.id("TBQ9PKK")).sendKeys("hello");
    });
  });
}

// payment method page logic
async function paymentMethod(driver) {
  describe("Order Placement", function () {
    it("place order", async function () {
      // wait till the page does not navigate to the payment section
      const isPaymentUrl = await driver.wait(async () => {
        const paymentUrl = await driver.getCurrentUrl();
        return (
          paymentUrl ===
          "https://magento.softwaretestingboard.com/checkout/#payment"
        );
      });

      // the order placed button and email should be manually entered..s
      await driver.sleep(5000);
      // after that place the order

      // now check for the order number if we get the order number then the order
      if (isPaymentUrl) {
        //  is placed otherwise the order is not placed.
        try {
          const isCurrentUrl = await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return (
              currentUrl ===
              "https://magento.softwaretestingboard.com/checkout/onepage/success/"
            );
          });
          if (isCurrentUrl) {
            // get the number from the order section.
            const checkOutSuccessElement = await driver.wait(
              until.elementLocated(By.className("checkout-success"))
            );
            // getting the span because it contains the order number.
            const orderNumberElement = await checkOutSuccessElement.findElement(
              By.css("span")
            );
            const orderNumber = await orderNumberElement.getText();
            // if we get the order number then print it..
            if (orderNumber) {
              console.log(
                `Your order is placed.\n The order number is: ${orderNumber}`
              );
            } else {
              throw new Error("The order was not placed");
            }
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  });
}

module.exports = { proceedCheckout };
