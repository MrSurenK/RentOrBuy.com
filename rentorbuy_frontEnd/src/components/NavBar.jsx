import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/rentorbuyicon.jpeg";
import { FaXmark, FaBars } from "react-icons/fa6";
import LoginModal from "./LoginModal";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //  set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });

  //   navitems array

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Rentals", path: "rentals" },
    { link: "For Sale", path: "forSale" },
  ];

  return (
    <>
      <header className="w-full bg-slate-100 shadow-lg fixed top-0 left-0 right-0">
        <nav
          className={`py-4 lg:px-14 px-4 ${
            isSticky
              ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
              : ""
          }`}
        >
          <div className="flex justify-between items-center text-base gap-8">
            <a
              href=""
              className="text-2xl font-semibold flex items-center space x-3"
            >
              <img
                src={logo}
                alt="company logo"
                className="w-10 inline-block items-center rounded-lg"
              />
              <span className="text-[#263232] px-1.5">RentOrBuy</span>
            </a>
            {/* nav items for large devices */}
            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => (
                <Link
                  to={path}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  key={path}
                  className="block text-base text-gray900 hover:text-primary first:font-medium"
                >
                  {link}
                </Link>
              ))}
            </ul>

            {/* btn for large devices */}
            <div className="space-x-12 hidden lg:flex items-center">
              <Link
                to="signup"
                className="hideen lg:flex items-center text-primary hover:text-gray900"
              >
                Sign Up
              </Link>
              <button
                className="bg-primary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGrey"
                onClick={() => setShowModal(true)}
              >
                Login
              </button>
            </div>
            {/* menu button for only mobile devices */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className=" text-neutralGrey focus:outline-none focus:text-grey-500"
              >
                {isMenuOpen ? (
                  <FaXmark className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6 " />
                )}
              </button>
            </div>
          </div>
          {/* nav items for mobile devices */}
          <div
            className={`space-y-4 px-4 mt-16 py-7 bg-primary ${
              isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
            }`}
          >
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="block text-base text-white hover:text-black first:font-medium"
              >
                {link}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <LoginModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div class="py-6 px-6 lg:px-8 text-left">
          <h3 class="mb-4 text-xl font-medium text-gray-900">Sign in</h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="youremail@gmail.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="bg-gray-50 border boder-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="w-20 h-10 bg-primary text-white py-2 px-4 transition-all duration-200 rounded hover:bg-neutralGrey
            rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </LoginModal>
    </>
  );
};

export default NavBar;
