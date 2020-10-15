const { Donatur, TokenDonatur } = require('../../../models');

module.exports = async (req, res) => {
    const donaturId = req.body.donatur_id;
    const donatur = await Donatur.findByPk(donaturId);

    if (!donatur) {
        return res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        })
    }

    await TokenDonatur.destroy({ where: { donatur_id: donaturId } });
    return res.json({
        status: 'succes',
        message: 'donatur token deleted'
    })
}