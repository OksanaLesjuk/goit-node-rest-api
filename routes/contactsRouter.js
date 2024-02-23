import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js"
import { isValidId } from "../helpers/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", isValidId, getOneContact);

contactsRouter.delete("/:contactId", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);


contactsRouter.put("/:contactId", isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:contactId/favorite", isValidId, validateBody(updateFavoriteSchema), updateStatusContact);

export default contactsRouter;
