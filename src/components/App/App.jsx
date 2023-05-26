import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';
import contactsDefault from '../../Data/contacts.json';

export class App extends Component {
  state = {
    contacts: contactsDefault,
    name: '',
    number: '',
  };
  handleChange = e => {
    switch (e.target.name) {
      case 'name':
        this.setState({
          name: e.target.value,
        });
        break;
      case 'number':
        this.setState({
          number: e.target.value,
        });
        break;
      default:
        console.log('error');
    }
  };

  addContact = e => {
    e.preventDefault();
    if (this.state.name !== '' || this.state.number !== '') {
      const newContact = {
        id: nanoid(),
        name: this.state.name,
        number: this.state.number,
      };
      this.setState(prevState => ({
        contacts: [...this.state.contacts, newContact],
        // prevState.contacts.push(newContact),
      }));
      this.state.name = '';
      this.state.number = '';
    }
  };
  render() {
    // model.id = nanoid();
    return (
      <div className={css.content}>
        <form className={css.form} onSubmit={this.addContact}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              // onChange={this.handleChange}
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />

          <button type="submit">Add contact</button>
        </form>

        <div className="contacts">
          <span>Contacts</span>
          <ul>
            {this.state.contacts.map(contact => (
              <li key={contact.id}>
                <span>{contact.name}</span>
                <span> : {contact.number}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
