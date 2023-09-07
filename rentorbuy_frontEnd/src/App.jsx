import "./App.css";
import NavBar from "./components/NavBar";
import Rentals from "./components/Rentals";
import ForSale from "./components/ForSale";
import Home from "./components/Home";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/forsale" element={<ForSale />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
