// import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
// import Status from "./components/Status";

function App() {
   return(
     <>
     <Navbar/>
     <Route exact path="/">
   <Home/>
   </Route>

   <Route path="/create">
   <Create/>
   </Route>

   <Route path="/edit">
   <Edit/>
   </Route>
     
   
     </>
   )
  
  
}

export default App;


//   <div className="App">
  //     <header className="App-header">
  //       <div>{fullname}</div>
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>