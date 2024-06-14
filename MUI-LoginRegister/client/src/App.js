import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react"
import Protected from "./components/Protected";
import Hom from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Register";
import "./components/form.css"

function App() {
  return (
    <div>
      <>
      <BrowserRouter>
      <Routes>
        <Route element={<Protected/>}>
          <Route path="/home" element={<Hom/>}/>
        </Route>
        <Route path="/" element={ <Signup/> }/>
        <Route path="/login" element={ <Login/> }/>
      </Routes>

      </BrowserRouter>
      </>
    </div>
  );
}

export default App;
