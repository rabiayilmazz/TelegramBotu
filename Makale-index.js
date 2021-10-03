//**********************************
	// Api eklenir.
	var telegram = require('telegram-bot-api');	

	// Apimize gerekli JSON yollanır.
	var api = new telegram({
		token: 'TOK:EN',
		updates: {
			enabled: true,
			get_interval: 1000
		}
	});

	// "Message" gelirse çalışmaısnı istediğimiz fonksiyonu yazıyoruz.
	api.on('message', function(message) {
		if (message.text != "" && message.text != undefined) {
			var response = "Sen : " + message.text + " içerikli mesaj attın!";  // Gelen mesajı göndereceğimiz string.
			
			// Gelen chat id'yi okuyoruz ilgili chat id ye gitsin diyoruz. A grubundan okunan mesajın
			// B grubuna gitmesini istemeyiz :)
			// reply_to_message_id ise reply olarak cevaplamak için ekliyoruz.
			api.sendMessage({
				reply_to_message_id:message.message_id,
				chat_id: message.chat.id,
				text: response
			})
			.then(function(message)
			{
				// Mesaj gönderildikten sonra. veya bilgi alma da
			})
			.catch(function(err)
			{
				console.log(err);
			});
		}
	});
