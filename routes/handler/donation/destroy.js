const { Donatur, Donation } = require('../../../models');

module.exports = async (req, res) => {
    const donaturId = req.params.id;
    const donatur = await Donatur.findByPk(donaturId);

    if (!donatur) {
        return res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        })
    }

    await Donation.destroy({ where: { donatur_id: donaturId } });
    return res.json({
        status: 'succes',
        message: 'donatur donasi deleted'
    })
}