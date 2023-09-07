import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <nav>
          <a
            href=""
            className="text-2xl font-semibold flex items-center space x-3"
          >
            <span className="text-[#263232]">RentOrBuy</span>
          </a>
          {/* nav items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link to={path} spy={true} smooth={true} offset={-100} key={path}>
                {link}
              </Link>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
