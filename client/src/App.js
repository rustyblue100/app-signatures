import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UserContext from "./context/userContext";

import Navbar from "./components/Navbar";
import EmployesList from "./components/EmployesList";
import CreatetEmploye from "./components/CreateEmploye";
import ListeCompagnies from "./components/ListeCompagnies";
import Signatures from "./components/Signatures";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Axios from "axios";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("/users/tokenIsValid/", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLogin();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />

        <Route path="/" exact component={EmployesList} />
        {/*  <Route path="/employes" component={EmployesList} /> */}
        <Route path="/ajouter-employe" component={CreatetEmploye} />
        <Route path="/liste" exact component={ListeCompagnies} />
        <Route path="/signatures" component={Signatures} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
