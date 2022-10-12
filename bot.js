// require your telegram bot API Key in .env
require("dotenv").config();
const token = process.env.BOT_TOKEN;

const telegraf = require("telegraf");
const { Command } = require("./command.js");
const cmd = require("node-cmd");
const command = new Command();

const bot = new telegraf(token);

// command
bot.start((ctx) => ctx.reply("hi"));
bot.help((ctx) => ctx.reply("this is dirandra bot"));
bot.command("desc", (ctx) => ctx.reply("this bot development by satria"));
bot.command("myprofile", (ctx) => {
  const profile = ctx.from;

  ctx.reply(
    `your name : ${profile["first_name"]}
         your username : ${profile["username"]},
         are you a bot? : ${profile["bot"] ? "yes" : "no"},
         your country code : ${profile["language_code"]}
        `,
  );
});
bot.command("deleteMessage", (ctx) => ctx.deleteMessage());
bot.command("whoami", (ctx) => {
  ctx.replyWithPhoto("https://i.pinimg.com/originals/a0/1c/46/a01c46ba0109b58d5335548f8d44c718.jpg");
  ctx.reply("it's you");
});

bot.command("/shutdown", (ctx) => {
  ctx.reply("processing to shutdown your pc");
  cmd.run("shutdown /s /t 10");
});

bot.command("/jokes", async (ctx) => {
  ctx.reply("tunggu sebentar ya");
  ctx.reply(await command.joke());
  ctx.reply("xixixi");
});

bot.command("/jokes_gambar", async (ctx) => {
  ctx.reply("tunggu sebentar ya");
  ctx.replyWithPhoto(await command.jokeImage());
  ctx.reply("xixixi");
});

bot.command("/jadwal", async (ctx) => {
  ctx.reply(command.schedule());
  ctx.reply(`
  Semangat Kuliah yaa ^_^
  `);
});

// recheived message
bot.on("text", async (ctx) => {
  ctx.reply(await command.simsimiChat(ctx.update.message.text));
});
bot.on(["photo", "video"], (context) => context.replyWithPhoto("data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="));
bot.on("sticker", (ctx) => ctx.replyWithPhoto("https://i.pinimg.com/originals/a0/1c/46/a01c46ba0109b58d5335548f8d44c718.jpg"));

// samarkan identitas si pengirim pesan
function hashedId(msg) {
  // dapatkan tanggal pesan agar tidak perlu berurusan dengan locale
  var d = new Date(msg.date);
  // kalikan tahun dengan bulan dan tanggal
  var rnd = d.getFullYear() * d.getMonth() * d.getDate();
  // kurangi user_id oleh hasil perkalian di atas
  var userId = msg.from.id - rnd;
  // hash hasil pengurangan di atas untuk menyamarkan identitas pengirim pesan
  return hash(userId.toString());
}

bot.launch();
// https://api.telegram.org/bot1112940978:AAGRv0LcgnmWzVRyVrxxHtIRE4-QU3OjyF0/getUpdates
