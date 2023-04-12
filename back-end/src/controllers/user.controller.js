// const { Op } = require('sequelize');
const UserService = require('../services/user.service');
// const { User } = require('../database/models');
const { codes } = require('../utils/errorMap');

const getAllSellers = async (_req, res, _next) => {
  const response = await UserService.getAllSellers();

  return res.status(codes.OK).json(response);
};

const getUserById = async (req, res, next) => {
  console.log('aqui');
  const { id } = req.params;

  const response = await UserService.getUserById(id);

  if (response.statusCode) {
    next(response);
    return;
  }

  return res.status(codes.OK).json(response);
};

// const getAllUsers = async (_req, res, next) => {
//   try {
//     const response = await User.findAll({ where: { role: { [Op.ne]: 'administrator' } } });
//     res.status(codes.OK).json(response);
//   } catch (e) {
//     next(e);
//   }
// };

//   const AddUser = async (req, res, next) => {
//     try {
//       const response = await User.create(req.body);
//       res.status(codes.CREATED).json(response);
//     } catch (e) {
//       next(e);
//     }
//   };

//   const DeleteUser = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//       const response = await User.destroy({
//         where: { id },
//       });
//       res.status(codes.OK).json(response);
//     } catch (e) {
//       next(e);
//     }
//   };

module.exports = { getAllSellers, getUserById };
