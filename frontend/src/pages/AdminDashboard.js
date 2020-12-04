import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';

import { useState } from 'react';
import Axios from 'axios';


function AdminDashboard(){
    
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setNumber] = useState("");
    
    const [newnumber, setNewNumber] = useState(0);
    const [photo, setPhoto] = useState("");
    const [nameList, setNameList] = useState([]);

    const addData = () =>{
        Axios.post("http://localhost:3001/insert",{
            fullname:fullname, 
            email:email,
            phonenumber:phonenumber,
            photo:photo,
        });
        setNameList([
          ...nameList, 
          {Fullname:fullname, Email:email, Phonenumber:phonenumber, Photo:photo},
        ]);
     
      };

      /*useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) =>{
            console.log(response.data);
        });
      })*/
      const displayData = () => {
        
        Axios.get("http://localhost:3001/get").then((response) => {
          setNameList(response.data);
          console.log(response.data);
        });
      };
      
      const deleteData= (deleteName,deleteEmail,deleteNumber)=>{
        Axios.delete(`http://localhost:3001/delete/${deleteName}&&${deleteEmail}&&${deleteNumber}`);
      };

      const updateNumber = (fullname, email, phonenumber)=>{
        Axios.put("http://localhost:3001/update", {
            fullname:fullname, 
            email:email,
            phonenumber:newnumber,
        }).then(
          (response) => {
            setNameList(
              nameList.map((val) => {
                return val.email == email
                  ? {
                      fullname: val.fullname,
                      email: val.email,
                      phonenumber: val.newnumber,
                    }
                  : val;
              })
            );
          }
        );
        setNewNumber("");
      };

    return (
        <div className="App">
          <h1>Dashboard</h1>
          <div className = "addData">
            <label>Fullname</label>
            <input 
              type = "text" 
              name = "fullname"
              onChange = {(e)=>{
                setFullname(e.target.value);
              }} 
            />
            <label>Email</label>
            <input 
              type = "text" 
              name = "email"
              onChange = {(e)=>{
                setEmail(e.target.value);
              }}
            />
            <label>Phone Number</label>
            <input 
              type = "text" 
              name = "phonenumber"
              onChange = {(e)=>{
                setNumber(e.target.value);
              }}
            />
            <input type="file" id="file-input" name="photo" onChange = {(e)=>{
                setPhoto(e.target.value);
              }}/>
            
            <button onClick = {addData} >Register</button>
    
            <button onClick = {displayData} >Display</button>
    
            {nameList.map((value)=> {
              return ( 
                
                <h3>
                  
                  Name: {value.Fullname} Email:  {value.Email} Phonenumber: {value.Phonenumber}
                  <button onClick = {() => {deleteData(value.Fullname,value.Email,value.Phonenumber)}}>Delete</button>

                  <input 
                    type = "text" 
                    name = "newnumber"
                    onChange = {(e)=>{
                    setNewNumber(e.target.value);
                    }}
                  />
                  <button onClick = {() => {updateNumber(value.Fullname,value.Email,value.newnumber)}}>Update</button>
                
                </h3>
              );
            })}
          </div>
        </div>
      );
}

export default withRouter(AdminDashboard);