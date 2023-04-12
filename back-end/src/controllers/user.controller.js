const UserService = require('../services/user.service');
const { codes } = require('../utils/errorMap');

const getAllSellers = async (_req, res, _next) => {
  const response = await UserService.getAllSellers();

  return res.status(codes.OK).json(response);
};

const getAllNonAdmin = async (_req, res, _next) => {
  const response = await UserService.getAllNonAdmin();

  return res.status(codes.OK).json(response);
};

const getUserById = async (req, res, _next) => {
  const { id } = req.params;

  const response = await UserService.getUserById(id);

  return res.status(codes.OK).json(response);
};

const deleteUserById = async (req, res, _next) => {
  const { id } = req.params;

  await UserService.deleteUserById(id);

  return res.status(codes.OK).json({ message: 'Usuário deletado com sucesso' });
};

module.exports = { getAllSellers, getAllNonAdmin, getUserById, deleteUserById };
