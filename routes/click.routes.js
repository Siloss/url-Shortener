const moment = require("moment");
const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const modelCLick = require("../models/Click");

// /api/click/getCount
router.post("/getCounts", auth, async (req, res) => {
	try {
		const result = [];
		const clicks = await modelCLick
			.find({
				date: {
					$lte: req.body.endDate,
					$gte: req.body.startDate,
				},
			})
			.sort({ date: 1 });

		const clickCounts = [];

		let count = 1;
		for (let i = 1; i < clicks.length; i++) {
			if (
				moment(clicks[i].date).format("DD.MM.YYYY") ===
				moment(clicks[i - 1].date).format("DD.MM.YYYY")
			) {
				count++;
			} else {
				clickCounts.push({
					date: clicks[i - 1].date,
					clicks: count,
				});

				count = 1;
			}
		}

		if (clicks.length) {
			clickCounts.push({
				date: clicks[clicks.length - 1].date,
				clicks: count,
			});
		}

		res.json(clickCounts);
	} catch (e) {
		res.status(500).json({ message: "Smth went wrong...! Try later" });
		console.log(e);
	}
});

router.get("/getCount/:linkId", auth, async (req, res) => {
	try {
		const clicks = await modelCLick.find({
			linkId: req.params.linkId,
		});

		res.status(200).json({ count: clicks.length });
	} catch (e) {
		res.status(500).json({ message: "Smth went wrong...! Try later" });
		console.log(e);
	}
});

module.exports = router;
