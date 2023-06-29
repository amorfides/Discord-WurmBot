module.exports = async client => {
    const { EmbedBuilder } = require('discord.js')
    require('dotenv').config();
    const guild = await client.guilds.cache.find(x=>x.name===process.env.GUILD_NAME);
    console.log("Starting webhook-stream.js ..")
    client.on('messageCreate', async message => {
        if (message.channel.name == process.env.INPUT_CHANNEL) {
            let txt = message.content.toLowerCase();
            console.log(txt);
            console.log(message.channel.name);
            var villageOutput = guild.channels.cache.find(x => x.name === process.env.OUTPUT_VILLAGE)
            var allianceOutput = guild.channels.cache.find(x => x.name === process.env.OUTPUT_ALLIANCE)
            var village = process.env.VILLAGE_NAME;
            var msg = message.content.slice(12 + village.length)
            if (txt.startsWith('<village>')) {
                if (process.env.USE_EMBEDS == 'true') {                    
                    let messageEmbed = new EmbedBuilder()
                        .setColor('#00cc66')
                        .addFields(
                            {
                                name: `${message.author.tag.slice(0, -5)}`,
                                value: `${msg}`
                            });
                    villageOutput.send({ embeds: [messageEmbed] });
                } else {
                    villageOutput.send({ content: msg })
                }
            }
            if (txt.startsWith('<alliance>')) {
                if (process.env.USE_EMBEDS == 'true') {
                    var msg = message.content.slice(13)
                    let messageEmbed = new EmbedBuilder()
                        .setColor('#00cc66')
                        .addFields(
                            {
                                name: `${message.author.tag.slice(0, -5)}`,
                                value: `${msg}`
                            });
                    allianceOutput.send({ embeds: [messageEmbed] });
                } else {
                    allianceOutput.send({ content: txt.slice(12) });
                }
            }
        }

    })

}