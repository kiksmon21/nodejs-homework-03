// CJM ---------->
// const fs = require('fs/promises')

// // ESM ---------->
// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const contactsPath = path.join("models", "contacts.json")

// const listContacts = async () => {
//     const contacts = await fs.readFile(contactsPath);
//     return JSON.parse(contacts);
// };

// const getContactById = async (contactId) => {
//     const contacts = await listContacts();
//     const result = contacts.find((contact) => contact.id === contactId);
//     return result || null;
// };

// const removeContact = async (contactId) => {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === contactId);
//     if (index === -1) {
//         return null;
//     }
//     const removedContact = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return removedContact;
// };

// const addContact = async ({ name, email, phone }) => {
//     const contacts = await listContacts();
//     const newContact = {
//         id: nanoid(),
//         name,
//         email,
//         phone,
//     };
//     const allContacts = [...contacts, newContact];
//     await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//     return newContact;
// };

// const updateContact = async (id, { name, email, phone }) => {
//     const contacts = await listContacts();
//     const index = contacts.findIndex((item) => item.id === id);
//     if (index === -1) {
//         return null;
//     }
//     contacts[index] = {
//         id,
//         name,
//         email,
//         phone,
//     };

//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
// };

// // CJM ---------->
// // moduile.exports = {
// //   listContacts,
// //   getContactById,
// //   removeContact,
// //   addContact,
// //   updateContact,
// // };

// // ESM ---------->
// export { listContacts, getContactById, removeContact, addContact, updateContact };


import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
            required: [true, "Set email for contact"],
        },
        phone: {
            type: String,
            required: [true, "Set phone for contact"],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

const Contact = model("contact", contactSchema);

export { Contact };