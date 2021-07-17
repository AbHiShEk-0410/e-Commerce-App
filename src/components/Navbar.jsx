import "./CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogin } from "../contexts";
import {
	faUser,
	faPowerOff,
	faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/front-logo.png";

export default function Home() {
	const { login, setLogin } = useLogin();
	const accessToken = JSON.parse(localStorage.getItem("accessToken"));
	const isUserLogin = JSON.parse(localStorage.getItem("isUserLogin"));
	console.log(accessToken)
	console.log(isUserLogin)
	if (!!accessToken || !!isUserLogin) {
		setLogin(true);
	} else {
		setLogin(false);
	}
	const navigate = useNavigate();

	return (
		<div>
			<nav className="top-nav">
				<div>
					<Link
						className="Link"
						to={{
							pathname: "/",
						}}
					>
						<div className="linear-div left-nav-content">
							<h1>Bakeful</h1>
							<img className="" width="35%" src={logo} alt="Logo"></img>
						</div>
					</Link>
				</div>
				<div>
					<div className="linear-div right-nav-content">
						<Link
							className="Link"
							to={{
								pathname: "/product",
							}}
						>
							<div className="router">
								<h3 className="router-heading">Product</h3>
							</div>
						</Link>
						<Link
							className="Link"
							to={{
								pathname: "/cart",
							}}
						>
							<div className="router">
								<h3 className="router-heading">Cart</h3>
							</div>
						</Link>

						<Link
							className="Link"
							to={{
								pathname: "/wishlist",
							}}
						>
							<div className="router">
								<h3 className="router-heading">Wishlist</h3>
							</div>
						</Link>
						<Link
							style={{ display: !login ? "" : "none" }}
							className="Link"
							to={{
								pathname: "/login",
							}}
						>
							<div className="router">
								<h3 className="router-heading">Login</h3>
							</div>
						</Link>
						<div
							style={{ display: login ? "inherit" : "none" }}
							className="user-setting router"
						>
							<h3 className="router-heading">User</h3>
							<span className="router-icon">
								<FontAwesomeIcon icon={faUser} />
							</span>
							<ul className="drop-down-setting">
								<li className="drop-down-link">
									<Link
										style={{ width: "100%" }}
										className="Link"
										to={{
											pathname: "/profile",
										}}
									>
										<div className="router">
											<h3 className="router-heading">Profile</h3>
											<span>
												<FontAwesomeIcon icon={faUserEdit} />
											</span>
										</div>
									</Link>
								</li>

								<li className="drop-down-link">
									<div
										onClick={() => {
											setLogin(false);
											navigate("/login");
											localStorage.clear();
										}}
										className="router"
									>
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
	);
}
