const config = require('./config.json');
const { Client, Intents } = require('discord.js');
const fs = require('fs').promises;
const axios = require('axios');
const path = require('path');

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
    try {
        const writer = (await fs.open(outputPath, 'w')).createWriteStream();
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
    } catch (error) {
        console.error('Error during video download:', error);
        throw new Error('Failed to download video.');
    }
}

async function handleTikTokUrl(message, tiktokUrl) {
    try {
        const outputPath = path.resolve(__dirname, 'tiktok.mp4');

        const replyMessage = await message.reply('🕒 Downloading video, please wait...');

        const response = await axios.get(`https://www.tiktok.com/oembed?url=${tiktokUrl}`);
        const videoUrl = response.data.thumbnail_url.replace('.jpeg', '.mp4'); 

        await downloadVideo(videoUrl, outputPath);

        await message.channel.send({
            files: [{
                attachment: outputPath,
                name: 'tiktok.mp4'
            }]
        });

        await replyMessage.edit('✅ The TikTok video has been downloaded and sent!');
        await fs.unlink(outputPath);
    } catch (error) {
        console.error('Error processing TikTok URL:', error);
        message.reply('❌ An error occurred while processing the video. The video might not be directly downloadable.');
    }
}

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const tiktokUrlPattern = /https:\/\/www\.tiktok\.com\/[^ ]+/;
    const tiktokUrl = message.content.match(tiktokUrlPattern);

    if (tiktokUrl) {
        await handleTikTokUrl(message, tiktokUrl[0]);
    }
});

client.login(config.TOKEN);
