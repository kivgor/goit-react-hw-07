import { useEffect } from 'react';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/contactsOps';

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const phonebook = useSelector(selectContacts);
  const statusFilter = useSelector(selectNameFilter);

  const getVisibleContacts = (phonebook, statusFilter) => {
    const newPhonebook = phonebook.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(statusFilter.toLowerCase().trim())
    );
    return newPhonebook;
  };

  const visibleContacts = getVisibleContacts(phonebook, statusFilter);

  return (
    <>
      <ul className={css.list}>
        {visibleContacts.map(contact => (
          <Contact {...contact} key={contact.id} />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
