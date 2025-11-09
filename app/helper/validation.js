const Joi = require('joi');

const userValidation = () => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should not exceed 30 characters',
        'any.required': 'Name is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Please enter your email ID',
        'any.required': 'Please enter your email ID'
      }),
    password: Joi.string()
      .min(8)
      .max(30)
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should have at least 8 characters',
        'string.max': 'Password should not exceed 30 characters',
        'any.required': 'Password is required'
      }),
    role: Joi.string()
      .valid('Student', 'Admin','Teacher')
      .messages({
        'any.only': 'Role must be either User or Admin'
      })
  });

  return schema;
};

module.exports = { userValidation };