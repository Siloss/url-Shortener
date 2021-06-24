//global
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const requestIp = require("request-ip");
const serveStatic = require("serve-static");
const path = require("path");

//not global
const config = require("./config");
const authRoutes = require("./routes/auth.routes");
const debugRoutes = require("./routes/debug.routes");
const linkRoutes = require("./routes/link.routes");
const redirectRoutes = require("./routes/redirect.routes");
const clickRoutes = require("./routes/click.routes");

const app = express();

mongoose
	.connect(config.mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(console.log("Mongo DB connected\n"))
	.catch((e) => console.error(e));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ip middleware handler
const ipMiddleware = function (req, res, next) {
	requestIp.getClientIp(req);
	next();
};

app.use(ipMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);
app.use("/r", redirectRoutes);
app.use("/debug", debugRoutes);
app.use("/api/click", clickRoutes);

app.use(serveStatic(__dirname + "/client/dist"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

module.exports = app;
