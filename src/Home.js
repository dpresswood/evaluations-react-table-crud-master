import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ALL_USERS_QUERY, DELETE_USER_MUTATION } from './Queries.js';
import "./App.css";


function Home({allUsers}) {

  const [ deleteUsers ]  = useMutation(DELETE_USER_MUTATION, {refetchQueries:[{query:ALL_USERS_QUERY} ] });
  const [ emails, setEmails ] = useState([]);//initalize empty array


  //handleSubmit function using deleteUser mutation elements
  const handleSubmit = () => {
    deleteUsers({
      variables: {
        emails 
      }

    });
  }

  const handleCheck = (evt, email) => {
    if (evt.target.checked){
    setEmails([...emails, email])
   
  } else{
    setEmails(emails.filter(item => item !== email))
  }

}
     
return  (
  <div className="App">
    <main>
      <div className="row1"
        style={{border: 0}}>
      <button className= "deleteButton"

        onClick={handleSubmit}  disabled={!emails.length}
        style={{
          marginBottom: -125,
      }} > 
        Delete
      </button>      
      </div>
        <h1>Users </h1>
    <section>
      <div className="row2">
        <h4>EMAIL</h4>
        <h4>NAME</h4>
        <h4>ROLE</h4>
      </div>
        {allUsers.map((user) => (
        <Link
          to={`/edit/${user.email}`}
          key={user.email}
          style={{ textDecoration: "none", color: "black"}}
        >
      <div className="row2">
       
        <input 
            type="checkbox" 
            value={user}
            onChange={ e => handleCheck(e, user.email)}
            onClick={e => e.stopPropagation()}/>
          <p>{user.email}</p>
          <p>{user.name}</p>
          <p style={{ textTransform: "lowercase"}}>{user.role}</p>
       
      </div>     
        </Link> 
          ))}
        </section>
      </main>
    </div> 
     );
  }


export default Home;


 
