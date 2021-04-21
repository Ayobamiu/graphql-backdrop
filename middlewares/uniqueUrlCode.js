const { nanoid } = require("nanoid");
module.exports = {
  generate: function () {
    const code = nanoid(6);
    return code;
  },
};
