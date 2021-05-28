import "./CSS/Login.css"
import axios from "axios";
import { useLogin } from "../contexts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emailUsernameChecker } from "../utilities"

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Login() {
  const [userDetails, setUserDetails] = useState({});
  const [loginParams, setLoginParams] = useState(undefined);
  const { login, setLogin, setLoader } = useLogin()
  let checkerResponse = false;
  console.log(loginParams)
  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("Login")));
  }, [login]);

  useEffect(() => {
    checkerResponse = emailUsernameChecker(userDetails);
    if (checkerResponse.success) {
      setLoginParams(true)
    }
    else {
      setLoginParams(false)
    }
  }, [userDetails])

  async function validation(e) {
    e.preventDefault();
    try {
      let loginResponse = await axios.post("https://database-1.joygupta1.repl.co/login", {
        [checkerResponse.type]: userDetails.user,
        password: userDetails.password
      })
      setLogin(true);
      localStorage.setItem("Login", JSON.stringify("true"));

    }
    catch ({ response }) {
      console.log(response.data)
    }
  }
  return (
    <div className="login">

      {/* Branding */}
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
          <form className="login-form" onSubmit={validation}>
            <input class="user-input"
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
            <input disabled={!loginParams} className="login-button" type="submit" value="Log In"></input>
          </form>

          <Link to={{
            pathname: "/login",
            search: "?forgot-password=true"
          }}><p className="forgot-password" href="#">
              Forgotten password?
            </p></Link>
        </div>
        <div className="separator">
          <hr />
        </div>
        <div>
          <Link to={{
            pathname: "/signup"
          }}>
            <button className="signup-button">Create an account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}