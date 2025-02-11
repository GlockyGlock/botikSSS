require('dotenv').config();
const { Bot, GrammyError, HttpError, InlineKeyboard } = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');
const nodemailer = require('nodemailer');

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Перезапустить бота'
    }
])
// Конфигурация почтового транспорта
const transporter = nodemailer.createTransport({
    service: 'Yandex', 
    auth: {
        user: process.env.EMAIL_USER, // Ваш email
        pass: process.env.EMAIL_PASS, // Пароль или app password
    },
});

bot.command('bsrqacelbmcfkofupwtd', async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length < 3) {
        ctx.reply('Использование: /bsrqacelbmcfkofupwtd <номер_заказа> <новый_статус>');
        return;
    }

    const orderNumber = parseInt(args[1], 10);
    const newStatus = args.slice(2).join(' ');


    // обнова статуса заказа в базе данных
    db.run(
        `UPDATE orders SET status = ? WHERE orderNumber = ?`,
        [newStatus, orderNumber],
        (err) => {
            if (err) {
                console.error('Ошибка при обновлении статуса:', err);
                ctx.reply('Произошла ошибка при обновлении статуса.');
                return;
            }

            ctx.reply(`Статус заказа №${orderNumber} изменен на "${newStatus}".`);
        }
    );
});

// Клавиатуры
const menuKeyboard = new InlineKeyboard()
    .text('🛍️ Оформить заказ', 'order-button').row()
    .text('🔢 Калькулятор стоимости', 'calc-button').row()
    .text('👤 Оформить заказ через администратора', 'adminorder-button').row()
    .text('⁉️ Популярные вопросы', 'faq-button').row()
    .text('📍 Отследить свой заказ', 'track-button').row()
    .text('📞 Поддержка', 'contacts-button').row()
    .text('🔄 Возврат товара', 'ref-button').row()
    .url('🗣️ Отзывы наших клиентов', 'https://t.me/presentlystreetreviews').row()
    .url('📣 Наш тг-канал', 'https://t.me/presentlystreet').row()
    .url('📱 Скачать Poizon (Android)', 'https://apkpure.net/poizon-authentic-fashion/com.shizhuang.poizon.hk?ysclid=m64bfngrfp851378030').row()
    .url('📱 Скачать Poizon (iOS)', 'https://apps.apple.com/ru/app/%E5%BE%97%E7%89%A9-%E5%BE%97%E5%88%B0%E8%BF%90%E5%8A%A8x%E6%BD%AE%E6%B5%81x%E5%A5%BD%E7%89%A9/id1012871328').row()
    .url('🎙️ Сообщество Presently', 'https://t.me/presently812').row();

const faqKeyboard = new InlineKeyboard()
    .text('❓ Что такое Poizon?', 'poizon-button').row()
    .text('💹 Какая у Вас коммисия?', 'howmuchkomka').row()
    .text('🥷 Почему товар пришел без пломб и сертификат без QR кода?', 'plomba').row()
    .text('🌍 В какие страны осуществляется доставка?', 'country').row()
    .text('📏 Как мне подобрать размер?', 'howtosize').row()
    .text('🗓️ Сколько будет идти мой заказ?', 'delivertime').row()
    .text('⬅️ Вернутся в главное меню', 'backtomenu').row();


const clothesKeyboard = new InlineKeyboard()
    .text('👟 Обувь', 'shoes').row()
    .text('🧥 Верхняя одежда', 'wear').row()
    .text('👕 Футболка', 'tishka')
    .text('👖 Штаны', 'pants').row()
    .text('👙 Нижнее бельё', 'under-pants').row()
    .text('👜 Сумки и рюкзаки', 'bags').row()
    .text('📱 Электроника', 'electronic').row()
    .text('⌚ Аксесуары', 'accessories').row()
    .text('🧴 Духи и косметика', 'duhi').row()
    .text('⬅️ Вернутся в главное меню', 'backtomenu').row();

    const CALCclothesKeyboard = new InlineKeyboard()
    .text('👟 Обувь', 'CALCshoes').row()
    .text('🧥 Верхняя одежда', 'CALCwear')
    .text('👕 Футболка', 'CALCtishka').row()
    .text('👖 Штаны', 'CALCpants').row()
    .text('👙 Нижнее бельё', 'CALCunder-pants').row()
    .text('👜 Сумки и рюкзаки', 'CALCbags').row()
    .text('📱 Электроника', 'CALCelectronic').row()
    .text('⌚ Аксесуары', 'CALCaccessories').row()
    .text('🧴 Духи и косметика', 'CALCduhi').row()
    .text('⬅️ Вернутся в главное меню', 'backtomenu').row();

const btbKeyboard = new InlineKeyboard()
    .text('✅ Я проверил, всё подходит', 'check-requirements').row()
    .text('❌ Мой товар не проходит', 'backtomenu').row();

const confirmKeyboard = new InlineKeyboard()
    .text('✅Все верно, готов оплатить', 'confirm-data').row()
    .text('❌Исправить данные', 'edit-data').row();

const backkeyboard = new InlineKeyboard()
.text('⬅️ Вернутся в главное меню', 'backtomenu').row();
// Переменная для хранения данных пользователя
const userSession = {};

// Команды
bot.command('start', async (ctx) => {
    await ctx.reply('Добро пожаловать в бот PresentlyStreet! Мы поможем Вам доставить вашу посылку из любой китайской площадки (Poizon, taobao и др.)', {
        reply_markup: menuKeyboard,
    });
});


bot.callbackQuery('faq-button', async (ctx) => {
    await ctx.reply ('Выберите интересующий вас вопрос', {
        reply_markup: faqKeyboard,
    })
})

//Обработчики FAQ
bot.callbackQuery('poizon-button', async (ctx) => {
    const poizonbuttonTEXT = `
*Poizon* - это китайский fashion-маркетплейс. Здесь можно купить:
- 👟 *кроссовки*
- 🧥 *одежду*
- 👙 *нижнее бельё*
- 👜 *сумки и аксессуары*
- 📱 *электронику*
- ⌚ *аксесуары*

На Poizon представлены популярные модели, например:
- _New Balance 574_ за примерно за *7300₽* (на 13000₽ дешевле, чем в России!)

💡 У *Poizon* есть система проверки подлинности товара — *Legit Check*.

👜 Площадка также предлагает люксовые бренды, такие как:
*Gucci, Prada, Louis Vuitton* и другие.
    `;

    await ctx.callbackQuery.message.editText(poizonbuttonTEXT, {
        parse_mode: 'Markdown',
        reply_markup: faqKeyboard,
    });
    await ctx.answerCallbackQuery();
});
bot.callbackQuery('howmuchkomka', async (ctx) => {
    const howmuchkomkaTEXT = `
К сожалению, мы не можем дать Вам информацию о нашей коммисии. 
*Но мы уверяем, что вы платите низкую коммисию на рынке за качественный сервис!*
    `;
    await ctx.callbackQuery.message.editText(howmuchkomkaTEXT, {
        parse_mode: 'Markdown',
                reply_markup: faqKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('plomba', async (ctx) => {
    const plombaTEXT = `
В определенных случаях товары могут приходить без пломб, а на сертификатах вместо QR-кода будет указан штрих-код.

Это связанно с тем, что товар приобретен площадкой напрямую с заводы у производителя.

Так же причина этому может послужить товар, право производства которого есть у самой площадки POIZON. Такие товары не нуждаются в _Легитчеке_.
    `;
    await ctx.callbackQuery.message.editText(plombaTEXT, {
        parse_mode: 'Markdown',
                reply_markup: faqKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('country', async (ctx) => {
    const countryTEXT = `
Мы осуществляем доставку по России, Казахстану и Беларуси. Так же у нас работает курьерская доставка Санкт-Петербургу.
    `;
    await ctx.callbackQuery.message.editText(countryTEXT, {
        parse_mode: 'Markdown',
                reply_markup: faqKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('howtosize', async (ctx) => {
    const howtosizeTEXT = `
    Чтобы подобрать размер и точно не ошибиться, мы рекомендуем воспользоваться размерной сеткой у выбранного товара.
    Размерная сетка находится в середине страницы товара, под похожими товарами`;
        await ctx.callbackQuery.message.editText(howtosizeTEXT, {
        parse_mode: 'Markdown',
        reply_markup: faqKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('delivertime', async (ctx) => {
    const deliverTEXT = `
В среднем время доставки до склада в Санкт-Петербурге составляет 3-4 недели. 
Как только Ваш заказ поступает к нам на склад, и в этот же день мы отправляем его вам.

Всего существует 3 статуса доставки:
1) Оплачен покупателем и ожидает доставки на склад в Китае
2) Доставлен на склад в Китае и ожидает доставку в Россию
3) Отправлен в Ваш пункт СДЭК (в отслеживании заказа будет отображаться трек-номер)
`;
    await ctx.callbackQuery.message.editText(deliverTEXT, {
        parse_mode: 'Markdown',
                reply_markup: faqKeyboard,
    });
    await ctx.answerCallbackQuery();
});


// Обработчики калькулятора
bot.callbackQuery('calc-button', async (ctx) => {
    await ctx.callbackQuery.message.editText('С помощью калькулятора заказа вы сможете узнать итоговую стоимость товара с учетом доставки до склада в Санкт-Петербурге', {
        reply_markup: CALCclothesKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCshoes', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Обувь' };
    await ctx.reply('Вы выбрали категорию "Обувь". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCtishka', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Футболка' };
    await ctx.reply('Вы выбрали категорию "Футболка". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCaccessories', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Аксесуары' };
    await ctx.reply('Вы выбрали категорию "Аксесуары". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCwear', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Верхняя одежда' };
    await ctx.reply('Вы выбрали категорию "Верхняя одежда". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCunder-pants', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Нижнее бельё' };
    await ctx.reply('Вы выбрали категорию "Нижнее бельё". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCpants', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Штаны' };
    await ctx.reply('Вы выбрали категорию "Штаны". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCelectronic', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Электроника' };
    await ctx.reply('Вы выбрали категорию "Электроника". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCbags', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Сумки и рюкзаки' };
    await ctx.reply('Вы выбрали категорию "Сумки и рюкзаки". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('CALCduhi', async (ctx) => {
    userSession[ctx.chat.id] = { awaiting: 'calc-price', category: 'Духи и косметика' };
    await ctx.reply('Вы выбрали категорию "Духи и косметика". Укажите стоимость товара в юанях:');
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('order-button', async (ctx) => {
    await ctx.callbackQuery.message.editText('Пожалуйста, проверьте ваш товар! Товар не должен превышать 200 евро(1505 юаней) и его цена не должна быть указана ≈ (приблизительно). ДАННЫЕ ТОВАРЫ МЫ ДОСТАВИТЬ НЕ СМОЖЕМ!', {
        reply_markup: btbKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('check-requirements', async (ctx) => {
    await ctx.callbackQuery.message.editText('Заранее узнать стоимость товара с доставкой можно через калькулятор заказа. Выберите категорию:', {
        reply_markup: clothesKeyboard,
    });
    await ctx.answerCallbackQuery();
});
bot.callbackQuery('back-to-menu', async (ctx) => {
    await ctx.callbackQuery.message.editText('Добро пожаловать в бот PresentlyStreet! Мы поможем Вам доставить вашу посылку из любой китайской площадки (Poizon, taobao и др.)', {
        reply_markup: menuKeyboard,
    });
    await ctx.answerCallbackQuery();
});


bot.callbackQuery('backtomenu', async (ctx) => {
    await ctx.callbackQuery.message.editText('Добро пожаловать в бот PresentlyStreet! Мы поможем Вам доставить вашу посылку из любой китайской площадки (Poizon, taobao и др.)', {
        reply_markup: menuKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('ref-button', async (ctx) => {
const ordermanTEXT = `
⏳ С момента оплаты заказа у Вас есть *24 часа* на возврат средств.

⚠️ *МЫ НЕ ПРОДАЁМ ТОВАРЫ НАПРЯМУЮ, а предоставляем услуги по доставке товаров!!!*

📧 Для возврата пишите на почту: suppresentlystreet@gmail.com
`;
    await ctx.callbackQuery.message.editText(ordermanTEXT, {
        parse_mode: 'Markdown',
                reply_markup: menuKeyboard,
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('adminorder-button', async (ctx) => {
    const ordermanTEXT = `
Если вы препочитаете личное общение, то Вы всегда можете оформить заказ через администора. 
*График работы 10:00-22:00 по МСК.*
Оформить заказ - @masfuert9
`;
    await ctx.callbackQuery.message.editText(ordermanTEXT, {
        parse_mode: 'Markdown',
                reply_markup: menuKeyboard,
    });
    await ctx.answerCallbackQuery();
});

// Фото-примеры
bot.callbackQuery('shoes', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/uUCqgKtFoloPcA", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Обувь' };
});

bot.callbackQuery('tishka', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/u1eH2dAwVR6f4A", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Футболка' };
});

bot.callbackQuery('duhi', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/_IlFqphNVlKraw", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Духи и косметика' };
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('wear', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/RUB6edIPlfUiQg", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Верхняя одежда' };
});
bot.callbackQuery('pants', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/Bb5UpnwJWro3wQ", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Штаны' };
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('under-pants', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/xldHFAJKQNL38g", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Нижнее бельё' };
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('bags', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/9ZkyY4x-wlJtSQ", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Сумки и рюкзаки' };
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('electronic', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/16Lq9TTUVuPToQ", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Электроника' };
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('accessories', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/1dgA6lZ2qPSDiw", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Аксесуары' };
    await ctx.answerCallbackQuery();
});


bot.callbackQuery('contacts-button', async (ctx) => {
    const ordermanTEXT = `
Контакты службы поддержки:

*Телеграм администрации* @masfuert9

*Электронная почта поддержки* suppresentlystreet@gmail.com
`;
    await ctx.callbackQuery.message.editText(ordermanTEXT, {
        parse_mode: 'Markdown',
                reply_markup: menuKeyboard,
    });
    await ctx.answerCallbackQuery();
});


// Обработчик текстовых сообщений для калькулятора и оформления заказа
bot.callbackQuery('duhi', async (ctx) => {
    await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/_IlFqphNVlKraw", {
        caption: "Пришлите фото товара как показано в сообщении",
    });
    userSession[ctx.chat.id] = { awaiting: 'photo', category: 'Духи и косметика' };
    await ctx.answerCallbackQuery();
});

bot.on('message:text', async (ctx) => {
    const chatId = ctx.chat.id;
    const session = userSession[chatId];
    const text = ctx.message.text;

    if (session && session.awaiting === 'calc-price') {
        const userInput = parseFloat(text.replace(',', '.'));
        if (isNaN(userInput)) {
            await ctx.reply('Пожалуйста, введите корректное число.');
            return;
        }
        

        // Проверка лимита (1505 юаней ≈ 200 евро)
        if (userInput > 1505) {
            await ctx.reply('❌ Стоимость товара превышает 200 евро. Пожалуйста, выберите товар дешевле.');
            return;
        }

        // Дополнительная стоимость в зависимости от категории
        let additionalCost = 0;
        if (session.category === 'Обувь') {
            additionalCost = 1630;
        } else if (session.category === 'Верхняя одежда') {
            additionalCost = 1350;
        } else if (session.category === 'Штаны') {
            additionalCost = 1350;
        } else if (session.category === 'Футболка') {
            additionalCost = 900;
        } else if (session.category === 'Духи и косметика') {
            additionalCost = 1350;
        } else if (session.category === 'Нижнее бельё') {
            additionalCost = 900;
        } else if (session.category === 'Сумки и рюкзаки') {
            additionalCost = 1350;
        } else if (session.category === 'Электроника') {
            additionalCost = 900;
        } else if (session.category === 'Аксесуары') {
            additionalCost = 900;
        } else {
            additionalCost = 1500; // Дефолтное значение для других категорий
        }

        // Расчет итоговой стоимости
        const totalCost = (userInput * 14.8 * 1.2) + additionalCost;

        await ctx.reply(`Итоговая стоимость товара в категории "${session.category}" с учетом доставки до склада в Санкт-Петербурге: ${totalCost.toFixed(2)} рублей.`);
        delete userSession[chatId];
    }
    // Логика оформления заказа
    else if (session.awaiting === 'link') {
        // Валидность
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test(text)) {
            await ctx.reply('Пожалуйста, введите корректную ссылку на товар (например, https://example.com/product).');
            return;
        }

        session.link = text;
        session.awaiting = 'price';
        await ctx.reply('Ссылка получена! Теперь укажите цену товара в юанях.');
// Логика оформления заказа
    }else if (session.awaiting === 'price') {
    const price = parseFloat(text.replace(',', '.'));
    if (isNaN(price)) {
        await ctx.reply('Пожалуйста, введите корректную числовую цену.');
        return;
    }

    // лимит 200 евро - 1505 юаней
    if (price > 1505) {
        await ctx.reply('❌ Стоимость товара превышает 200 евро. Пожалуйста, выберите товар дешевле.');
        return;
    }

    session.price = price;

        if (session.category === 'Духи и косметика') {
            session.awaiting = 'volume';
            await ctx.reply('Напишите объём (например, 30ml, 50ml, 90ml):');
        } else {
            session.awaiting = 'size';
            await ctx.reply('Введите размер товара (например, 42, M, L):');
        }
    } else if (session.awaiting === 'volume') {
        session.volume = text;
        // Для категории "Духи и косметика" пропускаем запрос размера
        if (session.category === 'Духи и косметика') {
            session.awaiting = 'fio';
            await ctx.reply('Введите ФИО как в паспорте (на эти данные будет отправлена посылка).');
        } else {
            session.awaiting = 'size';
            await ctx.reply('Введите размер товара (например, 42, M, L):');
        }
    } else if (session.awaiting === 'size') {
        session.size = text;
        session.awaiting = 'fio';
        await ctx.reply('Введите ФИО как в паспорте (на эти данные будет отправлена посылка).');
    } else if (session.awaiting === 'fio') {
        // Минимум два слова в ФИО
        const words = text.trim().split(/\s+/); // Разделяем строку на слова по пробелам
        if (words.length < 2) {
            await ctx.reply('ФИО должно содержать минимум два слова. Пожалуйста, введите еще раз:');
            return;
        }

        session.fio = text;
        session.awaiting = 'phone';
        await ctx.reply('Введите номер телефона для связи с вами (например, +79991234567 или +375291234567):');
    } else if (session.awaiting === 'phone') {
        // Проверка номера телефона
        const phoneRegex = /^(\+375|\+7)\d{9,10}$/;
        if (!phoneRegex.test(text)) {
            await ctx.reply('Номер телефона должен начинаться с +375 или +7 и содержать 9-10 цифр после кода страны. Пожалуйста, введите номер еще раз:');
            return;
        }

        session.phone = text;
        session.awaiting = 'address';
        await ctx.reply('Введите адрес пункта СДЭК (Страна, Область, город, улица, номер дома):');
    } else if (session.awaiting === 'address') {
        session.address = text;
    
        // Расчет итоговой цены
        let additionalCost = 0;
        if (session.category === 'Обувь') {
            additionalCost = 1630;
        } else if (session.category === 'Верхняя одежда') {
            additionalCost = 1350;
        } else if (session.category === 'Футболка') {
            additionalCost = 900;
        } else if (session.category === 'Штаны') {
            additionalCost = 1350;
        } else if (session.category === 'Духи и косметика') {
            additionalCost = 1350;
        } else if (session.category === 'Нижнее бельё') {
            additionalCost = 900;
        } else if (session.category === 'Сумки и рюкзаки') {
            additionalCost = 1350;
        } else if (session.category === 'Электроника') {
            additionalCost = 900;
        } else if (session.category === 'Аксесуары') {
            additionalCost = 900;
        } else {
            additionalCost = 1500; // Дефолтное значение для других категорий
        }
    
        const priceInYuan = session.price;
        session.finalPrice = (priceInYuan * 14.8 * 1.2) + additionalCost;
    
        const summary = `
📁 Категория: ${session.category || 'Не указана'}
📏 Размер: ${session.size || 'Не указан'}
🪪 ФИО: ${session.fio}
📞 Телефон: ${session.phone}
📍 Адрес СДЭК: ${session.address}
🔗 Ссылка на товар: ${session.link}
💹 Цена товара на площадке: ${session.price} юаней
🔖 Итоговая цена(с учётом доставки до склада в Санкт-Петербурге): ${session.finalPrice.toFixed(2)} рублей.
${session.category === 'Духи и косметика' ? `🧴 Объём: ${session.volume}` : ''}
*⚠️ Товар возврату и обмену не подлежит! Мы оказываем услуги выкупа и доставки товара!*
*📦 Доставка до вашего пункта СДЭК оплачивается отдельно(при получении или в приложении СДЭКА)*
        `;
    
        // фото товара и клавиатуру подтверждения
        await ctx.api.sendPhoto(ctx.chat.id, session.photo.file_id, {
            caption: summary,
            parse_mode: 'Markdown',
            reply_markup: confirmKeyboard,
        });
    
        session.awaiting = 'confirmation';
    }
    
    // другое не связанное с контекстом
    else {
        await ctx.reply('👾 Я не знаю такой команды. Пожалуйста, используйте кнопки меню.');
    }
});

// Обработчик фото
bot.on('message:photo', async (ctx) => {
    const session = userSession[ctx.chat.id];
    if (session && session.awaiting === 'photo') {
        session.photo = ctx.message.photo.pop(); // Сохраняем фото
        session.awaiting = 'link';
        await ctx.api.sendPhoto(ctx.chat.id, "https://disk.yandex.ru/i/AYctz1SOV90V4A", {
            caption: "Фото получено! Теперь отправьте ссылку на товар (только ссылку, без остального текста)",
        })
    } else {
        await ctx.reply('Я не понимаю эту команду. Пожалуйста, следуйте инструкциям.');
    }
});

const fs = require('fs');
const path = require('path');

// Путь к файлу, где будет храниться счетчик заказов
const orderCounterFilePath = path.join(__dirname, 'orderCounter.txt');

// Функция для чтения текущего значения счетчика из файла
function readOrderCounter() {
    try {
        const data = fs.readFileSync(orderCounterFilePath, 'utf8');
        return parseInt(data, 10) || 0;
    } catch (err) {
        return 0;
    }
}

// Функция для записи нового значения счетчика в файл
function writeOrderCounter(counter) {
    fs.writeFileSync(orderCounterFilePath, counter.toString(), 'utf8');
}

// Инициализация счетчика заказов
let orderCounter = readOrderCounter();

// Подтверждение и отправка письма
bot.callbackQuery('confirm-data', async (ctx) => {
    const session = userSession[ctx.chat.id];
    if (!session || !session.photo) {
        await ctx.reply('Произошла ошибка. Пожалуйста, начните процесс заново.');
        return;
    }

    // счетчик заказа по 1
    orderCounter += 1;
    writeOrderCounter(orderCounter);

    // сейв в бд
    const { category, size, fio, phone, address, link, price, finalPrice, photo } = session;
    const userId = ctx.from.id;
    const chatId = ctx.chat.id;
    const username = ctx.from.username || 'Не указан';

    db.run(
        `INSERT INTO orders (userId, chatId, username, orderNumber, status, category, price, link, fio, phone, address, paidAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, chatId, username, orderCounter, 'В обработке', category, price, link, fio, phone, address, finalPrice],
        async (err) => {
            if (err) {
                console.error('Ошибка при сохранении заказа:', err);
                await ctx.reply('Произошла ошибка при сохранении заказа. Попробуйте позже.');
                return;
            }

            // письмо с инфой
            const file = await ctx.api.getFile(session.photo.file_id);
            const photoURL = `https://api.telegram.org/file/bot${process.env.BOT_API_KEY}/${file.file_path}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.RECIPIENT_EMAIL,
                subject: `Новый заказ №${orderCounter} от бота`,
                text: `
Номер заказа: ${orderCounter}
Категория: ${category}
Размер: ${size}
ФИО: ${fio}
Телефон: ${phone}
Адрес СДЭК: ${address}
Ссылка: ${link}
Цена на площадке: ${price} юаней
Итоговая цена: ${finalPrice} рублей
Юзернейм: ${username}
                `,
                attachments: [
                    {
                        filename: 'photo.jpg',
                        path: photoURL,
                    },
                ],
            };

            try {
                await transporter.sendMail(mailOptions);



                await ctx.reply(`Данные успешно отправлены! Спасибо за заказ. Ваш номер заказа: ${orderCounter}`);
                delete userSession[ctx.chat.id]; // Очищаем сессию
            } catch (error) {
                console.error('Ошибка при отправке письма:', error);
                await ctx.reply('Произошла ошибка при отправке данных. Попробуйте позже.');
            }
        }
    );
});

bot.callbackQuery('edit-data', async (ctx) => {
    userSession[ctx.chat.id].awaiting = 'price';
    await ctx.reply('Хорошо, начнем заново. Введите цену товара в юанях:');
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('orders.db');


// Создание таблицы orders, если она не существует
db.run(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        chatId INTEGER NOT NULL,
        username TEXT,
        orderNumber INTEGER NOT NULL,
        status TEXT DEFAULT 'В обработке',
        category TEXT,
        price REAL,
        link TEXT,
        fio TEXT,
        phone TEXT,
        address TEXT,
        paidAmount REAL DEFAULT 0
    )
`, (err) => {
    if (err) {
        console.error('Ошибка при создании таблицы orders:', err);
    } else {
        console.log('Таблица orders успешно создана или уже существует.');
    }
});


bot.callbackQuery('track-button', async (ctx) => {
    const userId = ctx.from.id;

    // Ищем заказы пользователя в базе данных
    db.all(
        `SELECT orderNumber, status FROM orders WHERE userId = ?`,
        [userId],
        (err, rows) => {
            if (err) {
                console.error('Ошибка при поиске заказов:', err);
                ctx.reply('Произошла ошибка при поиске заказов. Попробуйте позже.');
                return;
            }

            if (rows.length === 0) {
                ctx.reply('У вас нет активных заказов.');
                return;
            }

            // Сообщение со статусами
            let message = 'Ваши заказы:\n\n';
            rows.forEach((row) => {
                message += `🛒 Заказ №${row.orderNumber}\nСтатус: ${row.status}\n\n`;
            });

            ctx.reply(message);
        }
    );
});

bot.catch((err) => {
    console.error('Ошибка:', err.error);
});

bot.start();