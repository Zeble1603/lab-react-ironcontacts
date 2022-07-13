// src/App.js
import "./App.css";
import { useState } from "react";
import contactsData from "./contacts.json"
import Table from 'react-bootstrap/Table';
import Button  from "react-bootstrap/Button";

function App() {
  const [contacts,setContact] = useState(contactsData.slice(0,5))
  function addRandomContact() {
    let index = Math.floor(Math.random() * contactsData.length)
    let newContact = contactsData[index]
    if(!contacts.includes(newContact)){
      setContact([...contacts,newContact])
    }else{
      addRandomContact()
    }
  }
  function sortByName() {
    const sorted = [...contacts].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    setContact(sorted)
  }
  function sortByPopularity() {
    const sorted = [...contacts].sort((a,b) => b.popularity - a.popularity)
    setContact(sorted)
  }

  function removeContact(id){
    const newArray = [...contacts].filter(contact => contact.id !== id)
    setContact(newArray)
  }

  return (
  <div className="App">
    <h1>Ironhack contact list</h1>
    <div id="buttons">
      <Button variant="info" onClick={addRandomContact}>ADD RANDOM CONTACT</Button>
      <Button variant="info" onClick={sortByName}>SORT CONTACT BY NAME</Button>
      <Button variant="info" onClick={sortByPopularity}>SORT CONTACT BY POPULARITY</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {contacts.map((contact)=>{
        return(
          <tr>
            <td><img src={contact.pictureUrl} alt="pic" className="actorPic"></img></td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            {contact.wonOscar ? (<td>🏆</td>) : (<td></td>)}
            {contact.wonEmmy ? (<td>🏆</td>) : (<td></td>)}
            <td><Button variant="danger" onClick={()=>removeContact(contact.id)}>Delete</Button></td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  </div>)
}
export default App;
