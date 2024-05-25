// CJM ---------->
// const express = require('express')

// ESM ---------->
import express from "express";
import { listContacts, getContactById, removeContact, addContact, updateContact } from "../../models/contacts.js";
import { contactValidation } from "../../validation/validation.js";

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      const err = new Error("Content not found");
      err.status = 404;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactValidation.validate(req.body);
    if (error) {
      const err = new Error("Missing required name field");
      err.status = 400;
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      const err = new Error("Content not found");
      err.status = 404;
    }

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactValidation.validate(req.body);
    if (error) {
      const err = new Error("Missing fields");
      err.status = 400;
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      const err = new Error("Content not found");
      err.status = 404;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
})

// CJM ---------->
// module.exports = router

// ESM ---------->
export { router };
