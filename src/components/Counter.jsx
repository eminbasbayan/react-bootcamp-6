import { useRef, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  console.log("component re-render edildi");

  const handleIncrement = () => {
    // setCount(count + 1);
    countRef.current++;
    console.log("countRef.current:", countRef.current);
  };

  const handleDecrement = () => {
    // setCount(count - 1);
    countRef.current--;
    console.log("countRef.current:", countRef.current);
  };
  return (
    <div className="counter flex mt-2 items-center gap-2">
      <button className="bg-green-500 p-3 rounded-md" onClick={handleIncrement}>
        +
      </button>
      <span className="font-bold">{countRef.current}</span>
      <button className="bg-red-500 p-3 rounded-md" onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};

export default Counter;
