const bcrypt = require('bcrypt');
const { Donatur } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: {
        // Register our new error message text
        phoneNumber: "The phone number must be started with '+'!"
    }
});

module.exports = async (req, res) => {
    const Schema = {
        fullname: 'string|empty:false',
        address: 'string|empty:false',
        no_phone: 'string|min:12|max:15',
        email: 'string|empty:false',
        password: 'string|empty:false|min:6',
    }


    const validate = v.validate(req.body, Schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }
    const donatur = await Donatur.findOne({
        where: { email: req.body.email }
    })

    if (donatur) {
        return res.status(409).json({
            status: 'error',
            message: 'email already exists'
        })
    }


    const password = await bcrypt.hash(req.body.password, 10);
    const data = {
        password,
        fullname: req.body.fullname,
        address: req.body.address,
        no_phone: req.body.no_phone,
        email: req.body.email
    }

    const createdDonatur = await Donatur.create(data);
    return res.json({
        status: 'succes',
        data: {
            id: createdDonatur.id
        }
    })
}