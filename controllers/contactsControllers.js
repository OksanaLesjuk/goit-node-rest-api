
import { Contact } from "../models/contact.js";

import { HttpError } from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10, favorite } = req.query;
        const skip = (page - 1) * limit;

        let query = { owner };
        if (favorite === 'true' || favorite === 'false') {
            query.favorite = favorite === 'true';
        }

        const result = await Contact.find(query, "", { skip, limit }).populate("owner", "email subscription");


        res.status(200).json(result)
    } catch (error) {
        next(error)

    }
};

const getOneContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { contactId } = req.params;

        console.log(owner);
        console.log(contactId)
        const result = await Contact.findOne({ _id: contactId, owner });
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
        const { _id: owner } = req.user;
        const { contactId } = req.params;
        const result = await Contact.findOneAndDelete({ _id: contactId, owner: owner });
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
        const { _id: owner } = req.user;
        const { contactId } = req.params;
        const result = await Contact.findOneAndUpdate({ _id: contactId, owner: owner }, req.body, { new: true });
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
        const { _id: owner } = req.user;
        const { contactId } = req.params;
        const result = await Contact.findOneAndUpdate({ _id: contactId, owner: owner }, req.body, { new: true });
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
    updateStatusContact,

}
