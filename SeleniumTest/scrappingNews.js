const axios = require("axios");
const cheerio = require("cheerio");

// logic for scrapping the news data from the site.
// this can be both worked for stocks as well as for cryptos
async function scrapeNewsData(url) {
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);

  const data = [];

  // scrapping the stock news title, it's end point url and image
  $("li.js-stream-content").each((index, element) => {
    const title = $(element).find("h3").text().trim();
    const link = $(element).find("a").attr("href");
    const imageUrl = $(element).find("img").attr("src");

    // if any field is empty then skip it.
    if (title && link && imageUrl) {
      data.push({ title, link, imageUrl });
    }
  });

  console.log(data);
}

module.exports = { scrapeNewsData };
