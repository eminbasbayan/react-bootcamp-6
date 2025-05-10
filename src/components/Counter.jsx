import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [fullName, setFullName] = useState("Emin Başbayan");
  const [isShowModal, setIsShowModal] = useState(false);

  /*  useEffect(() => {
    console.log("component ilk yüklendiğinde ve her güncellendiğinde çalışır!");
  }); */

  /*   useEffect(() => {
    console.log("component sadece ilk yüklendiğinde çalışır!");
  }, []); */

  useEffect(() => {
    console.log(
      "component ilk yüklendiğinde ve dependency list'e bağlı çalışır!"
    );
  }, [count, fullName]);

  useEffect(() => {
    if (isShowModal) {
      console.log("show modal");
    }
  }, [isShowModal]);

  return (
    <div className="counter flex mt-2 items-center gap-2">
      <div className="flex flex-col">
        {fullName}
        <button
          className="bg-gray-950 text-white p-1"
          onClick={() => setIsShowModal(true)}
        >
          İsmi Değiştir
        </button>
      </div>
      <button
        className="bg-green-500 p-3 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
      <span className="font-bold">{count}</span>
      <button
        className="bg-red-500 p-3 rounded-md"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
