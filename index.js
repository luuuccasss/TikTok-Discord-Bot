const { Client, Intents } = require('discord.js');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const config = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

async function downloadVideo(url, outputPath) {
    const writer = fs.createWriteStream(outputPath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const tiktokUrlPattern = /https:\/\/www\.tiktok\.com\/.+/;
    const tiktokUrl = message.content.match(tiktokUrlPattern);

    if (tiktokUrl) {
        try {
            const tiktokVideoUrl = tiktokUrl[0];
            const outputPath = path.resolve(__dirname, 'tiktok.mp4');

            const response = await axios.get(`https://www.tiktok.com/oembed?url=${tiktokVideoUrl}`);
            const videoUrl = response.data.thumbnail_url.replace('.jpeg', '.mp4'); 

            const replyMessage = await message.reply('🕒 Downloading video, please wait...');

            await downloadVideo(videoUrl, outputPath);

            await message.channel.send({
                files: [{
                    attachment: outputPath,
                    name: 'tiktok.mp4'
                }]
            });

            await replyMessage.edit('✅ The TikTok video has been downloaded and sent!');

            fs.unlinkSync(outputPath);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while processing the video.');
        }
    }
});

client.login(config.TOKEN);


// I love you Nath