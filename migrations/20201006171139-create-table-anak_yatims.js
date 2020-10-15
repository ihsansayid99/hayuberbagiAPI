'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anak_yatims',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        yayasan_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        fullname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        born_date: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        prestasi_akademik: {
          type: Sequelize.STRING,
          allowNull: false
        },
        prestasi_nonakademik: {
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
    await queryInterface.addConstraint('anak_yatims', {
      type: 'foreign key',
      name: 'ANAK_YATIM_YAYASAN_ID',
      fields: ['yayasan_id'],
      references: {
        table: 'yayasans',
        field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('anak_yatims');

  }
};
