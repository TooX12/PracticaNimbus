import React, { useEffect, useState } from "react";
import MobileNavBar from "./MobileNavBar";

import { links } from "../../utils/links.utils";
import useShowNavigation from "../../hooks/useShowNavigation";

function NavBar() {
  const { width, isOpen, setIsOpen, handleTouchStart } = useShowNavigation();

  return (
    <nav className="h-20 sticky top-0 z-20 max-w-12xl mx-auto flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg">
      {/* {width && width < 768 && (
        <MobileNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          touchStart={handleTouchStart}
        />
      )} */}
      <div className="w-full flex flex-grow items-center justify-between px-3 sm:px-6">
          <a className="text-xl sm:text-2xl basis-0 flex-grow-1 min-w-[5rem] md:min-w-[10rem] lg:min-w-[15rem] text-white font-semibold">
            Ecommerce
          </a>

        <ul className="hidden md:relative md:flex list-style-none flex-grow-0">
          {links.map((link) => (
            <li className="p-2" key={link.href}>
                <a className="text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0">
                  {link.nombre}
                </a>
            </li>
          ))}
        </ul>
        <ul className="flex pr-0 basis-0 flex-grow-1 min-w-[5rem] md:min-w-[10rem] lg:min-w-[15rem] justify-end list-style-none">
          <li className="p-1.5 sm:p-2">
              <a className="text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0">
                <i className="bx bx-heart text-2xl"></i>
              </a>
          </li>
          <li className="p-1.5 sm:p-2">
              <a
                className="text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
              >
                <i className="bx bx-user text-2xl"></i>
              </a>
          </li>
          <li className="p-1 sm:p-2 list-item md:hidden" onClick={setIsOpen}>
            <i className="bx bx-menu text-2xl text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
