import React, { useContext, useEffect, useState } from "react";
import logo from "/logo_with_bg.png";
import { FaRegUser } from "react-icons/fa6";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Usecart from "../hooks/Usecart";
import Profile from "./Profile";

function Navbar() {
  const [isSticky, setSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = Usecart();
  const location = useLocation();
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    refetch();
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
        setScrolled(true);
      } else {
        setSticky(false);
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refetch]);

  const navitems = (
    <>
      <li>
        <a
          href="/"
          className={`font-serif text-base hover:bg-[#edcfcfcd] ${
            location.pathname === "/" && !isScrolled
              ? "text-white"
              : "text-black"
          } hover:animate-pop `}
        >
          Home
        </a>
      </li>
      <li>
        <details className="group">
          <summary
            className={`font-serif text-base hover:bg-[#edcfcfcd] ${
              location.pathname === "/" && !isScrolled
                ? "text-white"
                : "text-black"
            } group-hover:animate-pop `}
          >
            Menu
          </summary>
          <ul className="p-2">
            <li>
              <a
                href="/menu"
                className={`font-serif ${
                  location.pathname === "/" && !isScrolled
                    ? "text-black"
                    : "text-black"
                }`}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="/menu"
                className={`font-serif ${
                  location.pathname === "/" && !isScrolled
                    ? "text-black"
                    : "text-black"
                }`}
              >
                Pizza
              </a>
            </li>
            <li>
              <a
                href="/menu"
                className={`font-serif ${
                  location.pathname === "/" && !isScrolled
                    ? "text-black"
                    : "text-black"
                }`}
              >
                Burger
              </a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  const iconColor =
    location.pathname === "/" && !isScrolled ? "text-white" : "text-black";

  return (
    <div>
      <div className="navbar text-red fixed top-0 right-0 left-0 transition-all duration-200 ease-in-out z-50">
        <div
          className={`navbar xl:px-24 ${
            isSticky
              ? "shadow-md bg-base-100 text-black transition-all duration-300 ease-in-out"
              : ""
          }`}
        >
          <div className="navbar-start flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2">
              <img className="w-16 h-14 rounded-xl" src={logo} alt="logo" />
            </a>
            <ul className="menu menu-horizontal flex space-x-4">{navitems}</ul>
          </div>
          <div className="navbar-center hidden lg:flex"></div>
          <div className="navbar-end">
            {user ? (
              <Link to={"/cart"}>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-ghost btn-circle mr-3 ${iconColor}`}
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {cart.length}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <></>
            )}
            {user ? (
              <Profile user={user} />
            ) : (
              <>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="btn hover:bg-red"
                >
                  <FaRegUser />
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
