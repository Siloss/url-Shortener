const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const nanoid = require("nanoid");

const auth = require("../middleware/auth.middleware");
const modelLink = require("../models/Link");

// /api/link/new
router.post("/new", auth, async (req, res) => {
	try {
		const existing = await modelLink.findOne({
			owner: req.user.userId,
			url: req.body.url,
		});

		if (existing) {
			return res.status(200).json({
				url: req.body.url,
				hash: existing.hash,
				clicks: existing.clicks,
				created: existing.created,
				message: "You already have link for this url.",
			});
		}

		const hash = await nanoid.nanoid(8);

		const link = new modelLink({
			url: req.body.url,
			hash: hash,
			owner: req.user.userId,
		});

		await link.save();

		res.status(201).json({
			url: req.body.url,
			hash: hash,
			clicks: 0,
			created: link.created,
			message: "successfully created!",
		});
	} catch (e) {
		res.status(500).json({ message: "Smth went wrong! Try later" });
	}
});

// /api/link
router.get("/", auth, async (req, res) => {
	try {
		const links = await modelLink
			.find({ owner: req.user.userId })
			.sort({ created: 1 });
		res.json(links);
	} catch (e) {
		res.status(500).json({ message: "Smth went wrong...! Try later" });
	}
});

// /api/link/:range

/**
 *    | - delimeter
 */

router.get("/:range", auth, async (req, res) => {
	try {
		const links = await modelLink
			.find({
				owner: req.user.userId,
				created: {
					$gte: req.params.range.split("|")[0],
					$lte: req.params.range.split("|")[1],
				},
			})
			.sort({ created: 1 });
		res.json(links);
	} catch (e) {
		res.status(500).json({ message: "Smth went wrong...! Try later" });
	}
});

// /api/link/remove/:hash
router.delete("/remove/:hash", auth, async (req, res) => {
	try {
		const link = await modelLink.findOne({ hash: req.params.hash });
		if (!link) {
			return res.status(404).json({ message: "such link isn't exist" });
		}
		await link.deleteOne();

		res.status(200).json({ message: "Successfully deleted." });
	} catch (e) {
		res.status(500).json({ message: "Smth went wrong...! Try later" });
	}
});

module.exports = router;
