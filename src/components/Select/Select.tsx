import React from "react";
import useToggle from "../../hooks/useToggle";
import { SelectProps } from "../../ts/select.interface";

function Select({ text, options = [], onChange , className=""}: SelectProps) {
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
        onChange={(e) => onChange(e.target.value)}
      >
        <option  value="">
          {text}{" "}
        </option>
        {options.map(({ nombre, _id }) => (
          <option value={nombre} key={_id}>
            {nombre}
          </option>
        ))}
      </select>
  );
}

export default Select;
