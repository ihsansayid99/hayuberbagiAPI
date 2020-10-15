const { Donatur } = require('../models');
module.exports = (Sequelize, DataTypes) => {
    const Donation = Sequelize.define('Donation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        donatur_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        donation_option: {
            type: DataTypes.STRING,
            allowNull: false
        },
        many_donation: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['SUCCES', 'PENDING', 'FAILED'],
            allowNull: false,
            defaultValue: 'PENDING'
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
        tableName: 'donations',
        timestamps: true
    });
    Donation.associate = function (models) {
        Donation.belongsTo(models.Donatur, { foreignKey: 'donatur_id' })
    }
    return Donation;
}