const Joi = require('joi');

const requiredField = 'O campo {#label} deve ser informado';

const registerSchema = Joi.object({
    name: Joi.string().min(12).label('nome').required(),
    email: Joi.string().email().label('email').required(),
    password: Joi.string().min(6).label('senha').required(),
}).messages({
    'string.email': 'O {#label} informado é inválido',
    'string.min': 'O campo {#label} deve ter no mínimo {#limit} caracteres',
    'string.required': requiredField,
    'string.empty': requiredField, 
    'any.required': requiredField,
});

module.exports = registerSchema;