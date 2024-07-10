import Joi from "joi";

export default class AuthValidator {
    static signup(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            fullname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        return schema.validate(data);
    }


    static verify(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            otpCode: Joi.string().required(),
        });
        return schema.validate(data);
    }

    static login(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        return schema.validate(data);
    }


    static forgotPassword(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
        });
        return schema.validate(data);
    }

    static resetPassword(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            otpCode: Joi.string().required(),
            password: Joi.string().required(),
            passwordConfirm: Joi.string().required(),
        });
        return schema.validate(data);
    }

    static updatePassword(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            currentPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        });
        return schema.validate(data);
    }

    static google(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            code: Joi.string().required(),
        });
        return schema.validate(data);
    }
}
