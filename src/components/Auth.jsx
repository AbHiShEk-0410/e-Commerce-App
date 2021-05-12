import { useAuth } from "../contexts";
import { useState, useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/Auth.css"

export default function Auth() {

  const { login, setLogin, setLoader } = useAuth();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("Login")));
  }, [login]);

  function useValidation() {
    setLoader(true);
    if (userDetails.username === "Joy" && userDetails.password === "Password") {
      setLogin(true);
      localStorage.setItem("Login", JSON.stringify("true"));
    }
    setLoader(false);
  }
  return (
    <div className="login">
      <div className="brand">
        <h1 className="brand-name">Bakeful</h1>
        <p>
          Bakeful belives{" "}
          <strong>"NO ONE IS A GREAT COOK, ONE LEARNS BY DOING"</strong>
        </p>
      </div>
      <div className="login-card">
        <div>
          <form className="login-form" onSubmit={useValidation}>
            <input
              onChange={(event) =>
                setUserDetails({ ...userDetails, username: event.target.value })
              }
              placeholder="Email address or username"></input>
            <input
              onChange={(event) =>
                setUserDetails({ ...userDetails, password: event.target.value })
              }
              placeholder="Password" type="password"></input>
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