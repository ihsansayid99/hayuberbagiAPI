const bcyrpt = require('bcrypt');
const { Donatur } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const Schema = {
        fullname: 'string|empty:false',
        address: 'string',
        no_phone: 'number',
        email: 'email',
        password: 'string|min:6',

    };

    const validate = v.validate(req.body, Schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const id = req.params.id;
    const donatur = await Donatur.findByPk(id);
    if (!donatur) {
        return res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        })
    }

    const email = req.body.email;
    if (email) {
        const checkEmail = await Donatur.findOne({
            where: { email }
        })
        if (checkEmail && email !== donatur.email) {
            return res.status(409).json({
                status: 'error',
                message: 'email already exists'
            })
        }
    }
    const password = await bcyrpt.hash(req.body.password, 10);
    const {
        fullname,
        address,
        no_phone,
    } = req.body;
    await donatur.update({
        email,
        password,
        fullname,
        no_phone,
        address
    });

    return res.json({
        status: 'succes',
        data: {
            id: donatur.id,
            fullname,
            address,
            no_phone,
            email
        }
    })
}