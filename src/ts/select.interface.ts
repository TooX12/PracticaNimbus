import { Dispatch, SetStateAction } from "react";

interface SelectProps {
    placeHolder?: string;
    defaultValue?: string;
    options?: Array<any>;
    onChange: Dispatch<SetStateAction<string>>;
    className?:string;
  }
  
  export type { SelectProps };
  