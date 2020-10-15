const { Relawan } = require('../../../models');
module.exports = async (req, res) => {
    const id = req.params.id;
    const relawan = await Relawan.findByPk(id, {
        attributes: ['id', 'full_name', 'nickname', 'no_phone', 'email', 'j_identity', 'no_identity', 'address', 'j_sex', 'born_city', 'date_born', 'religion', 'marital_status', 'worked', 'last_study', 'cluster_specialization', 'address_domisil']
    });

    if (!relawan) {
        res.status(404).json({
            status: 'error',
            message: 'relawan not found'
        });
    }

    return res.json({
        status: 'succes',
        data: {
            relawan
        }
    })
}