import Link from "next/link";
import React, { useState } from "react";
import { links } from "../../utils/links";

function MobileNavBar({
  isOpen,
  setIsOpen,
  touchStart,
}: {
  isOpen: boolean;
  setIsOpen: VoidFunction;
  touchStart: VoidFunction;
}) {
  return (
    <>
      {/* <div
        className={`${
          isOpen ? "bg-black/10 backdrop-blur-sm z-10" : "bg-black/0 z-0"
        } w-full h-[120vh] absolute overflow-hidden top-0 transition-[backdrop-filter] duration-500 ease-in-out`}
        onTouchStart={touchStart}
      ></div> */}
      <div
        className={`${
          isOpen ? "translate-x-0 " : "translate-x-full"
        } top-0 right-0 fixed h-screen w-full z-20 px-6 bg-white md:hidden flex transition-transform duration-500 ease-in-out `}
      >
        <ul className="w-full list-style-none">
          <li className="list-item mt-4" onClick={setIsOpen}>
            <span className="flex justify-end">
              <i className="bx bx-x text-4xl text-black opacity-60 hover:opacity-80 focus:opacity-80"></i>
            </span>
          </li>
          {links.map((link) => (
            <li className="p-2" key={link.href} onClick={setIsOpen}>
              <Link href={link.href}>
                <a className="text-black opacity-60 hover:opacity-80 focus:opacity-80 p-0" >
                  {link.nombre}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MobileNavBar;
