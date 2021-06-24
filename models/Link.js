const { ObjectID } = require("bson");
const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
	url: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: true,
		unique: true,
	},
	owner: {
		type: Types.ObjectId,
		ref: "Users",
		required: true,
	},
	clicks: {
		type: Number,
		default: 0,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
module.exports = model("Links", schema);
