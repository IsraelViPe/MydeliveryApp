const { Op } = require('sequelize');
const md5 = require('md5');
const { User } = require('../database/models');
const { mapError, tokenGenerate } = require('../utils/errorMap');
const RegisterSchema = require('./validations/schemas/RegisterSchema');

const register = async (userData) => {
  const { name, email, password, role } = userData;
  const { error } = RegisterSchema.validate({ name, email, password });

  if (error) return mapError(error.message);
  
  const user = await User.findOne({ where: { [Op.or]: [{ name }, { email }] } });

  if (user) return mapError('Nome ou email já cadastrado');

  const newUser = { name, email, password: md5(password), role };

  const u = await User.create(newUser);

  const token = tokenGenerate({ sub: u.dataValues.id });
  console.log(u.dataValues.id);
  return {
    email,
    name,
    token,
  };
};

module.exports = { register };
