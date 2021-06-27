//------------------ PACKAGES MODULE ------------------//
const baileys = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");
const util = require("util");
const os = require("os");
const axios = require("axios");
const speed = require("performance-now");
const {
  BBCNews,
  metroNews,
  CNNNews,
  iNews,
  KumparanNews,
  TribunNews,
  DailyNews,
  DetikNews,
  OkezoneNews,
  CNBCNews,
  FajarNews,
  KompasNews,
  SindoNews,
  TempoNews,
  IndozoneNews,
  AntaraNews,
  RepublikaNews,
  VivaNews,
  KontanNews,
  MerdekaNews,
  KomikuSearch,
  AniPlanetSearch,
  KomikFoxSearch,
  KomikStationSearch,
  MangakuSearch,
  KiryuuSearch,
  KissMangaSearch,
  KlikMangaSearch,
  PalingMurah,
  LayarKaca21,
  AminoApps,
  Mangatoon,
  WAModsSearch,
  Emojis,
  CoronaInfo,
  Cerpen,
  Quotes,
  Couples,
  JalanTikusMeme,
  Darkjokes
} = require("dhn-api");
//------------------ LIBRARY ------------------//
const {
	color,
	kyun,
	getBuffer
} = require("./handler/databases.js");
const {
	text,
	image
} = baileys.MessageType;
//------------------ HANDLER ------------------//
const client = require("./handler/client.js").client;
require("./handler/client.js").connect();
const _date = moment().format('LLLL');
//------------------ HANDLER LISTENER ------------------//
	client.on('chat-update', async (msg) => {
		try {
			if (!msg.hasNewMessage) return;
			msg = JSON.parse(JSON.stringify(msg)).messages[0];
			if (!msg.message) return;
			if (msg.key && msg.key.remoteJid === 'status@broadcast') return;
			const from = msg.key.remoteJid;
			const type = Object.keys(msg.message)[0];
			if (type === 'ephemeralMessage') {
				msg.message = msg.message.ephemeralMessage.message;
				type = Object.keys(msg.message)[0];
			}
//------------------ CONTROLLER ------------------//
			prefix = '#';
			body = (((type === 'conversation') && msg.message.conversation) && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (((type === 'imageMessage') && msg.message.imageMessage.caption) && msg.message.imageMessage.caption.startsWith(prefix)) ? msg.message.imageMessage.caption : (((type === 'videoMessage') && msg.message.videoMessage.caption) && msg.message.videoMessage.caption.startsWith(prefix)) ? msg.message.videoMessage.caption : (((type === 'extendedTextMessage') && msg.message.extendedTextMessage.text) && msg.message.extendedTextMessage.text.startsWith(prefix)) ? msg.message.extendedTextMessage.text : '';
			chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : '';
			const _client = client.user;
			const sender = msg.key.fromMe ? _client.jid : from.endsWith('@g.us') ? msg.participant : from;
			const conts = msg.key.fromMe ? _client.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') };
			const pushname = msg.key.fromMe ? _client.name : conts.notify || conts.vname || conts.name || '-';
			const _sender = sender.split("@")[0];
			const ownerNumber = ['6281342474954@s.whatsapp.net', _client.jid];
//------------------ STATS ------------------//
			const { 
				wa_version,
				mcc,
				mnc,
				os_version,
				device_manufacturer,
				device_model,
				os_build_number
			} = _client.phone;
			const _runtime = kyun(process.uptime());
			const _awal = speed();
			const _speed = speed() - _awal;
			const _tahunbaru = await axios.get('https://dhn-api.herokuapp.com/api/hitungmundur?apikey=DehanApi&bulan=1&tanggal=1&tahun=2022', { method: 'GET' });
			const _iduladha = await axios.get('https://dhn-api.herokuapp.com/api/hitungmundur?apikey=DehanApi&bulan=7&tanggal=23&tahun=2021', { method: 'GET' });
//------------------ FILTER CHATS ------------------//
			totalchat = await client.chats.all();
			client.groupChats = [];
			client.privateChats = [];
			for (let id of totalchat) {
			  id.jid.endsWith("@g.us") ? client.groupChats.push(id.jid) : "";
			  id.jid.endsWith("@s.whatsapp.net") ? client.privateChats.push(id.jid) : "";
			}
//------------------ GROUP METADATA ------------------//
			const isGroup = from.endsWith('@g.us');
			const groupMetadata = isGroup ? await client.groupMetadata(from) : '';
			const groupName = isGroup ? groupMetadata.subject : '';
//------------------ SECURITY ------------------//
			const isOwner = ownerNumber.includes(sender);
//------------------ SENDER IMAGE ------------------//
			try {
				profile = await client.getProfilePicture(_sender);
				senderUrl = await getBuffer(profile);
			} catch {
				senderUrl = `No Profile Picture!`;
			}
//------------------ FUNCTION ------------------//
			randomJson = (array) => {
				return array[Math.floor(Math.random() * array.length)];
			};
//------------------ CONSOLE.LOG HANDLER ------------------//
			const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() || body.slice(prefix.length).trim().split(/ +/).shift().toUpperCase();
			const multCmd = body.startsWith(prefix) ? prefix + command : "" || chats.startsWith("=>") ? "=>" : chats.startsWith("=<") ? "=<" : "";
			const q = chats.slice(command.length + 2, chats.length);
			if (!isGroup && multCmd) console.log(color('•  Private =>'), "Sender:", color(msg.key.fromMe ? "Self =>" : isOwner ? "Owner =>" : "Public =>"), "Command:", color(multCmd,'red') + color(" =>"), "Name:", color(pushname + " =>"), "Args:", color(q.length + " •")) ;
			if (multCmd && isGroup) console.log(color('•  Group =>'), "Sender:", color(msg.key.fromMe ? "Self =>" : isOwner ? "Owner =>" : "Public =>"), "Command:", color(multCmd,'red') + color(" =>"), "Name:", color(pushname + " =>"), "Args:", color(q.length + " =>"), "Group:", color(groupName + " •"));
			if (!multCmd && chats != undefined) {
				console.log(!isGroup ? color("• Private =>") : color("• Group =>"), "Sender:", color(msg.key.fromMe ? "Self =>" : isOwner ? "Owner =>" : "Public =>"), "Type:", color(type + " =>"), "Name:", isGroup ? color(pushname + " =>") : color(pushname + " •"), isGroup ? "Group: " + color(groupName + " •") : "" );
			}
//------------------ HELP LIST MENU's ------------------//
const memnu = `•  My Info  •
+=> NAME: ${client.browserDescription[3]}
+=> NUMBER: @${_client.jid.split("@")[0]}
+=> BATTERAI: ${client.batterai.value !== undefined ? client.batterai.value + '%' : 'Waiting...'}
+=> CHARGER: ${client.batterai.stats !== undefined ? client.batterai.stats : 'Waiting...'}
+=> POWER SAVE: ${client.batterai.powersave !== undefined ? client.batterai.powersave : 'Waiting...'}
+=> UPTIME: ${kyun(os.uptime())}
+=> BROWSER: ${client.browserDescription[5]}
+=> LIB: ${client.browserDescription[4]}
+=> VERSI : ${client.browserDescription[2]}
+=> HOSTNAME: ${os.hostname()}
+=> Whatsapp Version: ${wa_version}
+=> RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
+=> MCC: ${mcc}
+=> MNC: ${mnc}
+=> OS VERSION: ${os_version}
+=> OS TYPE: ${os.type()}
+=> PLATFORM: ${os.platform()}
+=> DEVICE BRAND: ${device_manufacturer}
+=> OS BUILD: ${os_build_number}
+=> DEVICE MODEL: ${device_model}
+=> RUNTIME: ${_runtime}
+=> SPEED: ${_speed.toFixed(4)}s
+=> GROUP CHAT: ${client.groupChats.length} Groups
+=> PRIVATE CHAT: ${client.privateChats.length} Chats
+=> TOTAL CHAT: ${client.privateChats.length + client.groupChats.length} Id's length

•  Date  •
+=> ${_date}

•  Your Info  •
+=> Name: ${pushname}
+=> Number: wa.me/${_sender}

• Count Down •
+=> Tahun Baru: 
< ${_tahunbaru.data.result} />
+=> Idul Adha: 
< ${_iduladha.data.result} />

•  Command  •
=> ${prefix}term
=> "=>"
=> "=<"

• Source Code •
+=> Script:
< https://github.com/dehan-j1ng/De-BOTZ />

• Note Owner •
+=> Total Charger Info:
< ${client.batterai.note !== undefined ? client.batterai.note : 'Waiting...'} />

•  Thanks To  •
+=> Dehanjing`;
//------------------ COMMAND FEATURES ------------------//
			switch(command) {
				case 'help':
					await client.sendImageFake(from, client.fakethumb, msg, memnu, senderUrl, 100, [_client.jid]);
					break;
					case 'term':
						case 'exec':
							if (!q) return client.reply(from, 'Text?', msg);
							if (!isOwner) return client.reply('only owner');
							require("child_process").exec(q, (err, stdout) => {
								if (err) return client.sendFakeStatus(from, '```' + `${err}` + '```');
								if (stdout) {
									client.sendFakeStatus(from, stdout, `•  EXEC  •`, sender);
								}
							});
							break;
					case 'komiku-search':
						if (!q) return client.reply(from, 'Search?', msg);
							KomikuSearch(q).then(async(res)=> {
								buff = await getBuffer(res[0].manga_thumb);
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•";
								teks += `\nManga: ${res[0].manga}\n`;
								teks += `Description: ${res[0].manga_desc}\n`;
								teks += `Chapter Pertama: ${res[0].chapter.pertama}\n`;
								teks += `Chapter Terbaru: ${res[0].chapter.terbaru}\n`;
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•";
								client.sendImageCaption(from, buff, msg, teks);
							});
							break;
					case 'mangaku-search':
						if (!q) return client.reply(from, 'Search?', msg)
							MangakuSearch(q).then(async(res) => {
								buff = await getBuffer(res[0].manga_thumb)
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								teks += `\nManga: ${res[0].manga_name}\n`
								teks += `Manga Eps: ${res[0].manga_eps}\n`
								teks += `Manga Rating: ${res[0].manga_rating}\n`
								teks += `•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•`
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
					case 'klikmanga-search':
						if (!q) return client.reply(from, 'Search?', msg)
							KlikMangaSearch(q).then(async(res) => {
							no = 0
							for (let i of res) {
								no += 1
								buff = await getBuffer(i.manga_thumb)
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								teks += `\n• Urutan: ${no.toString()} •\n`
								teks += `Manga: ${i.manga_name}\n`
								teks += `Description: ${i.manga_desc}\n`
								teks += `Statues: ${i.manga_status}\n`
								teks += `Release: ${i.manga_release}\n`
								teks += `Genre's: ${i.manga_genre}\n`
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							}
							})
							break
					case 'cnn-news':
						CNNNews().then(res => {
							no = 0
							teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							for (let i of res) {
								no += 1
								teks += `\n• ${no.toString()} •\n`
								teks += `Berita: ${i.berita}\n`
								teks += `Link: ${i.berita_url}\n`
							}
							teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							client.reply(from, teks, msg)
						})
						break
						case 'layarkaca-search':
							if (!q) return client.reply(from, "Film?", msg)
							LayarKaca21(q).then(async(res) => {
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
								  no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Film: ${i.film_title}\n`
									teks += `Link: ${i.film_link}\n`
								}
								teks += `•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•`
								client.reply(from, teks, msg)
							})
							break
						case 'palingmurah-search':
							if (!q) return client.reply(from, 'vps?, rdp?', msg)
							PalingMurah(q).then(async(res) => {
								no = 0
								for (let i of res) {
									no += 1
									buff = await getBuffer(i.product_image)
									teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									teks += `\n• ${no.toString()} •\n`
									teks += `Product: ${i.product}\n`
									teks += `Description: ${i.product_desc}\n`
									teks += `Price: ${i.price}\n`
									teks += `Link: ${i.product_url}\n`
									teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									await client.sendImageCaption(from, buff, msg, teks)
								}
							})
							break
						case 'cnbc-news':
							CNBCNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'tribun-news':
							TribunNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'indozone-news':
							IndozoneNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'kumparan-news':
							KumparanNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'kompas-news':
							KompasNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'detik-news':
							DetikNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'daily-news':
							DailyNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'metro-news':
							metroNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'inews-news':
							iNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'okezone-news':
							OkezoneNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'fajar-news':
							FajarNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'sindo-news':
							SindoNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'tempo-news':
							TempoNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'antara-news':
							AntaraNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'republika-news':
							RepublikaNews().then(async(res) => {
								buff = await getBuffer(res[0].berita_thumb)
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Berita: ${i.berita}\n`
									teks += `Upload: ${i.berita_diupload}\n`
									teks += `Jenis: ${i.berita_jenis}\n`
									teks += `Link: ${i.berita_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.sendImageCaption(from, buff, msg, teks)
							})
							break
						case 'animeplanet-search':
							if (!q) return client.reply(from, 'Search?', msg)
							AniPlanetSearch(q).then(async(res) => {
								no = 0
								for (let i of res) {
									no += 1
									teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									buff = await getBuffer(i.manga_thumb)
									teks += `\n• Urutan: ${no.toString()} •\n`
									teks += `Manga: ${i.manga_name}\n`
									teks += `Link: ${i.manga_url}\n`
									teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									client.sendImageCaption(from, buff, msg, teks)
								}
							})
							break
						case 'komikfox-search':
							if (!q) return client.reply(from, 'Search?', msg)
							KomikFoxSearch(q).then(async(res) => {
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• Urutan: ${no.toString()} •\n`
									teks += `Manga: ${i.manga_name}\n`
									teks += `Release: ${i.manga_release}\n`
									teks += `Link: ${i.manga_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.reply(from, teks, msg)
							})
							break
						case 'komikstation-search':
							if (!q) return client.reply(from, 'Search?', msg)
							KomikStationSearch(q).then(async(res) => {
								no = 0
								for (let i of res) {
									no += 1
									buff = await getBuffer(i.manga_thumb)
									teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									teks += `\n• Urutan: ${no.toString()} •\n`
									teks += `Manga: ${i.manga_name}\n`
									teks += `Chapter: ${i.manga_eps}\n`
									teks += `Link ${i.manga_url}\n`
									teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									client.sendImageCaption(from, buff, msg, teks)
								}
							})
							break
						case 'kiryuu-search':
							if (!q) return client.reply(from, 'Search?', msg)
							KiryuuSearch(q).then(async(res) => {
								no = 0
								for (let i of res) {
									no += 1
									buff = await getBuffer(i.manga_thumb)
									teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									teks += `\n• Urutan: ${no.toString()} •\n`
									teks += `Manga: ${i.manga_name}\n`
									teks += `Rating: ${i.manga_rating}\n`
									teks += `Chapter: ${i.manga_eps}\n`
									teks += `Link: ${i.manga_url}\n`
									teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
									client.sendImageCaption(from, buff, msg, teks)
								}
							})
							break
						case 'kissmanga-search':
							if (!q) return client.reply(from, 'Search?', msg)
							KissMangaSearch(q).then(async(res)=>{
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• Urutan: ${no.toString()} •\n`
									teks += `Manga: ${i.manga_name}\n`
									teks += `Link: ${i.manga_url}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.reply(from, teks, msg)
							})
							break
						case 'aminoapps-search':
							if (!q) return client.reply(from, 'Search?', msg)
							AminoApps(q).then(res => {
								no = 0
								teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								for (let i of res) {
									no += 1
									teks += `\n• ${no.toString()} •\n`
									teks += `Community: ${i.community}\n`
									teks += `Desc: ${i.community_desc}\n`
									teks += `Link: ${i.community_link}\n`
								}
								teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
								client.reply(from, teks, msg)
							})
							break
						case "mangatoon-search":
						  if (!q) return client.reply(from, "Search?", msg)
						  Mangatoon(q).then(async (res) => {
						    no = 0
						    for (let i of res) {
						      buff = await getBuffer(i.comic_thumb)
						      no += 1
						      teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						      teks += `\n• Urutan: ${no.toString()} •\n`
						      teks += `Comic: ${i.comic_name}\n`
						      teks += `Type: ${i.comic_type}\n`
						      teks += `Link: ${i.comic_url}\n`
						      teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						      client.sendImageCaption(from, buff, msg, teks)
						    }
						  })
						  break
						case "viva-news":
						  VivaNews().then(async (res) => {
						    buff = await getBuffer(res[0].berita_thumb)
						    teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    no = 0
						    for (let i of res) {
						      no += 1
						      teks += `\n• ${no.toString()} •\n`
						      teks += `Berita: ${i.berita}\n`
						      teks += `Jenis: ${i.berita_jenis}\n`
						      teks += `Upload: ${i.berita_diupload}\n`
						      teks += `Link: ${i.berita_url}\n`
						    }
						    teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    client.sendImageCaption(from, buff, msg, teks)
						  })
						  break
						case "kontan-news":
						  KontanNews().then(async (res) => {
						    buff = await getBuffer(res[0].berita_thumb)
						    teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    no = 0
						    for (let i of res) {
						      no += 1
						      teks += `\n• ${no.toString()} •\n`
						      teks += `Berita: ${i.berita}\n`
						      teks += `Jenis: ${i.berita_jenis}\n`
						      teks += `Upload: ${i.berita_diupload}\n`
						      teks += `Link: ${i.berita_url}\n`
						    }
						    teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    client.sendImageCaption(from, buff, msg, teks)
						  })
						  break
						case "merdeka-news":
						  MerdekaNews().then(async (res) => {
						    buff = await getBuffer(res[0].berita_thumb)
						    teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    no = 0
						    for (let i of res) {
						      no += 1
						      teks += `\n• ${no.toString()} •\n`
						      teks += `Berita: ${i.berita}\n`
						      teks += `Upload: ${i.berita_diupload}\n`
						      teks += `Link: ${i.berita_url}\n`
						    }
						    teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    client.sendImageCaption(from, buff, msg, teks)
						  })
						  break
						case "wamods-search":
						  if (!q) return client.reply(from, "Search?", msg)
						  WAModsSearch(q).then(async (res) => {
						    no = 0
						    for (let i of res) {
						      no += 1
						      buff = await getBuffer(i.apk_image)
						      teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						      teks += `\n• Urutan: ${no.toString()} •\n`
						      teks += `Apk: ${i.apk_name}\n`
						      teks += "Description:\n"
						      teks += `${i.apk_desc}\n`
						      teks += `Link: ${i.apk_url}\n`
						      teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						      client.sendImageCaption(from, buff, msg, teks)
						    }
						  })
						  break
						case "emoji-image":
						  if (!q) return client.reply(from, "Search?", msg)
						  Emojis(q).then(async (res) => {
						    no = 0
						    for (let i of res.unicode_pack) {
						      buff = await getBuffer(i.vendor_thumb)
						      no += 1
						      teks = "Unicode Description:\n"
						      teks += `${res.unicode_desc}\n`
						      teks += "\n•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						      teks += `\n• List: ${no.toString()} •\n`
						      teks += `Vendor: ${i.vendor_name}\n`
						      teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						      client.sendImageCaption(from, buff, msg, teks)
						    }
						  })
						  break
						case "coronainfo":
						  if (!q) return client.reply(from, "Negara?", msg)
						  CoronaInfo(q).then(res => {
						    teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    teks += `\nNegara: ${res.negara}\n`
						    teks += `Informasi: ${res.informasi}\n`
						    teks += `Total Kasus: ${res.total_kasus}\n`
						    teks += `Total Kematian: ${res.total_kematian}\n`
						    teks += `Total Sembuh: ${res.total_sembuh}\n`
						    teks += `Link: ${res.informasi_lengkap}\n`
						    teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
						    client.reply(from, teks, msg)
						  })
						  break
						case "quotes":
							var res = await Quotes()
							teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							teks += `\nAuthor: ${res.author}\n`
							teks += `\nQuotes:\n`
							teks += `${res.quotes}\n`
							teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							client.reply(from, teks, msg)
							break
						case "cerpen":
						  var res = await Cerpen()
							teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							teks += "\nCerpen:\n\n"
							teks += res + "\n"
							teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							client.reply(from, teks, msg)
							break
						case "couple":
							var res = await Couples()
							female = await getBuffer(res.female)
							male = await getBuffer(res.male)
							teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							teks += "\nMale & Female\n"
							teks += "Couple Wallpaper\n"
							teks += `Male Source: ${res.male}\n`
							teks += `\nFemale Source: ${res.female}\n`
							teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							male = await client.sendImageCaption(from, male, msg, teks)
							client.sendImageCaption(from, female, male, teks)
							break
						case "darkjoke":
							var res = await Darkjokes()
							buff = await getBuffer(res)
							teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							teks += "\nDarkjokes?\n"
							teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							client.sendImageCaption(from, buff, msg, teks)
							break
						case "jalantikus-meme":
						  var res = await JalanTikusMeme()
							buff = await getBuffer(res)
							teks = "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							teks += "\nNgakak?\n"
							teks += `\nSource: ${res}\n`
							teks += "•°•°•°•°•°•°•°•°••°•°•°•°•°•°•°•°•"
							client.sendImageCaption(from, buff, msg, teks)
							break
						default:
						if (chats.startsWith('=<')) {
							if (!isOwner) return client.reply(from, '• Only Owner •', msg)
							if (!q) return client.reply(from, 'Text?', msg)
							try {
								client.reply(from, util.format(eval(`(async() => { ${q} } )()`)), msg)
							} catch (e) {
								console.log(color('• Error •'), color(e, 'red'))
								client.reply(from, '```' + String(e) + '```', msg)
							}
						}
						if (chats.startsWith('=>')) {
							if (!isOwner) return client.reply(from, '• Only Owner •', msg)
							if (!q) return client.reply(from, 'Text?', msg)
							try {
								evaled = await eval(q)
								if (typeof evaled !== 'string')
								evaled = require('util').inspect(evaled)
								await client.reply(from, evaled, msg)
							} catch (e) {
								console.log(color('• Error •'), color(e, 'red'))
								client.reply(from, '```' + util.format(String(e)) + '```', msg)
							}
						}
			}
		} catch (e) {
			e = String(e)
			if (!e.includes("this.isZero")) {
				console.log(color(_date, "white"), color("•  ERROR  •", "aqua"), color(e, 'red'));
			}
		}
	})

/*
 *
 * De-BOTZ - an example script for whatsapp bot
 * - 14/06/21 -
 * @dehan_j1ng
 * More Features? chat me via WhatsApp
 * https://wa.me/6281342474954
 *
 */