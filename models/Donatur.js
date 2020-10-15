module.exports = (Sequelize, DataTypes) => {
    const Donatur = Sequelize.define('Donatur', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        no_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'donaturs',
        timestamps: true
    });

    Donatur.associate = function (models) {
        Donatur.hasMany(models.Donation, { foreignKey: "donatur_id", sourceKey: 'id' });
    }

    return Donatur;
}