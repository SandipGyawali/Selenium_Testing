const { Login_Test } = require("./SeleniumTest/loginTest");
const { shoppingCart } = require("./SeleniumTest/shoppingCart");
const { brokenImageCheck } = require("./SeleniumTest/brokenImageCheck");
const { notificationMessage } = require("./SeleniumTest/notificationMessage");
const { fileUpload } = require("./SeleniumTest/fileUpload");
const { fileDownload } = require("./SeleniumTest/fileDownload");

// Login_Test();
// shoppingCart();
// proceedCheckout();
// brokenImageCheck();
// notificationMessage();
fileUpload();
fileDownload();
