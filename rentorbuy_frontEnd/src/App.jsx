import "./App.css";
import NavBar from "./components/NavBar";
import Rentals from "./components/Rentals";
import ForSale from "./components/ForSale";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import EditCmInfo from "./components/EditCmInfo";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="forsale" element={<ForSale />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profileInfo" element={<EditCmInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
