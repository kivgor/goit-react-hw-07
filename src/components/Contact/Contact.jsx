import { HiUser, HiPhone } from 'react-icons/hi2';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

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
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </button>
      </li>
    </>
  );
};

export default Contact;
