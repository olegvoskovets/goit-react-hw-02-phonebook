import css from '../App/App.module.css';

const ContactsList = ({ visibleContacts, deleteContact }) => {
  return (
    <ul className={css.numberList}>
      {visibleContacts.map(contact => (
        <li key={contact.id} className={css.contactItem}>
          <span>{contact.name}</span>
          <span className={css.number}> : {contact.number}</span>
          <button
            className={css.deleteBtn}
            onClick={() => deleteContact(contact.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
