const { Relawan, TokenRelawan } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const relawanId = req.body.relawan_id;
    const relawanToken = req.body.relawan_token;

    const Schema = {
        relawan_token: 'string',
        relawan_id: 'number'
    }

    const validate = v.validate(req.body, Schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const relawan = await Relawan.findByPk(relawanId);
    if (!relawan) {
        return res.status(404).json({
            status: 'error',
            message: 'relawan not found'
        })
    }

    const createdRelawanToken = await TokenRelawan.create({
        token: relawanToken,
        relawan_id: relawanId
    });

    return res.json({
        status: 'succes',
        data: {
            id: createdRelawanToken.id
        }
    })
}