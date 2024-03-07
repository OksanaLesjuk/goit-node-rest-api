import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js"
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";


const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:contactId", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:contactId", authenticate, isValidId, deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), createContact);


contactsRouter.put("/:contactId", authenticate, isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:contactId/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), updateStatusContact);

export default contactsRouter;
