'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('donations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      donatur_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      donation_option: {
        type: Sequelize.STRING,
        allowNull: false
      },
      many_donation: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['SUCCES', 'PENDING', 'FAILED'],
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

    await queryInterface.addConstraint('donations', {
      type: 'foreign key',
      name: 'DONATIONS_DONATURS_ID',
      fields: ['donatur_id'],
      references: {
        table: "donaturs",
        field: 'id'
      }
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('donations');

  }
};
