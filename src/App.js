import React, { useState, useEffect } from "react";
import axios from 'axios'

import personService from './services/persons'

const Name = ({ persons, index }) => {
  return (
    <p>
      Name: {persons[index].name} <br /> Number: {persons[index].number}
    </p>
  );
};

const AllListItems = ({ persons, handleDeleteButtonClick }) => {
  return persons.map((name, index) => (
    <div key={index}>
      <Name persons={persons} index={index} />
      <button onClick={() => removeUser(res.id)}>
        Delete
      </button>
    </div>
  ));
};

const FilterList = ({ filter, persons }) => {
  const result = persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  if (result.length < 1) {
    return <p>No matches found.</p>;
  }

  return result.map((filteredPerson) => (
    <div>
      <p>
        Name: {filteredPerson.name} <br /> Number: {filteredPerson.number}
      </p>
      <button onClick={() => removeUser(res.id)}>
        Delete
      </button>
    </div>
  )
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')
  const addObject = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };


    const found = persons.some((el) => el.name === newName);
    if (found === true) {
      userExists(persons, id, newName, newNumber);
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const handleDeleteButtonClick = (id) => {
    if (window.confirm("Do you want to delete item?")) {

      personService.deleteObject(id)
      setPersons(
        persons.filter((person) => {
          return person.id !== id;
        })
      )
    }
  }

  const userExists = (persons, id, newName, newNumber) => {
    if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.id === id)
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addObject}>
        <div>
          Filter names containing:{" "}
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>

      <h3>Add new item</h3>

      <form onSubmit={addObject}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      {filter === "" ? (
        <AllListItems
          persons={persons}
          handleDeleteButtonClick={handleDeleteButtonClick}
        />
      ) : (
        <FilterList
          persons={persons}
          filter={filter} />
      )}
    </div>
  );
};

export default App;
