const app = require("./app");
const PORT = require("./config").PORT;

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
