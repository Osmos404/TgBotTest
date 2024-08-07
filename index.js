
const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '6791133251:AAGDjpw_xnZgLd82qbjE2J9bJOdRuuXfIDQ'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

// const gameOptions = {
//     reply_markup: JSON.stringify({
//         // Содержит массив объектов, массив кнопок
//         inline_keyboard: [
//             [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
//             [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
//             [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
//             [{text: '0', callback_data: '0'}],
//         ]
//     })
// }


// const againOptions = {
//     reply_markup: JSON.stringify({
//         // Содержит массив объектов, массив кнопок
//         inline_keyboard: [
//             [{text: 'Играть еще раз', callback_data: '/again'}],
//         ]
//     })
// }

const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты её угадать:')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}


const start = () => {

    bot.setMyCommands([
        {command: '/start', description: "Начальное приветсвие"},
        {command: '/info', description: "Информация о пользователе"},
        {command: '/game', description: "Игра угадай цифру"},
    ])
    
    // Первый параметр сообщение, второй параметр callbacks
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const data = msg.data;
        if (data === '/again') {
            return startGame(chatId);
        }
        if  (text === '/start') {
            // bot.sendSticker(chatId, 'Сюда ссылку на стикер')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграмм бот`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут: ${msg.chat.first_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }

        // Отправить сообщение если пользователя не понимает:
        return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!`)
    
        // bot.sendMessage(chatId, `Ты написал мне: ${text}`)
        // console.log(msg);
    })
    //Прослушивание кнопок:

    bot.on('callback_query', async msg => {
        const data = msg.data;
        // const data = parseInt(msg.data);
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру: ${chats[chatId]}`, againOptions);
   
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру: ${chats[chatId]}`, againOptions)
    }});

}


start()



// const TelegramBot = require('node-telegram-bot-api');
//     const token = '6791133251:AAGDjpw_xnZgLd82qbjE2J9bJOdRuuXfIDQ';
//     const bot = new TelegramBot(token, { polling: true }); 


// const { FFI } = require('ffi');
//   const ref = require('ref');
//   const { promisify } = require('util');

//   // Загрузка Alpaca
//   const alpacaLib = new FFI.Library('lib/libalpaca.so', { // Путь к библиотеке Alpaca
//       'alpaca_predict': ['int', ['pointer', 'string', 'int', 'pointer']]
//   });

//   // Функция для получения ответа от Alpaca
//   async function alpacaPredict(prompt, temperature = 0.7) {
//       const buffer = new Buffer.alloc(1024 * 1024); // Зарезервируем буфер для ответа
//       const result = alpacaLib.alpaca_predict(ref.alloc('pointer'), prompt, temperature, buffer);
//       const response = buffer.toString('utf8', 0, result); 
//       return response;
//   }



//   bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     try {
//         const response = await alpacaPredict(text); // Получаем ответ от Alpaca
//         await bot.sendMessage(chatId, response);
//     } catch (error) {
//         console.error(error);
//     }
// });











