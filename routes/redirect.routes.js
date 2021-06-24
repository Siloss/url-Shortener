const router = require("express").Router();

const { check, validationResult } = require("express-validator");
const modelLink = require("../models/Link");
const modelClick = require("../models/Click");
const { model } = require("../models/Link");

//:hash
router.get(
	"/:hash",
	[check("hash", "Invalid hash length").isLength({ min: 1, max: 20 })],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(200).json({
					errors: errors.array(),
					message: "Invalid hash",
				});
			}

			const link = await modelLink.findOne({ hash: req.params.hash });

			if (link) {
				modelClick.insertMany({
					linkId: link._id,
					ip: req.clientIp,
					userId: link.owner,
				});
				res.redirect(link.url);
			} else {
				res.status(404).json({
					message: "This hash doesn't exist",
				});
			}
		} catch (e) {
			console.log(e);
			res.status(400).json({
				message: "Smth went wrong! Try later.",
			});
		}
	}
);

module.exports = router;
