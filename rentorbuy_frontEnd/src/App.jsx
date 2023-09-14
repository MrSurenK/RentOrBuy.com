import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import CmAccount from "./components/CmAccount";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import { useState } from "react";
import CmHistory from "./components/CmHistory";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [is_active, setIsActive] = useState("");
  const [nric, setNric] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberSince, setMemberSince] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [profilePic, setProfilePic] = useState(
    "/media/profile_pics/default.jpg"
  );

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
          lastLogin,
          setLastLogin,
          profilePic,
          setProfilePic,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="account" element={<CmAccount />} />
              <Route path="transactions" element={<CmHistory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
