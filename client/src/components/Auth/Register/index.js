import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../../context/userContext";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("/users/register", newUser);
      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="container w-25 mt-5">
      <h2>Register</h2>

      <form onSubmit={submit}>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="register-mail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <div style={{ display: "block" }} class="invalid-feedback">
              {" "}
              {error}
            </div>
          )}
        </div>

        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="register-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div style={{ display: "block" }} class="invalid-feedback">
              {" "}
              {error}
            </div>
          )}
        </div>

        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            placeholder="Password confirmation"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          {error && (
            <div style={{ display: "block" }} class="invalid-feedback">
              {" "}
              {error}
            </div>
          )}
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
