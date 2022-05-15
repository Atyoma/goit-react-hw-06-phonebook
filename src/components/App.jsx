
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { FormBox, Phonebook } from './ContactForm/ContactForm.styled';
import { ContactListBox } from './ContactList/ContactList.styled';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, changeFilter, deleteContact } from '../redux/contactSlice';

export default function App() {

const dispatch = useDispatch()
  const contacts = useSelector(state=>state.contacts.items)
  const filter = useSelector(state=>state.contacts.filter);

  const onDelete = name => dispatch(deleteContact(name));

 

  const matchСheck = data => {   

    if (contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    };
    
    dispatch(addContact(data));
    
  };

  const filterChange = e => {
    e.preventDefault();
    dispatch(changeFilter(e.currentTarget.value));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Phonebook>
      <FormBox>
        <h1>Phonebook</h1>
        <ContactForm submitHandle={matchСheck} />
      </FormBox>
      <ContactListBox>
        <h2>Contact List</h2>
        <Filter filter={filter} filterChange={filterChange} />
        {contacts.length ? (
          <ContactList contacts={filteredContacts} onDelete={onDelete} />
        ) : (
          <p>No any contacts</p>
        )}
      </ContactListBox>
    </Phonebook>
  );
}

