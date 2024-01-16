import * as Joi from '@hapi/joi';

export const configValidationSchma = Joi.object({
  POSTGRES_DB_NAME: Joi.string().required(),
  POSTGRES_SERVER_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development')
    .required(),
  PORT: Joi.number().default(3000).required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_HOST: Joi.string().required(),
});
