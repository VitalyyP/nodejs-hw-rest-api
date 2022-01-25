import { Router } from "express";
import getContacts from "../../../controllers/contacts/getContacts";
import getContact from "../../../controllers/contacts/getContact";
import deleteContact from "../../../controllers/contacts/deleteContact";
import addNewContact from "../../../controllers/contacts/addNewContact";
import updateContactDetails from "../../../controllers/contacts/updateContactDetails";
import {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
  validateId,
  validateQuery,
} from "../../../midllewares/validation/contactValidation.js";
import guard from "../../../midllewares/guard";

const router = new Router();

router.get("/", [guard, validateQuery], getContacts);

router.get("/:id", [guard, validateId], getContact);

router.post("/", [guard, validateCreate], addNewContact);

router.delete("/:id", [guard, validateId], deleteContact);

router.put("/:id", [guard, validateId], validateUpdate, updateContactDetails);

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContactDetails
);

export default router;
