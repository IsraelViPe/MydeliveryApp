'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sales',
        key: 'id',
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER,
  },{
    underscored: true,
    modelName: 'SaleProduct',
    tableName: 'sales_products',
    timestamps: false,
    sequelize,
  })

  SaleProduct.associate = ({ Sale, Product }) => {
    Sale.belongsToMany(Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });

    Product.belongsToMany(Sale, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    })
  }

  return SaleProduct;
};
