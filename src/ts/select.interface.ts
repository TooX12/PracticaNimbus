import { Dispatch, SetStateAction } from "react";

interface SelectProps {
    text?: string;
    defaultValue?: string;
    options?: Array<any>;
    onChange: Dispatch<SetStateAction<string>>;
  }
  
  export type { SelectProps };
  