import React, { useState } from "react";

const Name = ({ persons, index }) => {
  return (
    <p>
      Name: {persons[index].name} <br /> Number: {persons[index].number}
      <br />
    </p>
  );
};
// Miten tän sais toimimaan? Nyt se ei toimi, jos lisää renderöitäväks,
// refreshaa vaan apin.
const Form = ({
  addObject,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040 345 6789", id: 0 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  function userExists(newName) {
    return window.alert(`${newName} is already added to phonebook`);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addObject}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((name, index) => (
        <Name key={persons.id} persons={persons} index={index} />
      ))}
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
