const Joi = require("joi");

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(15).required(),
})

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(7).max(15),
}).min(1) //що мінімум одна властивість має бути для оновленя


module.exports = {
    createContactSchema,
    updateContactSchema,
}