import "./CSS/Login.css"
import { useLogin } from "../contexts";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Auth() {
  const navigate = useNavigate();
  const { login, setLogin, setLoader } = useLogin();
  const [userDetails, setUserDetails] = useState({});
  const { state } = useLocation();

  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("Login")));
  }, [login]);

  async function useValidation() {
    setLoader(true);
    if (userDetails.user === "Joy" && userDetails.password === "Password") {
      setLogin(true);
      localStorage.setItem("Login", JSON.stringify("true"));
      navigate(state === null ? "/" : state.from);
    }
    setLoader(false);
  }
  return (
    <div className="login">

      {/* Brading */}
      <div className="brand">
        <h1 className="brand-name">Bakeful</h1>
        <p>
          Bakeful belives{" "}
          <strong>"NO ONE IS A GREAT COOK, ONE LEARNS BY DOING"</strong>
        </p>
      </div>

      {/* Actual Login */}
      <div className="login-card">
        <div>
          <form className="login-form" onSubmit={useValidation}>
            <input
              onChange={(event) =>
                setUserDetails({ ...userDetails, user: event.target.value })
              }
              placeholder="Email address or username"></input>
            <input
              onChange={(event) =>
                setUserDetails({ ...userDetails, password: event.target.value })
              }
              placeholder="Password" type="password">
            </input>
            <input className="login-button" type="submit" value="Log In"></input>
          </form>
          <a className="forgot-password" href="#">
            Forgotten password?
            </a>
        </div>
        <div className="separator">
          <hr />
        </div>
        <div>
          <button className="signup-button">Create an account</button>
        </div>
      </div>
    </div>
  );
}