const Jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

/** Mapeamento de Error */

const codes = {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    UNPROCESSIBLE_ENTITY: 422,
    NOT_FOUND: 404,
    CONFLICT: 409,
    FORBIDDEN: 403,
};

const errors = [
    { message: 'Usuário ou senha inválido', statusCode: codes.NOT_FOUND },
    { message: 'O campo "email" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "password" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "nome" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O "email" informado é inválido', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'Nome ou email já cadastrado', statusCode: codes.CONFLICT },
    { message: 'Usuário cadastrado com sucesso', statusCode: codes.CREATED },
    { message: 'Token inválido', statusCode: codes.FORBIDDEN },
    { 
        message: 'O campo "senha" deve ter no mínimo 6 caracteres',
        statusCode: codes.UNPROCESSIBLE_ENTITY,
    },
    { 
      message: 'O campo "nome" deve ter no mínimo 12 caracteres',
      statusCode: codes.UNPROCESSIBLE_ENTITY,
    },

];

const mapError = (message) => {
    const error = errors.find((err) => err.message === message);
    if (error) return error;
    return { message: 'Error not Mapped', statusCode: 403 };
};

/** Função Geração de Token */
const tokenGenerate = (payload) => {
    const pathSecret = path.resolve(__dirname, '..', '..', 'jwt.evaluation.key');
    const tokenSecret = fs.readFileSync(pathSecret);
    const token = Jwt.sign(payload, tokenSecret, { expiresIn: '1h' });
    return token;
};

module.exports = { mapError, tokenGenerate };