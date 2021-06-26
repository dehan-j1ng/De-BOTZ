const chalk = require('chalk');
const axios = require('axios')

const kyun = function kyun(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? "D - " : "D(s) - ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? "H - " : "H(s) - ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? "M - " : "M(s) - ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? "S" : "S") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
};

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

const color = (text, color) => {
    return !color ? chalk.greenBright(text) : chalk.keyword(color)(text)
}

module.exports = { kyun, getBuffer, color }