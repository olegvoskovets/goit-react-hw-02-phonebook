import { Component } from 'react';
import css from './App.module.css';
import contacts from '../../Data/contacts.json';

export class App extends Component {
  state = {
    contacts: contacts,
    name: '',
  };
  handleChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    return (
      <div className={css.content}>
        <form className={css.form}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>

          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}
