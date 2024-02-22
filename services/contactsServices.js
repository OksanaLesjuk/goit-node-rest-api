import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
// const contactsPath = path.resolve("../db/contacts.json");
// import { Contact } from "../models/contact";

const listContacts = async () => {
    const data = await fs.readFile(Contact);

    return JSON.parse(data);
}

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    return result || null;
}

const addContact = async (data) => {
    // const contacts = await listContacts();
    // const newContact = {
    //     id: nanoid(),
    //     ...data,
    // }
    // contacts.push(newContact);
    // await Contact.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // return newContact;
}


const removeContact = async (id) => {
    // const contacts = await listContacts();
    // const index = contacts.findIndex(contact => contact.id === id);
    // if (index === -1) {
    //     return null;
    // }
    // const [result] = contacts.splice(index, 1);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // return result;
}


const updateById = async (id, data) => {
    // const contacts = await listContacts();
    // const index = contacts.findIndex(contact => contact.id === id);
    // if (index === -1) {
    //     return null
    // }



    // contacts[index] = { ...contacts[index], ...data };


    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // return contacts[index]
}

export {
    listContacts,
    getContactById,
    addContact,
    updateById,
    removeContact,

}
