'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('token_donaturs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      donatur_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('token_donaturs', {
      type: 'foreign key',
      name: 'TOKEN_DONATUR_ID',
      fields: ['donatur_id'],
      references: {
        table: 'donaturs',
        field: 'id'
      }
    })
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('token_donaturs');

  }
};
