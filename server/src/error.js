module.exports = {
	name: 'error',
	once: true,
	execute(client, error) {
			console.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
		  },	
};