const { writeFile } = require('fs');
const { join } = require('path');
const blend = require('@mapbox/blend');
const getImage = require('./getImage');

const greeting = {
	greeting: 'Hello',
	who: 'You',
	width: 400,
	height: 500,
	color: 'Pink',
	size: 100,
};

const firstReq = {
	// https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
	url: `https://cataas.com/cat/says/${greeting.greeting}?width=${greeting.width}&height=${greeting.height}&color${greeting.color}&s=${greeting.size}`,
	encoding: 'binary',
};

const secondReq = {
	url: `https://cataas.com/cat/says/${greeting.who}?width=${greeting.width}&height=${greeting.height}&color${greeting.color}&s=${greeting.size}`,
	encoding: 'binary',
};

const createBlend = async () => {
	const image1 = await getImage(firstReq);
	const image2 = await getImage(secondReq);
	blend(
		[
			{ buffer: image1, x: 0, y: 0 },
			{ buffer: image2, x: greeting.width, y: 0 },
		],
		{ width: greeting.width * 2, height: greeting.height, format: 'jpeg' },
		function (err, result) {
			if (err) {
				console.log(err);
				return;
			}
			const fileOut = join(process.cwd(), `/cat-card.jpg`);

			writeFile(fileOut, result, 'binary', (err) => {
				if (err) {
					console.log(err);
					return;
				}
				console.log('The file was saved!');
			});
		}
	);
};

createBlend();
