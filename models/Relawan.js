module.exports = (Sequelize, DataTypes) => {
    const Relawan = Sequelize.define('Relawan', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        no_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        j_identity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        no_identity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        j_sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        born_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_born: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marital_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        worked: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_study: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cluster_specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address_domisil: {
            type: DataTypes.TEXT,
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
        tableName: 'relawans',
        timestamps: true
    });
    return Relawan;
}