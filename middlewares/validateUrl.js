const validUrl = require("valid-url");

module.exports = {
  isValid: function (url) {
    return validUrl.isUri(url);
  },
};
