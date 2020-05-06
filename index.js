const Discord = require ('discord.js')
const API_KEY = "NzAwODI1MTI3NTI4NDMxNzA2.XpouOA.M5rGpweuJdju-ESevqfDgDNTF0g"

const fs = require('fs')
const logPath = "/home/pi/Simple-Reaction-Bot-Discord-NodeJS/console.log"

const Client = new Discord.Client()

var MICKAEL_ID = "375384599934533642";
var VALENTIN_ID = "211104990306107392";
var JMLP_BOT_ID = "472027453477355520";
var BOT_ID = "700825127528431706";

const AdminRole = "Proviseurs";

Client.on('ready', () => {

	console.log("Bot Online")
});

Client.on('message', message => {
	// console.log(message.content);
	// console.log(BOT_ID.indexOf(message.conten
	console.log("Author: " + message.author.id);
	if (message.content.toString().indexOf(MICKAEL_ID) > 0 && 0)
		message.channel.send('miroir miroir :slight_smile:');
        if (message.content.toString().indexOf(BOT_ID) > 0 &&
	message.author.id != JMLP_BOT_ID)
                message.channel.send('Heureux d\'etre parmis vous :wink:');
	if (message.content.toString().indexOf(BOT_ID) > 0 &&
        message.author.id == JMLP_BOT_ID)
		message.react(':rage:')
			.then(console.log)
			.catch(console.error);
	if (message.content.toString().indexOf(VALENTIN_ID) > 0)
		message.channel.send('Bonne nuit Valou :heart:');

	fs.appendFile(logPath, message.author.username + " send " + message.content + "\n", (error_append) => {
		if (error_append)
			throw error_append;
	});
});

Client.login(API_KEY)
