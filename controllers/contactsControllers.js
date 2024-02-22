// import {
//     listContacts,
//     getContactById,
//     addContact,
//     updateById,
//     removeContact,
// } from "../services/contactsServices.js"
import { Contact } from "../models/contact.js";

import { HttpError } from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.status(200).json(result)
    } catch (error) {
        next(error)

    }
};

const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findById(id);
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
        const result = await Contact.findByIdAndDelete(id);
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
        const result = await Contact.create(req.body)
        res.status(201).json(result);
    } catch (error) {
        next(error)

    }
};

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }

};

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
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
    updateStatusContact
}
