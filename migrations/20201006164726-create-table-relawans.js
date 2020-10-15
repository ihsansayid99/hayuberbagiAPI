'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('relawans', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      j_identity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_identity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      j_sex: {
        type: Sequelize.STRING,
        allowNull: false
      },
      born_city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_born: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      religion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      marital_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      worked: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_study: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cluster_specialization: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_domisil: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('relawans', {
      type: 'unique',
      fields: ['email', 'no_identity'],
      name: 'UNIQUE_RELAWANS_EMAIL_NO_IDENTITY'
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('relawans');
  }
};
