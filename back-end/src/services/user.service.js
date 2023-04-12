const { Op } = require('sequelize');
const { User } = require('../database/models');
const { mapError } = require('../utils/errorMap');

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
  const deletedUser = await User.destroy({ 
    where: { id },
    cascade: true,
  });

  if (deletedUser === 0) return mapError('Erro ao deletar usuário');

  return { message: 'Usuário deletado com sucesso' };
};

// const deleteUserById = async (reqId) => {
//   const sales = await Sale.findAll({ where: { userId: reqId } });
//   const salesIds = sales.map((sale) => sale.id);

//   const promises = [];

//   if (salesIds.length > 0) {
//     promises.push(SalesProducts.destroy({ where: { saleId: salesIds } }));
//     promises.push(Sale.destroy({ where: { userId: reqId } }));
//   }

//   promises.push(User.destroy({ where: { id: reqId } }));

//   await Promise.all(promises);

//   return true;
// };

module.exports = { getAllSellers, getAllNonAdmin, getUserById, deleteUserById };
