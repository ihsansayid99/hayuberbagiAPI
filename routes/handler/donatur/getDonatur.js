const { Donatur } = require('../../../models');
module.exports = async (req, res) => {
    const id = req.params.id;
    const donatur = await Donatur.findByPk(id, {
        attributes: ['id', 'fullname', 'address', 'no_phone', 'email']
    });

    if (!donatur) {
        res.status(404).json({
            status: 'error',
            message: 'donatur not found'
        });
    }

    return res.json({
        status: 'succes',
        data: {
            donatur
        }
    })
}