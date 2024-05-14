import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Assets from "@/assets/Assets";

const navLinks = [
  { path: "/", icon: Assets.home, alt: "Home" },
  { path: "/search", icon: Assets.search, alt: "Search" },
  { path: "/communities", icon: Assets.community, alt: "Communities" },
  { path: "/profile", icon: Assets.profile, alt: "Profile" },
];

const BottomNavBar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location]);

  const renderNavLink = ({ path, icon, alt }) => {
    const isActive = activeNav === path;
    const activeClass = isActive ? "border-b-2 border-primary" : "";

    return (
      <Link
        to={path}
        onClick={() => setActiveNav(path)}
        className={activeClass}
        key={path}
      >
        <img className="h-8 w-8" src={icon} alt={alt} />
      </Link>
    );
  };
  return (
    <footer>
      <nav className="fixed bottom-0 left-0 flex w-full flex-row justify-between bg-secondary px-10 py-3 sm:justify-around">
        {navLinks.map(renderNavLink)}
      </nav>
    </footer>
  );
};

export default BottomNavBar;
