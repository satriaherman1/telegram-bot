const axios = require('axios')
require("dotenv").config()

class Command{
   constructor(){

   }

   async joke(){
    const jokes=  await axios.get(`${process.env.JOKE_API}/api/text/random`)
    return jokes.data.data;
   }
}

module.exports = {Command}