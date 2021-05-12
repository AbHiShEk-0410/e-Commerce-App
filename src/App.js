import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Product, Wishlist, Auth, Cart, Loader, Signup } from "./components";
import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts";
function Forbidden() {
  return <h1>Nothing like that existss</h1>;
}
export default function App() {

  const [hideNav, setHideNav] = useState(false);
  const { login, setLogin, loader } = useAuth();

  return (
    <div className="App">
      {/* <nav style={{ display: hideNav ? 'none' : 'block' }}>
        <Link to="/">
          Products
        </Link>{" "}
        |{" "}
        <Link to="/wishlist">
          Wishlist
        </Link>{" "}
        |{" "}
        <Link to="/cart">
          Cart
        </Link>{" "}
        | {login === false && <Link to="/login">Login</Link>}
        {login && <button onClick={() => setLogin(false)}>Logout</button>}
      </nav> */}

      {loader && <Loader />}
      <Routes>
        <Route exact path="/">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="signup">
          <Signup />
        </Route>
        <Route path="/*">
          <Forbidden />
        </Route>
      </Routes>
    </div>
  );
}