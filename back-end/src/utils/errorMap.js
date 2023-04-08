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
    SERVER_ERROR: 500,
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
    { message: 'Token not found', statusCode: codes.NOT_FOUND },
    { 
        message: 'O campo "senha" deve ter no mínimo 6 caracteres',
        statusCode: codes.UNPROCESSIBLE_ENTITY,
    },
    { 
      message: 'O campo "nome" deve ter no mínimo 12 caracteres',
      statusCode: codes.UNPROCESSIBLE_ENTITY,
    },
    { message: 'O campo "userId" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "sellerId" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "totalPrice" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "deliveryAddress" deve ser informado',
    statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "deliveryNumber" deve ser informado', 
    statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "saleDate" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "status" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "products" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "products" deve ter no mínimo 1', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "productId" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "quantity" deve ser informado', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'O campo "quantity" deve ter no mínimo 1', statusCode: codes.UNPROCESSIBLE_ENTITY },
    { message: 'Não foi possível atualizar o status da venda com sucesso', 
    statusCode: codes.SERVER_ERROR },
    { message: 'Usuário não encontrado', statusCode: codes.NOT_FOUND },
    { message: 'Venda não encontrada', statusCode: codes.NOT_FOUND },
    { message: 'Não foi possível atualizar o status da venda', statusCode: codes.SERVER_ERROR },

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

module.exports = { mapError, tokenGenerate, codes };
