const TELEGRAM_BOT_TOKEN = '7603386640:AAGpe3IDJbE2WgoDuvVuv8qoiTeyHgnBNfE';

async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
  };

  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/webhook') {
      const update = await request.json();
      const message = update.message;

      if (message?.text?.startsWith('/test')) {
        const chatId = message.chat.id;

        await sendMessage(chatId, 'hello for you');
      }

      return new Response('OK');
    }

    return new Response('Not Found', { status: 404 });
  }
};
