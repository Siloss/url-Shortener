module.exports =
	/**
	 * @param {number} base
	 * @param {string} numerals
	 * @returns {string} convertedNumber
	 */
	(number, base, numerals) => {
		let result = "";
		while (number >= base) {
			result = numerals[number % base] + result;
			number = ~~(number / base);
		}

		result = numerals[number] + result;

		return result;
	};
