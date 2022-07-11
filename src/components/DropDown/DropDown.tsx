import { Fragment, useEffect } from "react";
import useToggle from "../../hooks/useToggle";
import { opciones } from "../../utils/menu.utils";
import RolMenu from "./RolMenu";

function DropDown({ show }: { show: boolean }) {
  const [showRolMenu, setShowRolMenu] = useToggle();

  useEffect(() => {
    if (!show && showRolMenu) setShowRolMenu(false);
  }, [show, showRolMenu, setShowRolMenu]);

  return (
    <Fragment>
      <ul
        className={`
        ${show ? "block" : "hidden"}
          w-64
          absolute
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          bg-clip-padding
          border-none
          top-12
          right-0
        `}
        aria-labelledby="dropdownMenuButton1"
      >
        <li className="flex py-2 px-6 space-x-4 items-center">
          <i className="bx bxs-user text-2xl px-3 py-2 bg-primaryColor rounded-full text-white"></i>
          <span className="flex flex-col">
            <p className="text-primaryColor font-medium">Nombre de usuario</p>
            <p className="text-sm">Rol del usuario</p>
          </span>
        </li>
        <hr className="h-0 my-2 border border-solid border-t-0 border-dividerColor" />
        {opciones.map(({ icon, text }, idx) => (
          <li key={idx}>
            {text === "Cambiar de rol" ? (
              <button
                onClick={setShowRolMenu}
                className="
              text-sm
              py-2
              px-6
              font-normal
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              flex
              items-center
            "
              >
                <i
                  className={`${icon} text-primaryColor font-medium text-2xl px-2 py-1 bg-btnLightColor rounded-full mr-4`}
                ></i>
                <p>{text}</p>
                <i className="bx bx-chevron-right text-primaryColor font-medium text-2xl absolute right-4"></i>
              </button>
            ) : (
              <button
                className="
              text-sm
              py-2
              px-6
              font-normal
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              flex
              items-center
            "
              >
                <i
                  className={`${icon} text-primaryColor font-medium text-2xl px-2 py-1 bg-btnLightColor rounded-full mr-4`}
                ></i>
                <p>{text}</p>
              </button>
            )}
          </li>
        ))}
      </ul>
      <RolMenu show={showRolMenu} setShow={setShowRolMenu} />
    </Fragment>
  );
}

export default DropDown;
