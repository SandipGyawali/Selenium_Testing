const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Set up Chrome options
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless"); // Run Chrome in headless mode (without opening a browser window)

// Create a WebDriver instance (using Chrome in this case)
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(chromeOptions)
  .build();

// Function to scrape quotes
async function scrapeQuotes() {
  try {
    // Open the website
    await driver.get("http://quotes.toscrape.com/");

    // Wait for quotes to load (adjust wait time as needed)
    await driver.wait(until.elementLocated(By.className("text")), 5000);

    // Scrape quotes
    const quotes = await driver.findElements(By.className("text"));
    for (const quote of quotes) {
      console.log(await quote.getText());
    }

    // Optionally, navigate to the next page
    const nextButton = await driver.findElement(By.partialLinkText("Next"));
    await nextButton.click();

    // Repeat the scraping process for additional pages if needed
  } finally {
    // Close the browser when done
    await driver.quit();
  }
}

module.exports = { scrapeQuotes };
