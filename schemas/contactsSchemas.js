import Joi from "joi";

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(15).required(),
    favorite: Joi.bool(),
})

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(7).max(15),
    favorite: Joi.bool(),
}).min(1).messages({
    'object.min': "Body must have at least one field",

}); //що мінімум одна властивість має бути для оновленя

const updateFavoriteSchema = Joi.object({

    favorite: Joi.bool().required(),
}).min(1).messages({
    'object.min': "Body must have at least one field",

});


export {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema
}