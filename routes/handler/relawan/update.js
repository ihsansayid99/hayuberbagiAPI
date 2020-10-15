const bcyrpt = require('bcrypt');
const { Relawan } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const Schema = {
        full_name: 'string|empty:false',
        nickname: 'string',
        no_phone: 'number',
        email: 'email',
        password: 'string|min:6',
        j_identity: 'string',
        no_identity: 'number|min:6',
        address: 'string',
        j_sex: 'string',
        born_city: 'string',
        date_born: 'string',
        religion: 'string',
        marital_status: 'string',
        worked: 'string',
        last_study: 'string',
        cluster_specialization: 'string',
        address_domisil: 'string',
    };

    const validate = v.validate(req.body, Schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const id = req.params.id;
    const relawan = await Relawan.findByPk(id);
    if (!relawan) {
        return res.status(404).json({
            status: 'error',
            message: 'relawan not found'
        })
    }

    const email = req.body.email;
    if (email) {
        const checkEmail = await Relawan.findOne({
            where: { email }
        })
        if (checkEmail && email !== relawan.email) {
            return res.status(409).json({
                status: 'error',
                message: 'email already exists'
            })
        }
    }
    const password = await bcyrpt.hash(req.body.password, 10);
    const {
        full_name,
        nickname,
        no_phone,
        j_identity,
        no_identity,
        address,
        j_sex,
        born_city,
        date_born,
        religion,
        marital_status,
        worked,
        last_study,
        cluster_specialization,
        address_domisil,
    } = req.body;
    await relawan.update({
        email,
        password,
        full_name,
        nickname,
        no_phone,
        j_identity,
        no_identity,
        address,
        j_sex,
        born_city,
        date_born,
        religion,
        marital_status,
        worked,
        last_study,
        cluster_specialization,
        address_domisil
    });

    return res.json({
        status: 'succes',
        data: {
            id: relawan.id,
            nickname,
            full_name,
            email,
            no_phone,
            j_identity,
            no_identity,
            address,
            j_sex,
            born_city,
            date_born,
            religion,
            marital_status,
            worked,
            last_study,
            cluster_specialization,
            address_domisil
        }
    })
}