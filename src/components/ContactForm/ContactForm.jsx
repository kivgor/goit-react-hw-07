import { Formik, Form, Field } from 'formik';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { addContact } from '../../redux/contactsSlice';

const initialValues = {
  username: '',
  number: '',
};

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleAdd = (values, actions) => {
    const nanoid = customAlphabet('1234567890', 5);
    const contactId = nanoid();

    const newContact = {
      id: contactId,
      name: values.username,
      number: values.number,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleAdd}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label>
          Username
          <Field className={css.field} type="text" name="username" />
        </label>
        <ErrorMessage className={css.error} name="username" component="span" />

        <label className={css.marginTop}>
          Number
          <Field className={css.field} type="text" name="number" />
        </label>
        <ErrorMessage className={css.error} name="number" component="span" />

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
