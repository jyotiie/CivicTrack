'use strict';

const Joi                             = require('joi');
const constants                       = require('../../../responses/responseConstants');
const validator                       = require('../../../validators/joiValidator');

const apiReferenceModule              = constants.modules.AUTH;

const headerSchema                    = Joi.object().keys({});

exports.login = async (req, res, next) => {
  req.apiReference = {
    module        : apiReferenceModule,
    api           : "login"
  };

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

exports.register = async (req, res, next) => {
  req.apiReference = {
    module        : apiReferenceModule,
    api           : "register"
  };

  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res,schema, headerSchema);
  if (validFields) {
    next();
  }
}