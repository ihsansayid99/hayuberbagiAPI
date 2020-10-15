const { TokenRelawan } = require('../../../models');

module.exports = async (req, res) => {
    const tokenRelawan = req.query.refresh_token;
    const token = await TokenRelawan.findOne({
        where: { token: tokenRelawan }
    });

    if (!token) {
        return res.status(400).json({
            status: 'error',
            message: 'invalid token'
        })
    }

    return res.json({
        status: 'succes',
        token
    })
}