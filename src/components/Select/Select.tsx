import { SelectProps } from "../../ts/select.interface";

function Select({
  placeHolder = "Selecciona una opción",
  options = [],
  onChange,
  className = "",
}: SelectProps) {
  return (
    <select
      className={`
        appearance-none
        relative 
        block
        w-full
        px-3
        py-1.5
        pr-6
        text-base
        font-normal
        text-textColor
        bg-white bg-clip-border bg-no-repeat
        border-solid border-dividerColor
        rounded-md
        border-[1.75px]
        transition
        ease-in-out
        m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none
        bg-[url('images/arrow.svg')] bg-[center_right_0.75rem] bg-[length:16px_12px]
      ${className}`}
      defaultValue=""
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <option value="">{placeHolder}</option>
      {options.map((option) => (
        <option value={option._id} key={option._id}>
          {option.nombre ? option.nombre: option.usuario.nombres}
        </option>
      ))}
    </select>
  );
}

export default Select;
