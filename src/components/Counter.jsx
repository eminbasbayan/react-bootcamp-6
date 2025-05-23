import { useSelector, useDispatch } from "react-redux";
import { arttir, azalt } from "../redux/counterSlice";

const Counter = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  console.log("data:", count);

  return (
    <div className="counter flex mt-2 items-center gap-2">
      <button
        className="bg-green-500 p-3 rounded-md"
        onClick={() => dispatch(arttir())}
      >
        +
      </button>
      <span className="font-bold">{count}</span>
      <button
        className="bg-red-500 p-3 rounded-md"
        onClick={() => dispatch(azalt())}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
