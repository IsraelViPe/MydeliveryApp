const { User } = require('../database/models');
const { mapError } = require('../utils/errorMap');

const getAllSellers = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
  });

  return sellers;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) return mapError('Usuário não encontrado');

  return user;
};

module.exports = { getAllSellers, getUserById };
