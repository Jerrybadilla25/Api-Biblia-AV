//import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import Home from './Vistas/Home';
import Login from './Login/Login';
import toast, { Toaster } from "react-hot-toast";




function App(props) {

    //toaster
  const notify = (mesage) =>
    toast.success(`${mesage}`, {
      duration: 5000,
      position: "top-left",
      style: {
        background: "#f3f4f6",
        color: "#140e1b",
      },
    });

  const [user, setUser]=useState({});
  const [FormUser, setFormUser]=useState({});
  const http= "http://api.biblia.genesis2-7.ml";
  //const http = " http://localhost:4003";
  

  const LoginOut = ()=>{
    setUser({});
    setFormUser({});
  }

  
  const datosFormLogin = (e) => {
    setFormUser({
      ...FormUser,
      [e.target.name]: e.target.value,
    });
  };

  const getUser= async(e)=>{
    e.preventDefault();
    const data = await fetch(`${http}/user/login`,{
          method: "POST",
          body: JSON.stringify(FormUser),
          headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             
      },
    });
    const res = await data.json();
    console.log(res);
    if(res.message){
      notify(res.message);
    }else{
      setUser(res);
      notify("Success");
    }
  }

  return(
    
      <div>
        {
          user._id 
          ?
          <Home http={http} user={user} LoginOut={LoginOut}/>
          :
          <Login datosFormLogin={datosFormLogin} getUser={getUser}/>
        }
       <Toaster />  
      </div>
      
    
  )
}

export default App;
