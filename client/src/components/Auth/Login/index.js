import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  let tokenSession = localStorage.getItem("auth-token");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("/users/login", loginUser);
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
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%,-30%)",
      }}
      className="container w-25"
    >
      {tokenSession ? (
        <Link to={"/"} className="text-info">
          <h2 className="mb-4" style={{ textAlign: "center", fontWeight: 300 }}>
            Revenir à votre session d'utilisateur
          </h2>
        </Link>
      ) : (
        <>
          <h1 className="mb-4">Login</h1>

          <form onSubmit={submit}>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="login-mail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
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
                id="login-password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <div style={{ display: "block" }} class="invalid-feedback">
                  {error}
                </div>
              )}
            </div>

            <button type="submit" class="btn btn-outline-info">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
