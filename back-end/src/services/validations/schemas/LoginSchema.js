const Joi = require('joi');

const LoginSchema = Joi.object({
    email: Joi.string().email().label('email').required(),
    password: Joi.string().min(6).label('senha').required(),
}).messages({
    'string.email': 'O {#label} informado é inválido',
    'string.min': 'O campo {#label} deve ter no mínimo 6 caracteres',
    'string.required': 'O campo {#label} deve ser informado',
    'string.empty': 'O campo {#label} deve ser informado',
    'any.required': 'O campo {#label} é obrigatório',
});

module.exports = LoginSchema;