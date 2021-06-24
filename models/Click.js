const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
	linkId: {
		type: Types.ObjectId,
		required: true,
	},
	userId: {
		type: Types.ObjectId,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	ip: {
		type: String,
	},
});
module.exports = model("Clicks", schema);
