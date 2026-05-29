import React, { useState } from "react";
import { Link } from "react-router-dom";

import { NavLink } from "@components/common";
import { styles } from "@styles/styles";
import { navLinks } from "@config/constants";
import { logo, menu, close } from "@assets";
import { useScrollPosition } from "@hooks";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const scrolled = useScrollPosition(100);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Sarvesh &nbsp;
            <span className='sm:block hidden'> | Sarvesh Damle</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <NavLink key={nav.id} nav={nav} active={active} onClick={() => setActive(nav.title)} />
          ))}
        </ul>
        {/* This div is for mobile */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            className='w-[28px] h-[28px]'
            onClick={() => setToggle(!toggle)}
          >
            <img src={toggle ? close : menu} alt='' className='w-full h-full object-contain' />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <NavLink
                  key={nav.id}
                  nav={nav}
                  active={active}
                  variant='mobile'
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
