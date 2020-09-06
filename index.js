const Discord = require ('discord.js');
const jquery = require ('jquery');
const fetch = require('node-fetch');
const config = require('./config.json');
const keys = require ('./keys.json')

const Client = new Discord.Client();

Client.on('ready', () => {

	console.log("Bot Online")
});

Client.on('message', message => {
	console.log(message.content);
	if (message.content.startsWith(config.prefix)) {
		fetch("http://api.giphy.com/v1/gifs/search?q=" + message.content.substring(config.prefix.length) + "&limit=1&api_key=" + keys.API_KEY_GIPHY)
			.then(res => res.json())
			.then(json => {
				console.log("Gif asked: " + message.content.substring(config.prefix.length))
				message.channel.send(json.data[0].url);
			});
		message.delete();
	}
});

Client.login(keys.API_KEY_DISCORD)
