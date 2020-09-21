const config = require("./config.json");
const keys = require ("./keys.json");

const Discord = require ("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: keys.API_KEY_WATSON_TEXT_TO_SPEECH,
    }),
    serviceUrl: keys.URL_WATSON_TEXT_TO_SPEECH,
    disableSslVerification: true,
});

const getVoiceParams = {
    voice: "fr-FR_NicolasV3Voice",
};

const synthesizeParams = {
    text: "",
    accept: "audio/wav",
    voice: "fr-FR_NicolasV3Voice",
};

const Client = new Discord.Client();

function sendGiphy(message) {
    fetch("http://api.giphy.com/v1/gifs/search?q=" + message.content.substring(config.gif_prefix.length) + "&limit=1&api_key=" + keys.API_KEY_GIPHY)
    .then((res) => res.json())
    .then((json) => {
        message.channel.send(json.data[0].url);
    });
message.delete();
}

async function play(voiceChannel) {
    const connection = await voiceChannel.join();
    const dispatcher = await connection.play(fs.createReadStream("./temp.wav"));

    dispatcher.on("finish", () => {
        synthesizeParams.text = "";
        connection.disconnect();
    });
}

function playSound(message) {

    synthesizeParams.text = message.content.substring(config.sound_prefix.length);
    message.channel.send("sound command detected");
    textToSpeech.synthesize(synthesizeParams)
    .then((response) => {
        return textToSpeech.repairWavHeaderStream(response.result);
      })
    .then((buffer) => {
        fs.writeFileSync("temp.wav", buffer);
        if (message.member.voice.channel) {
            play(message.member.voice.channel);
        }})
      .catch(((err) => {
        process.exit();
      }));
}

Client.on("message", (message) => {
    if (message.content.startsWith(config.sound_prefix)) {
        playSound(message);
    } else if (message.content.startsWith(config.gif_prefix)) {
        sendGiphy(message);
    }
});

Client.login(keys.API_KEY_DISCORD);
