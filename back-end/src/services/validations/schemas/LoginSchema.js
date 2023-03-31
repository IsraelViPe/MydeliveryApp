const Joi = require('joi');

const requestField = 'O campo {#label} deve ser informado';

const LoginSchema = Joi.object({
    email: Joi.string().email().label('email').required(),
    password: Joi.string().min(6).label('senha').required(),
}).messages({
    'string.email': 'Usuário ou senha inválido',
    'string.min': 'Usuário ou senha inválido',
    'string.required': requestField,
    'string.empty': requestField, 
    'any.required': requestField,
});

module.exports = LoginSchema;