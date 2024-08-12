import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Fchat = () => {
  const location = useLocation();

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${process.env.REACT_APP_FCHAT_URL}"]`);

    const disallowedPaths = ["/auth", "/admin"];

    if (!existingScript && !disallowedPaths.includes(location.pathname)) {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_FCHAT_URL;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [location.pathname]);

  return null;
};

export default Fchat;
