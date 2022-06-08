import React, { useState } from "react";

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
  return persons
    .filter((person) => person.name.includes(filter))
    .map((filteredPerson) => (
      <p>
        Name: {filteredPerson.name} <br /> Number: {filteredPerson.number}
        <br /> {console.log(filteredPerson.name)}
      </p>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

// Tässä vielä se, miten viittasin propseihin returnissa:
/*
<Form addobject={addObject} 
      newName={newName} 
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}/>
      */

/* ei toimi:
{filterIsEmpty === true ? (
  showAllListItems
) : (
filterList
)}
*/
