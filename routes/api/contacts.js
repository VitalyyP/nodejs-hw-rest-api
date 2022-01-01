import { Router } from "express";
import listContacts from "../../models/contacts/listContacts";
import getContactById from "../../models/contacts/getContactById";
import removeContact from "../../models/contacts/removeContact";
import addContact from "../../models/contacts/addContact";
import updateContact from "../../models/contacts/updateContact";
// import model from "../../model/index";
import { validateCreate, validateUpdate, validateId } from "./validation";

const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", validateCreate, async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:id", validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

export default router;
