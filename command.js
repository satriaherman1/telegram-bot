const axios = require("axios");
require("dotenv").config();

class Command {
  constructor() {}

  async joke() {
    const jokes = await axios.get(`${process.env.JOKE_API}/api/text/random`);
    return jokes.data.data;
  }

  schedule() {
    return `Senin, 12:30 - 14:10 = Dasar Sistem Informasi
Rabu, 10:00 - 12:30 = Dasar Infrastruktur Teknologi Informasi
Rabu, 12:30 - 14:10 = Bahasa Inggris
Rabu, 14:30 - 15:50 = Matematika Diskrit
Kamis, 07:30 - 09:10 = Data Science For Business
Kamis, 10:00 - 12:30 = Dasar-Dasar Pemrograman
Kamis, 14:10 - 15:50 = Pengantar Bisnis dan Manajemen
Jum'at, 07:30 - 09:10 = Pancasila
Sabtu, 08:30 - 10:00 = Aplikasi Komputer Bisnis



     `;
  }

  async jokeImage() {
    const jokes = await axios.get(`${process.env.JOKE_API}/api/image/random`);
    return jokes.data.data.url;
  }
}

module.exports = { Command };
