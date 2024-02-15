const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody.js");
const { createContactSchema, updateContactSchema } = require("../schemas/contactsSchemas.js")

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);


contactsRouter.patch("/:id", validateBody(updateContactSchema), updateContact);

module.exports = contactsRouter;
