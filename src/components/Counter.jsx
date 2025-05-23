import { useSelector } from "react-redux";

const Counter = () => {
  const { count } = useSelector((state) => state.counter);

  console.log("data:", count);

  return (
    <div className="counter flex mt-2 items-center gap-2">
      <button
        className="bg-green-500 p-3 rounded-md"
        onClick={() => {
          () => {};
        }}
      >
        +
      </button>
      <span className="font-bold">{count}</span>
      <button className="bg-red-500 p-3 rounded-md" onClick={() => {}}>
        -
      </button>
    </div>
  );
};

export default Counter;
