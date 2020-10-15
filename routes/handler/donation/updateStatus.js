const { Donatur, Donation } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const Schema = {
        status: 'string'
    }

    const validate = v.validate(req.body, Schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const id = req.params.id;
    const donasi = await Donation.findByPk(id);

    if (!donasi) {
        return res.status(404).json({
            status: 'error',
            message: 'donasi not found'
        })
    }

    const {
        status
    } = req.body;

    await donasi.update({
        status
    })

    return res.json({
        status: 'succes',
        data: {
            status
        }
    })
}