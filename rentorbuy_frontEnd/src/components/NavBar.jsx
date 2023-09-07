import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //to navigate to the different URLs from the header
  const navigate = useNavigate();

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
        <nav>
          <a
            href=""
            className="text-2xl font-semibold flex items-center space x-3"
          >
            <span className="text-[#263232]">RentOrBuy</span>
          </a>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
