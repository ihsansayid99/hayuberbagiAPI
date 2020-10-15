const { Relawan } = require('../../../models');

module.exports = async (req, res) => {
    const relawanIds = req.query.relawan_ids || [];

    const sqlOptions = {
        attributes: ['id', 'full_name', 'nickname', 'no_phone', 'email', 'j_identity', 'no_identity', 'address', 'j_sex', 'born_city', 'date_born', 'religion', 'marital_status', 'worked', 'last_study', 'cluster_specialization', 'address_domisil']
    }
    if (relawanIds.length) {
        sqlOptions.where = {
            id: relawanIds
        }
    }

    const relawans = await Relawan.findAll(sqlOptions);

    return res.json({
        status: 'succes',
        data: { relawans }
    })

}