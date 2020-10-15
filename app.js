require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const relawanRouter = require('./routes/relawan');
const tokenRelawanRouter = require('./routes/tokenRelawan');
const donaturRouter = require('./routes/donatur');
const donationRouter = require('./routes/donation');
const cron = require('node-cron')
const app = express();
const request = require('request')
const { Donatur, Donation, sequelize } = require('./models');

const { QueryTypes } = require('sequelize');
const { response } = require('express');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/relawan', relawanRouter);
app.use('/relawan_token', tokenRelawanRouter);
app.use('/donatur', donaturRouter);
app.use('/donation', donationRouter);

cron.schedule('0 10 1 1-12 *', function () {
    sequelize.query("SELECT DISTINCT `Donatur`.`id`, `Donatur`.`fullname`, `Donatur`.`no_phone` FROM `donaturs` AS `Donatur` INNER JOIN `donations` AS `Donations` ON `Donatur`.`id` = `Donations`.`donatur_id` AND `Donations`.`donatur_id` = `Donatur`.`id`", { type: QueryTypes.SELECT }).then(data => {
        data.map(display => {
            const url = `https://eu107.chat-api.com/${process.env.TWILIO_ACCOUNT_SID}/message?token=${process.env.TWILIO_AUTH_TOKEN}`;
            const data = {
                phone: `${display.no_phone}`, // Receivers phone
                body: `Hallo ${display.fullname}, Yuk donasi lagi Untuk bulan ini :).`, // Message
            }
            request({
                url: url,
                method: "POST",
                json: data
            });
        })
    })


})


module.exports = app;
