'use strict';

const Joi                             = require('joi');
const constants                       = require('../../../responses/responseConstants');
const validator                       = require('../../../validators/joiValidator');


const apiReferenceModule              = constants.modules.CIVIC_REPORT; 

const headerSchema                    = Joi.object().keys({});

exports.register = async (req, res, next) => {
  req.apiReference = {
    module        : apiReferenceModule,
    api           : "register"
  };

  const schema = Joi.object().keys({
    subject: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(20).required(),
    category: Joi.string().required(),
    location: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    }).required(),
    imageUrl: Joi.string().uri().optional().allow(''),
    status: Joi.string().valid('pending', 'in_progress', 'resolved', 'rejected').optional(),
    history: Joi.array().items(Joi.string()).optional(),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  });

  let reqBody     = { ... req.body };
  let request     = { ... req, headers: req.headers };

  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema, headerSchema);
  if (validFields) {
    next();
  }
};