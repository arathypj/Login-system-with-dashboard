import { useState } from 'react';
import './App.css';
import Axios from 'axios';

import {BrowserRouter, Route, useHistory, Link, Redirect} from 'react-router-dom';
import Protected from './Protected';
import AdminDashboard from './pages/AdminDashboard';


function App() {

  const [isAuth, setIsAuth] = useState(false);
  //const history = useHistory();
  const [loginusername, setUsername] = useState("");
  const [loginpassword, setPassword] = useState("");
  
  /*const redirect = () => {
    if(isAuth){
      <Route></Route>
      //history.push('/admin');
       return <Redirect to='/admin' />
      
    }
  }*/
  
  
  const loginData = () =>{
    if(loginusername === 'ortecnite' && loginpassword == 123){
      console.log("login data Match");
      setIsAuth(true);
      Axios.post("http://localhost:3001/login",{
        loginusername:loginusername, 
        loginpassword:loginpassword,
      }).then((response) =>{
        
        console.log(response.data);
      }); 
    }else{
      setIsAuth(false);
      console.log("login data Error");
    }
  };


  return (
    <BrowserRouter>
      <Route path="/" exact>
        <h1>Admin login</h1>
        <label>Username</label>
        <input 
          type = "text" 
          name = "username"
          onChange = {(e)=>{
            setUsername(e.target.value);
          }} 
        />
        <label>Password</label>
        <input 
          type = "text" 
          name = "password"
          onChange = {(e)=>{
            setPassword(e.target.value);
          }}
        />
        <button onClick= {loginData} >Login</button>
        <button onClick= {()=>{setIsAuth(false)}} >Logout</button>
        <Link to= "/admin">Go to Dashboard</Link>
      </Route>
      <Protected path='/admin' component={AdminDashboard} isAuth={isAuth} />
    </BrowserRouter>
);
}

export default App;
