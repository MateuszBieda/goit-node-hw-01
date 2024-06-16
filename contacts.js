const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { isUtf8 } = require("buffer");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.filter((contact) => contact.id == contactId);
      console.log(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const updatedList = contacts.filter((contact) => contact.id != contactId);

      fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2))
        .then(() => {
          console.log("Contact removed successfully.");
          console.log(updatedList);
        })
        .catch((err) => console.log("Error writing file:", err.message));
    })
    .catch((err) => console.log(err.message));
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
}

module.exports = { listContacts, getContactById, removeContact, addContact };
