module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', { 
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      total_price: {
        type: Sequelize.DECIMAL(9, 2),
      },
      delivery_address: {
        type: Sequelize.STRING,
      },
      delivery_number: { type: Sequelize.STRING },
      sale_date: { type: Sequelize.DATE },
      status: { type: Sequelize.ENUM('preparando','pendente','entregue') },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
