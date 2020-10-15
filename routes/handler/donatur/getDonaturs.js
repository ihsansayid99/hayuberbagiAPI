const { Donatur } = require('../../../models');

module.exports = async (req, res) => {
    const donaturIds = req.query.donatur_ids || [];

    const sqlOptions = {
        attributes: ['id', 'fullname', 'address', 'no_phone', 'email']
    }
    if (donaturIds.length) {
        sqlOptions.where = {
            id: "17"
        }
    }

    const donaturs = await Donatur.findAll(sqlOptions);

    return res.json({
        status: 'succes',
        data: { donaturs }
    })

}