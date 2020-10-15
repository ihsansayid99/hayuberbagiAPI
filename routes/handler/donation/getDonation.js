const { Donatur, Donation } = require('../../../models');

module.exports = async (req, res) => {
    const id = req.params.id;

    const donatur = await Donatur.findByPk(id, {
        attributes: ['id', 'fullname', 'address', 'no_phone', 'email']
    })

    if (!donatur) {
        res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        });
    }

    const data = await Donatur.findAll({
        attributes: ['id', 'fullname', 'address', 'no_phone', 'email'],
        include: {
            attributes: ['id', 'donatur_id', 'donation_option', 'many_donation', 'status'],
            model: Donation,
            where: {
                donatur_id: id
            }
        }
    })

    return res.json({
        status: 'succes',
        data

    })
}