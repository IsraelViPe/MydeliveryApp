'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    }, 
    status: DataTypes.STRING,
  } , {
    underscored: true,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: false,
    sequelize,
  });

  Sale.associate = ({ User }) => {
    Sale.belongsTo(User, {
      as: 'user',
      foreignKey: 'id'
    })
    Sale.belongsTo(User, {
      as: 'seller',
      foreignKey: 'id'
    })
  }

  return Sale;
};
