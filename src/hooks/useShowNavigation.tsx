import { useEffect } from "react";
import useToggle from "./useToggle";
import useWindowWidth from "./useWindowWidth";
import {
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";

function useShowNavigation() {
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useToggle();

  useEffect(() => {
    if (width !== undefined) {
      if (width > 768 && isOpen) {
        setIsOpen();
      }
    }

    if (isOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [width, isOpen]);

  const handleTouchStart = () => {
    if(isOpen){
      setIsOpen();
    }
  };

  return {width, isOpen, setIsOpen, handleTouchStart };
}

export default useShowNavigation;
