module.exports = (Sequelize, DataTypes) => {
    const TokenRelawan = Sequelize.define('TokenRelawan', {
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
        relawan_id: {
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
        tableName: 'token_relawans',
        timestamps: true
    });
    return TokenRelawan;
}