'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('donaturs',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        fullname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        address: {
          type: Sequelize.TEXT,
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
        password: {
          type: Sequelize.STRING,
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
    await queryInterface.addConstraint('donaturs', {
      type: 'unique',
      fields: ['email'],
      name: 'UNIQUE_DONATURS_EMAIL'
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('donaturs');

  }
};
