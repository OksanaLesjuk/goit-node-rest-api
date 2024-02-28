
import { Contact } from "../models/contact.js";

import { HttpError } from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner }, "", { skip, limit }).populate("owner", "email subscription");
        res.status(200).json(result)
    } catch (error) {
        next(error)

    }
};

const getOneContact = async (req, res, next) => {
    try {

        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
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
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
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

        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner })
        res.status(201).json(result);
    } catch (error) {

        next(error)

    }
};

const updateContact = async (req, res, next) => {
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
