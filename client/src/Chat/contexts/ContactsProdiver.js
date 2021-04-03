import React, { useContext } from "react";
import useLocalStorage from "../useLocalStorage";

const ContactsProvider = ({ children }) => {
  const ContactsContext = React.createContext();

  const useContacts = () => {
    return useContext(ContactsContext);
  };

  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
