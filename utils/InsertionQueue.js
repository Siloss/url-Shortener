// /**
//  * Multiton for queues for inserting documents into database
//  */
// class InsertionQueue {
// 	constructor() {
// 		if (typeof InsertionQueue.instance === "object") {
// 			return InsertionQueue.instance;
// 		}

// 		this.instances = new Map();

// 		InsertionQueue.instance = this;
// 		return this;
// 	}

// 	/**
// 	 * description.
// 	 *
// 	 * @param {*} model - data model
// 	 * @returns {InsertionQueueInstance} instance of queue for the model
// 	 */
// 	getInstance(model) {
// 		if (!this.instances.has(model)) {
// 			this.instances.set(model, new InsertionQueueInstance());
// 		}

// 		return this.instances.get(model);
// 	}
// }

// class InsertionQueueInstance {
// 	constructor;
// }

// const inst = new InsertionQueue();

// inst.getInstance();

// const userModel = require("../models/User");
// const userModel1 = require("../models/User");

// console.log();
