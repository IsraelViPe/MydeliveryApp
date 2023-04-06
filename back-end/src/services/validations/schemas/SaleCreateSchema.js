const Joi = require('joi');

const requiredField = 'O campo {#label} deve ser informado';

const productsList = Joi.object({
  productId: Joi.number().label('productId').required(),
  quantity: Joi.number().label('quantity').min(1).required(),
}).messages({
  'number.required': requiredField,
  'number.min': 'O campo {#label} deve ter no mínimo {#limit}',
});

const saleCreateSchema = Joi.object({
  userId: Joi.number().label('userId').required(),
  sellerId: Joi.number().label('sellerId').required(),
  totalPrice: Joi.number().label('totalPrice').required(),
  deliveryAddress: Joi.string().label('deliveryAddress').required(),
  deliveryNumber: Joi.number().label('deliveryNumber').required(),
  saleDate: Joi.date().label('saleDate').required(),
  status: Joi.string().label('status').required(),
  products: Joi.array().label('products').items(productsList).min(1)
.required(),
}).messages({
  'any.required': requiredField,
  'array.min': 'O campo {#label} deve ter no mínimo {#limit}',
});

module.exports = saleCreateSchema;
