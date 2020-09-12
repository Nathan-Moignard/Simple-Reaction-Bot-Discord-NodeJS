const Discord = require ('discord.js');
const jquery = require ('jquery');
const fetch = require('node-fetch');
const config = require('./config.json');
const keys = require ('./keys.json');
const ytdl = require('ytdl-core');

const Client = new Discord.Client();

Client.on('ready', () => {

	console.log("Bot Online")
});

Client.on('message', message => {
	console.log(message.content);
	if (message.content.startsWith(config.prefix + "sound")) {
		playSound(message);
	} else if (message.content.startsWith(config.prefix + " ")) {
		sendGiphy(message);
	}
});

function sendGiphy(message) {
	fetch("http://api.giphy.com/v1/gifs/search?q=" + message.content.substring(config.prefix.length) + "&limit=1&api_key=" + keys.API_KEY_GIPHY)
	.then(res => res.json())
	.then(json => {
		console.log("Gif asked: " + message.content.substring(config.prefix.length));
		message.channel.send(json.data[0].url);
	});
message.delete();
}

function playSound(message) {
	message.channel.send("sound command detected");
}

Client.login(keys.API_KEY_DISCORD)
