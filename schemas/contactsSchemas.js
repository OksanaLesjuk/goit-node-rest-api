import Joi from "joi";

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(15).required(),
})

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(7).max(15),
}).min(1).messages({
    'object.min': "Body must have at least one field",
}); //що мінімум одна властивість має бути для оновленя


export {
    createContactSchema,
    updateContactSchema,
}