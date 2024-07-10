import Joi from 'joi';

export default class ProfileValidator {


  static validateId(id: any): Joi.ValidationResult{
    const schema = Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })
    return schema.validate(id);
  }
  
  static updateUserAbout(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
      about: Joi.array().items(Joi.string()).optional(),
    });
    return schema.validate(data);
  }

  static updateUserGoals(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
      goals: Joi.array().items(Joi.string()).optional(),
    });
    return schema.validate(data);
  }

  static updateUserPreference(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
        preference: Joi.array().items(Joi.string()).optional(),
    });
    return schema.validate(data);
  }


  
}