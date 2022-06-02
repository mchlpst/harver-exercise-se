const got = require('got');

const getImage = async (url) => {
	try {
		const response = await got(url);
		return response.rawBody;
	} catch (error) {
		console.log(error.response.body);
	}
};
module.exports = getImage;
