const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const modelUser = require("../models/User");
const config = require("../config");

const router = Router();

//  /api/auth/register
router.post(
	"/register",
	[
		check("email", "Incorrect Email")
			.isLength({ max: 50 })
			.normalizeEmail()
			.isEmail(),
		check("password", "Incorrect password length").isLength({
			min: 6,
			max: 50,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(200).json({
					errors: errors.array(),
					message: "Invalid register data",
				});
			}

			const { email, password } = req.body;

			const candidate = await modelUser.findOne({ email: email });
			if (candidate) {
				res.status(200).json({ message: "Such user already exist!" });
			} else {
				const hashedPassword = await bcrypt.hash(password, 12);
				const User = new modelUser({
					email: email,
					password: hashedPassword,
				});
				await User.save();

				const token = await jwt.sign(
					{
						userId: User.id,
					},
					config.jwtSecret,
					{
						expiresIn: "1h",
					}
				);

				res.status(200).json({
					message: "Successfully registered!",
					token,
				});
			}
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Smth went wrong...! Try later" });
		}
	}
);

//  /api/auth/login
router.post(
	"/login",
	[
		check("email", "Incorrect Email")
			.isLength({ max: 50, min: 1 })
			.normalizeEmail()
			.isEmail(),
		check("password", "Password is too short").isLength({ min: 3, max: 50 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(200).json({
					errors: errors.array(),
					message: "Invalid login data",
				});
			}

			const { email, password } = req.body;

			const candidate = await modelUser.findOne({ email: email });

			if (!candidate) {
				return res.status(200).json({ message: "Such user does not exist" });
			}

			const matcedPassword = await bcrypt.compare(password, candidate.password);

			if (matcedPassword) {
				const token = await jwt.sign(
					{
						userId: candidate.id,
					},
					config.jwtSecret,
					{
						expiresIn: "1h",
					}
				);
				res.status(200).json({
					token,
					userId: candidate.id,
					message: "Logged in successfully!",
				});
			} else {
				res.status(200).json({ message: "Wrong password!" });
			}
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Smth went wrong! Try later" });
		}
	}
);

module.exports = router;
