// CJM ---------->
// const express = require('express')

// ESM ---------->
import express from "express";
import { Contact } from "../../models/contacts.js";
import { contactValidation, favoriteValidation } from "../../validation/validation.js";

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

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

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new:true, });

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
