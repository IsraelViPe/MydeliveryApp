const md5 = require('md5');
const LoginSchema = require('./validations/schemas/LoginSchema');
const mapError = require('../utils/errorMap');
const { User } = require('../database/models');

const login = async (email, password) => {
    const { error } = LoginSchema.validate({ email, password });
    console.log(email, password);
    console.log(md5(password), md5('3c28d2b0881bf46457a853e0b07531c6'));
    if (error) {
      const err = mapError(error.message);
      return err;
    }

    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) return mapError('Usuário ou senha inválido');

    if (md5(password) !== user.password) return mapError('Usuário ou senha inválido');

    delete user.password;
    return user;
};

module.exports = { login };