const cheerio = require("cheerio");
const { Builder } = require("selenium-webdriver");

// this is the object that contains the info about the book
const bookList = [];

async function bookStore() {
  describe("Book Data Scrapping", function () {
    it("book list", async () => {
      const driver = new Builder().forBrowser("chrome").build();

      try {
        await driver.get("https://demoqa.com/books");

        const html = await driver.getPageSource();

        const $ = cheerio.load(html);

        // get the url of the image.
        const bookContainer = $(".rt-tbody");

        bookContainer.find("img").each((i, e) => {
          const imgUrl = $(e).attr("src");
          bookList.push({ imgUrl });
        });

        // get the book name/ title
        bookContainer.find(".mr-2").each((i, e) => {
          const title = $(e).text();
          bookList[i].title = title;
        });

        // get the author of the page.
        bookContainer
          .find(".rt-tr-group")
          .slice(0, 8)
          .each((i, e) => {
            const author = $(e).find(".rt-td")[2];
            const publisher = $(e).find(".rt-td")[3];
            const authorText = $(author).text();
            const publisherText = $(publisher).text();

            bookList[i].author = authorText;
            bookList[i].publisher = publisherText;
          });

        console.log(bookList);
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

module.exports = { bookStore };
