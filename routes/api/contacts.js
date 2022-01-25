import { Router } from "express";
import getContacts from "../../controllers/contacts/getContacts";
import getContact from "../../controllers/contacts/getContact";
import deleteContact from "../../controllers/contacts/deleteContact";
import addNewContact from "../../controllers/contacts/addNewContact";
import updateContactDetails from "../../controllers/contacts/updateContactDetails";

import {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
  validateId,
  validateQuery,
} from "../../midllewares/validation/contactValidation.js";

const router = new Router();

router.get("/", validateQuery, getContacts);

router.get("/:id", validateId, getContact);

router.post("/", validateCreate, addNewContact);

router.delete("/:id", validateId, deleteContact);

router.put("/:id", validateId, validateUpdate, updateContactDetails);

router.patch(
  "/:id/favorite",
  validateId,
  validateUpdateFavorite,
  updateContactDetails
);

export default router;
