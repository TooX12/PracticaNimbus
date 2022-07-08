import { opcionesRol } from "../../utils/menu.utils";

function RolMenu({ show, setShow }: { show: boolean; setShow: VoidFunction }) {
  return (
    <ul
      className={`
          ${show ? "block" : "hidden"}
          w-64
          h-80
          absolute
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          bg-clip-padding
          border-none
          top-12
          right-0
        `}
      aria-labelledby="dropdownMenuButton1"
    >
      <li className="flex py-2 px-6 space-x-4 items-center">
        <i
          className="bx bx-left-arrow-alt text-2xl rounded-full text-primaryColor cursor-pointer"
          onClick={setShow}
        ></i>
        <span className="flex flex-col">
          <p className="text-primaryColor font-medium">Cambiar de rol</p>
        </span>
      </li>
      <hr className="h-0 my-2 border border-solid border-t-0 border-dividerColor" />
      {opcionesRol.map(({ icon, text }, idx) => (
        <li key={idx}>
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
              className={`${icon} text-white font-medium text-2xl px-2 py-1 bg-primaryColor rounded-full mr-4`}
            ></i>
            <p>{text}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default RolMenu;
