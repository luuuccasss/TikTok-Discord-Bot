
---

# TikTok Discord Bot

## TikTok Discord Bot

## Overview

The **TikTok Discord Bot** enables Discord users to download TikTok videos directly into a Discord channel. When a TikTok link is posted, the bot will download the video and send it to the channel, providing real-time feedback about the download status.

## Features

- **Automatic TikTok Video Download**: Detects and downloads TikTok videos from posted links.
- **Real-Time Feedback**: Updates users on the status of the video download.
- **Easy Integration**: Simple setup and configuration.

## Prerequisites

- **Node.js**: v16 or higher (recommended)
- **Discord Bot Token**: Create a bot on the [Discord Developer Portal](https://discord.com/developers/applications) and obtain your bot token.

## Installation

### 1. Download the Repository

### 2. Install Dependencies

Ensure you have `npm` (Node Package Manager) installed, then run:

```bash
npm install
```

### 3. Configure Your Bot

Create a file named `config.json` in the root directory with the following content:

```json
{
    "DISCORD_BOT_TOKEN": "TOKEN"
}
```

Replace `"TOKEN"` with your actual Discord bot token.

### 4. Start the Bot

Run the bot with:

```bash
node index.js
```

You should see `Bot is online!` in your terminal, indicating that the bot is successfully connected to Discord.

## How It Works

1. **Detects TikTok Links**: The bot scans messages for TikTok URLs.
2. **Replies with Status**: Sends an initial reply stating that the video is being downloaded.
3. **Downloads the Video**: Fetches the video from TikTok.
4. **Sends the Video**: Posts the downloaded video to the channel.
5. **Updates Status**: Edits the initial reply to confirm that the video has been sent.

## Troubleshooting

- **Bot Not Responding**: Ensure the bot is properly configured with the correct token and has the required permissions in the channel.
- **Error Messages**: Check the console for error details to diagnose issues. Common problems include network errors or invalid URLs.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, feel free to reach out:

- **GitHub**: [yourusername](https://github.com/FrenchGuys)

## Acknowledgements

- **[Discord.js](https://discord.js.org/)**: The library used for interacting with the Discord API.
- **[Axios](https://axios-http.com/)**: The library used for making HTTP requests.

---
