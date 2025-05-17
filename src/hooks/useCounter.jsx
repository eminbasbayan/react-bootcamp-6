import { useEffect, useState } from "react";

const useCounter = (forwards = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (forwards) {
        setCount((prevState) => prevState + 1);
      } else {
        setCount((prevState) => prevState - 1);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [forwards]);

  return count;
};

export default useCounter;
