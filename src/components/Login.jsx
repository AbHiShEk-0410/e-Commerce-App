import "./CSS/Login.css"
import axios from "axios";
import { useLogin } from "../contexts";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { emailUsernameChecker } from "../utilities"

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Login() {
  const { state } = useLocation();
  const [userDetails, setUserDetails] = useState({});
  const [loginParams, setLoginParams] = useState(undefined);
  const { login, setLogin, setLoader } = useLogin()
  const navigate = useNavigate();
  console.log(login)
  let checkerResponse = false;
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

  async function Signup(e) {
    e.preventDefault();
    try {
      let loginResponse = await axios.post("https://database-1.joygupta1.repl.co/login", {
        [checkerResponse.type]: userDetails.user,
        password: userDetails.password
      })
      console.log(loginResponse)
      setLogin(true);
      localStorage.setItem("Login", JSON.stringify("true"));
      navigate(state === null ? "/product" : state.from);
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
          <form className="login-form" onSubmit={Signup}>
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