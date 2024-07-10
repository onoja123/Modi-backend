import Joi from 'joi';

export default class WalitlistValidator{
    static addUser(data: any): Joi.ValidationResult{
        const schema = Joi.object({
            email: Joi.string().required(),
        });
         return schema.validate(data);
    }
}