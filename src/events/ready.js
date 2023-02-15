module.exports = {
	name: 'ready',
	once: true,
	execute: async (client) => {
		console.log(`${client.user.tag} has logged in.`);
		const webhookStream = require('../webhook-stream.js')
		await webhookStream(client)		
	},
};  