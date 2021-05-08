import "./CSS/signup.css"
import signup_banner from "../images/singup_banner.png"
import front_logo from "../images/front-logo.png"
import logo_back from "../images/logo-back.png"
import { getByDisplayValue } from "@testing-library/dom"
export default function Signup() {
    return (
        <div className="signup-page">
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

                    <form class="signin-form" onSubmit={() => console.log("s")}>
                        <input
                            placeholder="Name"></input>
                        <input
                            placeholder="Email address"></input>
                        <input
                            placeholder="Password" type="password"></input>
                        <input
                            placeholder="Confirm Password" type="password"></input>
                        <input className="login-button" type="submit" value="Sign Up"></input>
                    </form>
                    <p style={{ color: "#b3a2a2" }}>Already have an account {" "}
                        <a className="forgot-password" href="#">
                            Log In</a>
                    </p>


                </div>
            </div>
        </div >
    )
}