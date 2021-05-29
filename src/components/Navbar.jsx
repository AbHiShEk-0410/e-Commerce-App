import {
    faUser,
    faShoppingCart,
    faHeart,
    faHome,
    faPowerOff,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/front-logo.png"
import "./CSS/Navbar.css"
import { useLogin } from "../contexts";

export default function Home() {
    const { login, setLogin } = useLogin();
    const navigate = useNavigate();
    return (
        <div>
            <nav className="top-nav">
                <div>
                    <div className="linear-div left-nav-content">
                        <h1>Bakeful</h1>
                        <img className="" width="15%" src={logo}></img>
                    </div>
                </div>
                <div>
                    <div className="linear-div right-nav-content">
                        <Link to={{
                            pathname: "/home"
                        }}>
                            <div className="router">
                                <h3 className="router-heading">Home</h3>
                                <span className="router-icon">
                                    <FontAwesomeIcon icon={faHome} />
                                </span>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/cart"
                        }}>
                            <div className="router">
                                <h3 className="router-heading">Cart</h3>
                                <span className="router-icon">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </span>
                            </div>
                        </Link>

                        <Link to={{
                            pathname: "/wishlist"
                        }}>
                            <div className="router">
                                <h3 className="router-heading">Wishlist</h3>
                                <span className="router-icon">
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                            </div>

                        </Link>
                        <Link to={{
                            pathname: "/login"
                        }}>
                            <div style={{ display : !login ? "" : "none" }} className="router">
                                <h3 className="router-heading">Login</h3>
                                <span className="router-icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </Link>
                        <div style={{ display : login ? "inherit" : "none" }} className="profile router">
                            <h3 className="router-heading">User</h3>
                            <span className="router-icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <ul  className="drop-down-menu">
                                <Link to={{
                                    pathname: "/profile"
                                }}>
                                    <li className="drop-down-link">
                                        <div className="router">
                                            <h3 className="router-heading">Profile</h3>
                                            <span>
                                                <FontAwesomeIcon icon={faUserEdit} />
                                            </span>
                                        </div>
                                    </li>
                                </Link>
                                <li className="drop-down-link">
                                    <div onClick={() => {
                                        setLogin(false);
                                        navigate("/login");
                                        localStorage.clear();
                                    }} className="router">
                                        <h3 className="router-heading">Log Out</h3>
                                        <span className="router-icon">
                                            <FontAwesomeIcon icon={faPowerOff} />
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}