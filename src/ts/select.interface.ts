import { Dispatch, SetStateAction } from "react";

interface SelectProps {
    text?: string;
    defaultValue?: string;
    options?: Array<any>;
    onChange: Dispatch<SetStateAction<string>>;
    className?:string;
  }
  
  export type { SelectProps };
  