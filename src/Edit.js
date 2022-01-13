import React, {useState} from 'react';
import { useParams, useNavigate} from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { ALL_USERS_QUERY, UPDATE_USER_MUTATION } from './Queries.js';
import "./App.css";


//Edit component
function Edit({allUsers}) {
  const { email } = useParams();
  const navigate = useNavigate();
  const selectedUser = allUsers.find((user) => user.email === email);
  const [ userName, setUserName] = useState (selectedUser.name);
  const [ userRole, setUserRole ] = useState (selectedUser.role);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {refetchQueries:[{query:ALL_USERS_QUERY} ] });
  
//handleUpdate function using updateUser mutation elements
  const handleUpdate= () => {
    updateUser({
      variables: {
        email,
        newAttributes: {
          name: userName,
          role: userRole
        }
      },
    });
      navigate("/"); //Navigate to home page
    };

    return (
      <div className="App">
        <main>
          <div className="row1">
            <button className= "saveButton"
              onClick={handleUpdate}>
                Save
            </button>
            <h1>{email}</h1>
          </div>
        <section>
          <div className="row2"
            style={{borderWidth: 0 }}>
            <h3>Name</h3>
            <h3>Role</h3>
          </div>
          <div>
          <input
            style={{width: "30%"}}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          </div>
          <div className="row3">
               <div>
                  <input
                    type="radio"
                    checked={userRole === "ADMIN"}
                    value="ADMIN"
                    onChange={(e) => setUserRole(e.target.value)}
                  />
                  <span>Admin</span>
                  </div>
                  <div>
                <input
                    type="radio"
                    checked={userRole === "DEVELOPER"}
                    value="DEVELOPER"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Developer</span>
                 </div>
                 <div>
                  <input
                    type="radio"
                    checked={userRole === "APP MANAGER"}
                    value="APP MANAGER"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>App Manager</span>
                 </div>
               <div>
                  <input
                    type="radio"
                    checked={userRole === "MARKETING"}
                    value="MARKETING"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Marketing</span>
                  </div>
                  <div>
                  <input
                    type="radio"
                    checked={userRole === "SALES"}
                    value="SALES"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Sales</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  
  export default Edit;