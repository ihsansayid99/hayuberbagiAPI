const bcyrpt = require('bcrypt');
const { Donatur, TokenDonatur } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require('jsonwebtoken');
const {
    JWT_SECRET,
    JWT_SECRET_TOKEN_EXPIRED
} = process.env;

module.exports = async (req, res) => {
    const Schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, Schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const donatur = await Donatur.findOne({
        where: { email: req.body.email }
    });

    if (!donatur) {
        return res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        })
    }

    const isValidPassword = await bcyrpt.compare(req.body.password, donatur.password);
    if (!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        })
    }

    const data = {
        email: donatur.email,
    }

    const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_SECRET_TOKEN_EXPIRED });

    const dataTokenDonatur = {
        token,
        donatur_id: donatur.id
    }

    TokenDonatur.create(dataTokenDonatur);

    return res.json({
        status: 'success',
        data: {
            email: donatur.email,
            dataTokenDonatur
        }
    });
}