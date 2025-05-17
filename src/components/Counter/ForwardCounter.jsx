import { useEffect, useState } from "react";

const ForwardCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <strong>{count}</strong>;
};

export default ForwardCounter;
