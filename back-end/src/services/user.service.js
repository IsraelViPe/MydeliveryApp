const { Op } = require('sequelize');
const { User, SaleProduct } = require('../database/models');
const { mapError } = require('../utils/errorMap');
const { getSalesByCustomer } = require('./sales.service');

const getAllSellers = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
  });

  return sellers;
};

const getAllNonAdmin = async () => {
  const usersNonAdmin = await User.findAll({
    where: { role: { [Op.ne]: 'administrator' } },
  });

  return usersNonAdmin;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) return mapError('Usuário não encontrado');

  return user;
};

const deleteUserById = async (id) => {
  const sales = await getSalesByCustomer(id);

  if (!sales) {
    await User.destroy({ where: { id } });
  } else {
    const salesIds = sales.message.map((sale) => sale.id);
  
    const promises = [
      SaleProduct.destroy({ where: { saleId: salesIds } }),
      sales.message.map((sale) => sale.destroy()),
      User.destroy({ where: { id } }),
    ];
  
    await Promise.all(promises);
  }
};

module.exports = { getAllSellers, getAllNonAdmin, getUserById, deleteUserById };
