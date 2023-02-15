module.exports = async client => {
    const { EmbedBuilder } = require('discord.js')
    require('dotenv').config();
    const guild = await client.guilds.cache.get(process.env.GUILD_ID)
    const inputChannels = [process.env.INPUT_CHANNEL]
    console.log("Starting webhook-stream.js ..")
    
    client.on('messageCreate', async message => {
        if (!inputChannels.includes(message.channel.id)) return;
        let txt = message.content.toLowerCase();
        var villageOutput = guild.channels.cache.find(x => x.id === process.env.OUTPUT_VILLAGE)
        var allianceOutput = guild.channels.cache.find(x => x.id === process.env.OUTPUT_ALLIANCE)
        let messageEmbed = new EmbedBuilder()
            .setColor('#00cc66')
            .setTimestamp(new Date())
            .addFields(
                {
                    name: `${message.author.tag.slice(0, -5)}`,
                    value: `${message.content}`
                });
        if (txt.startsWith('<Village>')){
            if(process.env.USE_EMBEDS == 'true'){
                villageOutput.send({embeds: [messageEmbed] });
            } else {
                villageOutput.send({content: message.content})
            }
        }
        if (txt.startsWith('<Alliance>')){
            if(process.env.USE_EMBEDS == 'true'){
                allianceOutput.send({embeds: [messageEmbed] });
            } else {
                allianceOutput.send({content: message.content})
            }  
        }                
    })
}