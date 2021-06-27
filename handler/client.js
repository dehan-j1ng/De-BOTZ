//------------------ PACKAGES MODULE ------------------//
const { 
  WAConnection,
  MessageType
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");
const _date = moment().format('LLLL');
//------------------ LIBRARY ------------------//
const {
  color
} = require("./databases.js");
//------------------ HANDLER ------------------//
const client = new WAConnection();
exports.client = client;
//------------------ CONNECT && SOME ------------------//
exports.connect = async () => {
  client._maxListeners = 50;
  client.browserDescription = ["Dehanjing", "Dhn-Api", "1.0.0"];
  client.browserDescription.push('De-BOTZ','Baileys','Chrome');
  client.logger.level = 'warn';
  client.on('qr', () => {
    console.log(color(_date, "red"), color("•  SCAN  =>"), color("Scan QR Kode nya di Whatsapp Web  •", "white"));
  });
  fs.existsSync('./session.json') && client.loadAuthInfo('./session.json');
  client.on('connecting', () => {
    console.log(color("• "), _date + color(" =>"), "STATS:" + color(" =>"), color("Connecting  •"));
  });
  client.on('open', () => {
    console.log(color("• "),_date + color(" =>"), "STATS:" + color(" =>"), color("De-BOTZ Connected  •"));
  });
  await client.connect();
  fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'));
  return client;
};
//------------------ BATTERY LISTENER ------------------//
	client.batterai = {};
	client.on("CB:action,,battery", obj => {
		const {
			value,
			live,
			powersave
		} = obj[2][0][1];
		client.batterai.value = value;
		client.batterai.note = client.batterai.value > 50 ? 'Masih banyak!' : 'Charger Bang :v';
		client.batterai.stats = live == "true" ? "Charger!" : "Not Charging!";
		client.batterai.powersave = powersave == "true" ? "On!" : "Off!";
		console.log(client.batterai);
		console.log(color(_date));
	});
//------------------ FAKE THUMBNAIL ------------------//
client.fakethumb = fs.readFileSync("./handler/dhn.jpeg");
	
/*
 * { Client send Reply }
 */
 
client.reply = (from, text, msg) => {
  return client.sendMessage(from, text, MessageType.text, { quoted: msg, thumbnail: client.fakethumb });
};

/*
 * { Client send Image with Caption }
 */

client.sendImageCaption = (from, image, msg, caption) => {
  return client.sendMessage(from, image, MessageType.image, { quoted: msg, caption: caption, thumbnail: client.fakethumb });
};

/*
 * { Client send Image with Forward & Fake Thumbnail }
 */
client.sendImageFake = (from, image, msg, caption, thumbnail, amount, [mentioned]) => {
  return client.sendMessage(from, image, MessageType.image, { quoted: msg, caption: caption, thumbnail: thumbnail, contextInfo: { isForwarded: true, forwardingScore: amount, mentionedJid: [mentioned] }});
};

/*
 * { Client send Fake Quoted Text }
 */

client.sendFakeStatus = (from, teks, faketeks, sender) => {
  return client.sendMessage(from, teks, text, { quoted: {
    key: {
      fromMe: false,
      participant: sender, 
      ...(from ? {
        remoteJid: "status@broadcast"
      } : {})
    },
    message: {
      "imageMessage": {
        "mimetype": "image/jpeg",
        "caption": faketeks,
        "jpegclient.fakethumb": client.fakethumb
      }
    }
  }
  });
};

/*
 *
 * De-BOTZ - an example script for whatsapp bot
 * - 14/06/21 -
 * @dehan_j1ng
 * More Features? chat me via WhatsApp
 * https://wa.me/6281342474954
 *
 */
