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
    sequelize,
  })

  SaleProduct.associate = ({ Sale, Product }) => {
    Sale.belongsToMany(Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id'
    });

    Product.belongsToMany(Sale, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id'
    })
  }

  return SaleProduct;
};