import { useEffect } from 'react';
import {
  selectContacts,
  selectIsError,
  selectIsLoading,
} from '../../redux/contactsSlice';
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

  const isloading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

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
      {isError && <h2>Something went wrong!</h2>}
      {isloading && <h2>Loading...</h2>}
      <ul className={css.list}>
        {visibleContacts.map(contact => (
          <Contact {...contact} key={contact.id} />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
