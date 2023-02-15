const { logTime } = require( '../functions.js');

module.exports = {
	name: 'error',
	once: true,
	execute(client, error) {
			console.log(`${logTime()} An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
		  },	
};