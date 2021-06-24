const router = require("express").Router();

router.get("/get", (req, res) => {
	req.body.isGetWorking = "true";
	res.json(req.body);
	// res.end("\n=================================\nend")
});

router.post("/post", (req, res) => {
	req.body.isPostWorking = "true";
	res.json(req.body);
	//  res.end("\n=================================\nend")
});

module.exports = router;
