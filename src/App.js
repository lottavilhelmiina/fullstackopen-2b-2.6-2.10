import React, { useState, useEffect } from "react";
import axios from 'axios'

const Name = ({ persons, index }) => {
  return (
    <p>
      Name: {persons[index].name} <br /> Number: {persons[index].number}
      <br />
    </p>
  );
};

const AllListItems = ({ persons }) => {
  return persons.map((name, index) => (
    <Name key={persons.id} persons={persons} index={index} />
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
    <p>
      Name: {filteredPerson.name} <br /> Number: {filteredPerson.number}
      <br />
    </p>
  )
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  console.log('render', persons.length, 'persons')
  const addObject = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    const found = persons.some((el) => el.name === newName);
    if (found === true) {
      userExists(newName);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };
  const found = (filteredPerson) => {
    filteredPerson.some((el) => el.name === newName);
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

  const userExists = (newName) => {
    return window.alert(`${newName} is already added to phonebook`);
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
        <AllListItems key={persons.id} persons={persons} />
      ) : (
        <FilterList persons={persons} filter={filter} />
      )}
    </div>
  );
};

export default App;
