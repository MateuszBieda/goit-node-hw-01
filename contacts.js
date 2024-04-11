const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = require("./db/contacts.json");
const { isUtf8 } = require("buffer");
// const contactsPath = path.parse();
// const contactsPath = path.basename("./db/contacts.json");

// TODO: udokumentuj każdą funkcję
function listContacts() {
  fs.readFile("./db/contacts.json")
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile("./db/contacts.json")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.filter((contact) => contact.id == contactId);
      console.log(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile("./db/contacts.json")
    .then((data) => {
      const contacts = JSON.parse(data);
      const updatedList = contacts.filter((contact) => contact.id != contactId);
      console.log(updatedList);
    })
    .catch((err) => console.log(err.message));
}

async function addContact(name, email, phone) {
  const data = await fs.readFile("./db/contacts.json", "utf-8");
  const contacts = JSON.parse(data);

  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    "./db/contacts.json",
    JSON.stringify(contacts, null, 2),
    "utf-8"
  );
}
//listContacts();
//getContactById("drsAJ4SHPYqZeG-83QTVW");
//removeContact("qdggE76Jtbfd9eWJHrssH");
//addContact("Jan Nowak", "jnowak@gmail.com", "(989) 565-5656");

module.exports = { listContacts, getContactById, removeContact, addContact };
