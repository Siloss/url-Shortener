if (process.env.NODE_ENV === "production") {
	module.exports = require("./config/productionConfig");
} else {
	module.exports = require("./config/devConfig");
}
