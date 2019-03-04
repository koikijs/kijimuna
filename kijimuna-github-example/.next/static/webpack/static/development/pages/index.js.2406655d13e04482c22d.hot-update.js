webpackHotUpdate("static/development/pages/index.js",{

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var port = process.env.PORT || 3000;
var isDev = process.env.NODE_DEV !== "production";
var origin = isDev ? "http://localhost:".concat(port) : "https://kijimuna-github-example.now.sh";
module.exports = {
  port: port,
  isDev: isDev,
  origin: origin,
  auth: {
    github: {
      client: process.env.KIJIMUNA_GITHUB_EXAMPLE_CLIENT,
      secret: process.env.KIJIMUNA_GITHUB_EXAMPLE_SECRET
    },
    kijimuna: {
      client: process.env.KIJIMUNA_EXAMPLE_CLIENT,
      secret: process.env.KIJIMUNA_EXAMPLE_SECRET
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

})
//# sourceMappingURL=index.js.2406655d13e04482c22d.hot-update.js.map