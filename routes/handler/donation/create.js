const { Donatur, Donation } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
} = process.env;
const request = require('request');

module.exports = async (req, res) => {
    const donaturId = req.body.donatur_id;

    const Schema = {
        donation_option: 'string|min:1',
        many_donation: 'number|min:4',
        donatur_id: 'number'
    }

    const validate = v.validate(req.body, Schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const donatur = await Donatur.findByPk(donaturId);
    if (!donatur) {
        return res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        })
    }

    const createdDonations = await Donation.create({
        donation_option: req.body.donation_option,
        many_donation: req.body.many_donation,
        status: 'SUCCES',
        donatur_id: donaturId
    });

    const url = `https://eu107.chat-api.com/${TWILIO_ACCOUNT_SID}/message?token=${TWILIO_AUTH_TOKEN}`;
    const data = {
        phone: `${donatur.no_phone}`, // Receivers phone
        body: `Hallo ${donatur.fullname}, Terimakasih telah berdonasi Untuk ${createdDonations.donation_option} dengan Uang sejumlah ${createdDonations.many_donation}. Selanjutnya anda bisa Transfer Ke rekening kami di:
        Bank BCA : 182137 an Ir Soekarno. kami tunggu konfirmasinya :).`, // Message
    };
    // Send a request
    const waSend = request({
        url: url,
        method: "POST",
        json: data
    });

    return res.json({
        status: 'succes',
        data: {
            id: createdDonations.id
        },
        waSend
    })
}