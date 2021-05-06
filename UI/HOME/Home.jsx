import {
    faUser,
    faCrown,
    faShoppingCart,
    faHeart,
    faHome,
    faPowerOff,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css"

export default function Home() {
    return (
        <div>
            <nav class="top-nav">
                <div>
                    <div class="linear-div left-nav-content">
                        <h1>Catalyst</h1>
                        <FontAwesomeIcon icon={faCrown} />
                    </div>
                </div>
                <div>
                    <div class="linear-div right-nav-content">
                        <div class="router">
                            <h3 class="router-heading">Home</h3>
                            <span class="router-icon">
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                        </div>
                        <div class="router">
                            <h3 class="router-heading">Cart</h3>
                            <span class="router-icon">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </span>
                        </div>

                        <div class="router">
                            <h3 class="router-heading">Wishlist</h3>
                            <span class="router-icon">
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        </div>
                        {/* <div class="router">
                            <h3 class="router-heading">Login</h3>
                            <span class="router-icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </div> */}

                        <div class="profile router">
                            <h3 class="router-heading">User</h3>
                            <span class="router-icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <ul class="drop-down-menu">
                                <li class="drop-down-link">
                                    <div class="router">
                                        <h3 class="router-heading">Profile</h3>
                                        <span>
                                            <FontAwesomeIcon icon={faUserEdit} />
                                        </span>
                                    </div>
                                </li>
                                <li class="drop-down-link">
                                    <div class="router">
                                        <h3 class="router-heading">Log Out</h3>
                                        <span class="router-icon">
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