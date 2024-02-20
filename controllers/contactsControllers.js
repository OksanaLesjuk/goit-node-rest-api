import {
    listContacts,
    getContactById,
    addContact,
    updateById,
    removeContact,
} from "../services/contactsServices.js"


import { HttpError } from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.status(200).json(result)
    } catch (error) {
        next(error)

    }
};

const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
};

const createContact = async (req, res, next) => {
    try {
        const result = await addContact(req.body)
        res.status(201).json(result);
    } catch (error) {
        next(error)

    }
};

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateById(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }

};

export {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
}
