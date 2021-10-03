//**********************************
	// API eklenir.
	const telegram = require('telegram-bot-api');

	// Token eklenir.
	const BOT_TOKEN = 'TOK:EN';

	// API'ye gerekli bilgiler JSON ile yollanır.
	const api = new telegram({
		token: BOT_TOKEN,
		updates: {
			enabled: true,
			get_interval: 1000
		}
	});

	// Mesaj sağlayıcısı tanımlanır.
	const mp = new telegram.GetUpdateMessageProvider();

	// Mesaj sağlayıcısı belirtilir ve API başlatılır.
	api.setMessageProvider(mp)
	api.start()
	.then(() => {
		console.log('Bot başlatıldı.')
	})
	.catch(console.err); // Hata varsa yazdırılır.

	// "Message" gelirse çalışmasını istediğimiz fonksiyonu yazıyoruz.
	api.on('update', (update) => {
		const message = update.message.text;

		if (message != "" && message != undefined) {

			var response = "Sen : " + message + " içerikli mesaj attın!"; // Gelen mesajı göndereceğimiz string.
			// Gelen chat id'yi okuyoruz ilgili chat id ye gitsin diyoruz. A grubundan okunan mesajın
			// B grubuna gitmesini istemeyiz :)
			const chat_id = update.message.chat.id

			// reply_to_message_id ise reply olarak cevaplamak için ekliyoruz.
			api.sendMessage({
					chat_id: chat_id,
					reply_to_message_id: update.message.message_id,
					text: response
			})
			.then(() => {
				// Mesaj gönderildikten sonra. veya bilgi alma da
				console.log("Mesaj başarıyla yollandı.");
			})
			.catch(console.err);
		}
	});
