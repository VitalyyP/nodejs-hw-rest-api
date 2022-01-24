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
import wrapperError from "../../../midllewares/error-handler";

const router = new Router();

router.get("/", [guard, validateQuery], wrapperError(getContacts));

router.get("/:id", [guard, validateId], wrapperError(getContact));

router.post("/", [guard, validateCreate], wrapperError(addNewContact));

router.delete("/:id", [guard, validateId], wrapperError(deleteContact));

router.put(
  "/:id",
  [guard, validateId, validateUpdate],
  wrapperError(updateContactDetails)
);

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  wrapperError(updateContactDetails)
);

export default router;
