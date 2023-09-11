import "./App.css";
import NavBar from "./components/NavBar";
import Rentals from "./components/Rentals";
import ForSale from "./components/ForSale";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import EditCmInfo from "./components/EditCmInfo";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import { useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [is_active, setIsActive] = useState(false);
  const [nric, setNric] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberSince, setMemberSince] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          setFirstName,
          first_name,
          setLastName,
          last_name,
          setIsActive,
          is_active,
          setNric,
          nric,
          setIsLoggedIn,
          isLoggedIn,
          memberSince,
          setMemberSince,
        }}
      >
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
      </UserContext.Provider>
    </>
  );
}

export default App;
