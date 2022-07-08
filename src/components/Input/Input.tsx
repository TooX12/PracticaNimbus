import React from "react";
import { InputProps } from "../../ts/input.interface";

function Input({ enable = true, defaultValue = "", placeHolder="", className=""}: InputProps) {
  return (
      <input
        type="text"
        className={`
        ${enable? "bg-white text-textColor" : "bg-gray-100 text-gray-400"}
        focus:outline-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        bg-clip-padding
        border border-solid border-dividerColor
        rounded
        transition
        ease-in-out
        m-0
        ${className}
      `}
        id="exampleFormControlInput1"
        disabled={!enable}
        defaultValue={defaultValue}
        placeholder={placeHolder}
      />
  );
}

export default Input;
