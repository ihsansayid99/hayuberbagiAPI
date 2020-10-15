module.exports = (Sequelize, DataTypes) => {
    const TokenDonatur = Sequelize.define('TokenDonatur', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        donatur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'token_donaturs',
        timestamps: true
    });
    return TokenDonatur;
}