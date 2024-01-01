const { Builder } = require("selenium-webdriver");
const axios = require("axios");
const cheerio = require("cheerio");
const Phone = require("../Models/phone.Model.js");

// function that gets the phone list from the site
async function fetchPhone() {
  try {
    const phoneDescription = [];

    // sends request to the amazon site.
    const response = await axios.get("https://www.amazon.com/s?k=phone");
    // cheerio is a library used for web scrapping and uses jquery internally
    const $ = await cheerio.load(response.data);

    // get the data for the phone model description.
    $(`.a-section.a-spacing-small.a-spacing-top-small`).each(
      async (i, element) => {
        const data = $(element).find(
          ".a-size-medium.a-color-base.a-text-normal"
        );
        const descriptionText = data.text();

        // get the number or rating.
        const rating = $(element).find(".a-size-base.s-underline-text").text();
        console.log(rating);

        // get the price of the given model
        const priceElement = $(element).find(
          `.a-row.a-size-base.a-color-secondary`
        );
        const price = $(priceElement).find(".a-color-base").text().trim();

        const newPhoneData = {
          price: price.split(" ")[0],
          description: descriptionText,
          brand: descriptionText.split(" ")[0],
          rating_num: rating.split("L")[0],
        };

        // check for the existence in database.
        const existingPhone = await Phone.findOne(newPhoneData);

        if (!existingPhone) {
          await Phone.create(newPhoneData);
          phoneDescription.push(newPhoneData);
        } else {
          console.log(newPhoneData.brand + "already exists in the database");
        }
      }
    );

    await Phone.insertMany(phoneDescription);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { fetchPhone };
