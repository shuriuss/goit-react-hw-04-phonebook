/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';
import s from './App.module.css';

const CONTACT_LOCALSTORAGE_KEY = 'users';

export class App extends Component {
  state = {
    contacts: [
      { id: 1, name: 'Rosie Simpson', number: '459-12-56' },
      { id: 2, name: 'Hermione Kline', number: '443-89-12' },
      { id: 3, name: 'Eden Clements', number: '645-17-79' },
      { id: 4, name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem(CONTACT_LOCALSTORAGE_KEY);
    console.log(localData);
    if (!localData) {
     return 
    }
    this.setState({
      contacts: localData ? JSON.parse(localData) : this.state.contacts,
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        CONTACT_LOCALSTORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handlerSearch = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  handleSubmit = newContact => {
    if (this.state.contacts.some(el => el.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevstate => ({
      contacts: prevstate.contacts.concat(newContact),
    }));
    console.log(this.state.contacts);
  };

  handleDelete = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedContacts = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedContacts)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <section className={s.section}>
        <h1>Phonbook</h1>
        <Form onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handlerSearch} />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </section>
    );
  }
}
