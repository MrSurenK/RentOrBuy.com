import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/rentorbuyicon.jpeg";
import { FaXmark, FaBars } from "react-icons/fa6";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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
    <div>
      <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
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
              <span className="text-[#263232]">RentOrBuy</span>
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
              <a
                href="/"
                className="hideen lg:flex items-center text-primary hover:text-gray900"
              >
                Login
              </a>
              <button className="bg-primary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGrey">
                Sign Up
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
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
