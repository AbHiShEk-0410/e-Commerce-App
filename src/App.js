import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Product, Wishlist, Login, Cart, Loader, Signup, PrivateRoute, Navbar, Error404 } from "./components";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useLogin } from "./contexts";
function Forbidden() {
  return <h1>Nothing like that existss</h1>;
}
export default function App() {

  const { loader } = useLogin();

  return (
    <div className="App">
      <Navbar />
      {loader && <Loader />}
      <Routes>
        <Route path="/product">
          <Product />
        </Route>
        <PrivateRoute path="/cart">
          <Cart />
        </PrivateRoute>
        <PrivateRoute path="/wishlist">
          element = {<Wishlist />}
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="signup">
          <Signup />
        </Route>
        <Route path="/*">
          <Error404 />
        </Route>
      </Routes>
    </div>
  );
}