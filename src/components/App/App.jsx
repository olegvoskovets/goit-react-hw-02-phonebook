import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';
import contactsDefault from '../../Data/contacts.json';
import ContactsList from 'components/ContactsList/ContactsList';
import { ContactForm } from 'components/ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: contactsDefault,
    name: '',
    number: '',
    filter: '',
  };
  handleChange = e => {
    e.preventDefault();
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
  checkName = name => {
    const result = this.state.contacts.find(contact => contact.name === name);
    return result ? true : false;
  };

  addContact = e => {
    e.preventDefault();
    if (this.state.name !== '' || this.state.number !== '') {
      if (this.checkName(this.state.name)) {
        alert('Такий контакт вже існує !!!');
        return;
      }
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
  handleFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };
  render() {
    const visibleContacts = this.getVisibleContact();
    return (
      <div className={css.content}>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
          state={this.state}
          handleChange={this.handleChange}
        />

        <h2 className={css.contact}>Contacts</h2>
        <div className={css.contacts}>
          <div className={css.filter}>
            <span>Find contacts by name</span>
            <input
              type="text"
              name="filter"
              className={css.input}
              onChange={this.handleFilter}
              value={this.state.filter}
            />
          </div>

          <ContactsList
            visibleContacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
