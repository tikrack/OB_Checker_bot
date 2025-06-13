const TELEGRAM_BOT_TOKEN = '7603386640:AAGpe3IDJbE2WgoDuvVuv8qoiTeyHgnBNfE';
const ABOUT_TEXT = `
سلام خوبی؟
من یه ربات سادم که خیلی سریع نوشته شدم
کارمم که معاومه دیگه سوال نداره اصلا نمیدونم چرا این دکمه رو زدی
حالا به هر حال

من رو @tikrack 👨🏼‍💻 ساخته اگرم خواستی کد هامو ببینی:
https://github.com/tikrack/OB_Checker_bot

اره خلاصه چاکریم ✨🍓
`

const OB_TEXT = [
  "این فرد اوبی خیلی زیاد است! ❌",
  "این فرد پاک پاک و پر از تیتسترون است! ✅"
];

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
  };

  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export default {
  async fetch(request) {
    if (request.method === 'POST') {
      const update = await request.json();
      const message = update.message;
      const chatId = message?.chat?.id;

      if (!message?.text?.startsWith('/ob') && !message?.text?.startsWith('/about')) {
        return new Response('Ignored');
      }

      if (message?.text?.startsWith("/ob")) {
        const args = message.text.trim().split(" ");
        const username = args[1];

        if (!username || !username.startsWith("@")) {
          await sendMessage(chatId, `مرتیکه خر میخاری؟ اینجوری باید وارد کنی\n<code>/ob @username</code>`);
          return new Response('No username provided');
        }


        if (username.length < 9) {
          await sendMessage(chatId, OB_TEXT[1]);
        }else {
          await sendMessage(chatId, OB_TEXT[0]);
        }

        return new Response('OK');
      }

      if (message?.text?.startsWith("/about")) {
        await sendMessage(chatId, ABOUT_TEXT);

        return new Response('OK');
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
