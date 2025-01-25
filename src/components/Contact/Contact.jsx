import { HiUser, HiPhone } from 'react-icons/hi2';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <li className={css.listItem}>
        <div className={css.buttonThumb}>
          <div className={css.iconThumb}>
            <HiUser size="24" />
            <p className={css.name}>{name}</p>
          </div>
          <div className={css.iconThumb}>
            <HiPhone size="24" />
            <p>{number}</p>
          </div>
        </div>
        <button
          type="button"
          className={css.button}
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </li>
    </>
  );
};

export default Contact;
