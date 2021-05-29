import "./CSS/signup.css"
import signup_banner from "../images/singup_banner.png"
import front_logo from "../images/front-logo.png"
import { useState, useEffect } from "react";
import { checkSignupParams } from "../utilities"
import axios from "axios";
export default function Signup() {
    const [userDetails, setUserDetails] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    });
    const [signupParamsOK, setSignupParamsOK] = useState(false);
    let checkerResponse;
    console.log("signup Params ",signupParamsOK)
    console.log(signupParamsOK)

    useEffect(() => {
        checkerResponse = checkSignupParams(userDetails)
        if (checkerResponse.success) {
            setSignupParamsOK(true);
        }
        else {
            setSignupParamsOK(false)
        }
    }, [userDetails])

    async function userSignup(event) {
        event.preventDefault();
        console.log("here")
        try {
            const serverResponse = await axios.post("https://database-1.joygupta1.repl.co/signup", {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            })
            console.log("success", serverResponse)
        }
        catch ({ response }) {
            console.log(response.data)
        }
    }

    return (

        <div className="signup-page">
            <div className="signup-content">
                <div className="signup-banner">
                    <img src={signup_banner}></img>
                </div>
                <div className="signup-card">
                    <div className="logo">
                        <img src={front_logo} alt="" />
                        <h3>bakeful</h3>
                    </div>
                    <div className="welcome-note">
                        <h1>Welcome to the Family</h1>
                    </div>
                    <div>
                        <p className="tag-line"> A workspace to millions where you cook together, stay together. </p>
                    </div>
                    <div className="signup-inputs">
                        <form class="signup-form" onSubmit={userSignup}>
                            <input onChange={(event) =>
                                setUserDetails({ ...userDetails, name: event.target.value })}
                                placeholder="Name"></input>
                            <input onChange={(event) =>
                                setUserDetails({ ...userDetails, email: event.target.value })}
                                placeholder="Email address"></input>
                            <input onChange={(event) =>
                                setUserDetails({ ...userDetails, password: event.target.value })}
                                placeholder="Password" type="password"></input>
                            <input onChange={(event) =>
                                setUserDetails({ ...userDetails, confirmPassword: event.target.value })}
                                placeholder="Confirm Password" type="password"></input>
                            <input disabled={!signupParamsOK} className="login-button" type="submit" value="Sign Up"></input>
                        </form>
                        <p style={{ color: "#b3a2a2" }}>Already have an account? {" "}
                            <a className="forgot-password" href="#">
                                Log In</a>
                        </p>
                    </div>
                </div>
            </div >
        </div>
    )
}