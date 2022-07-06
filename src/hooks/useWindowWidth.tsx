import { useEffect, useState } from "react";


function useWindowWidth(): number | undefined{
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);
  useEffect(() => {
    function handleResize() {
      setWindowSize( window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}

export default useWindowWidth;
