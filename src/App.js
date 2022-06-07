import { useState } from "react";

const Name = ({ persons, index }) => {
  return <p>{persons[index].name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: persons.length + 1
    };

    const found = persons.some((el) => el.name === newName);
    if (found === true) {
      userExists(newName);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  function userExists(newName) {
    return window.alert(`${newName} is already added to phonebook`);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
