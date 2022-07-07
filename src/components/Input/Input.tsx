import React from "react";
import { InputProps } from "../../ts/input.interface";

function Input({ enable = true, defaultValue = "", placeHolder=""}: InputProps) {
  return (
    <div className="w-full mt-2">
      <input
        type="text"
        className={`
        ${enable? "bg-white text-textColor" : "bg-gray-100 text-gray-400"}
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
        focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none
      `}
        id="exampleFormControlInput1"
        disabled={!enable}
        defaultValue={defaultValue}
        placeholder={placeHolder}
      />
    </div>
  );
}

export default Input;
