import 'dotenv/config.js';
import {Bot, Keyboard, HttpError, GrammyError} from "grammy";
import axios from "axios";
const API_KEY = '4fd6e0f81f45bb5f9f805d940c4f7cf7';
const bot = new Bot("6309161283:AAFMPN9CRFuqwH_QEysxJLltuxpRk6O1dto");

bot.command("start", (ctx) => {
  ctx.reply("Цей телеграм-бот дозволяє отримати актуальну погодну інформацію для будь-якого міста. Просто відправте назву міста, і бот надішле вам інформацію про погоду на день.")
});

bot.on("message:text", async (ctx) => {
  const city_name = ctx.message.text;
  console.error(city_name);
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=metric&lang=uk`);
    const weather = response.data;
    
    const sky_state = weather.weather[0].description;
    const temperature = weather.main.temp;
    const feel_like = weather.main.feels_like;
    const wind_speed = weather.wind.speed;
    const wet = weather.main.humidity;
    const atmospheric_pressure= weather.main.pressure;
    
    const weather_message = `Погода ${city_name}: \n\nСьогодні: \nСтан неба: ${sky_state} \nТемпература: ${temperature}°C 🌡️ \nВідчувається як: ${feel_like}°C \nШвидкість вітру: ${wind_speed} м/с \nВологість: ${wet}% \nАтмосферний тиск: ${atmospheric_pressure} мм рт. ст.`;
    
    ctx.reply(weather_message);
  } catch (error) {
    console.error(error);
    ctx.reply("Не вдалося отримати погоду. Будь ласка, спробуйте ще раз.");
  }
});

bot.start();

