import {
  selectFilteredContacts,
  selectIsError,
  selectIsLoading,
} from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const isloading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const visibleContacts = useSelector(selectFilteredContacts);
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
