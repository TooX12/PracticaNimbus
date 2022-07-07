import React from "react";
import useToggle from "../../hooks/useToggle";

function Select({ text }: { text: string }) {
  const [display, setDisplay] = useToggle();
  return (
    <div className="w-full mt-2">
      <select
        className="
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
      "
        
        defaultValue={text}
      >
        <option value={text}>{text} </option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <div className="flex justify-center"></div>
    </div>
  );
}

export default Select;
