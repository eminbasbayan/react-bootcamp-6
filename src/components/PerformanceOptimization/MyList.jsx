import React, { useMemo } from "react";

const MyList = ({ items }) => {
  const sortedItems = useMemo(() => {
    console.log("list çalıştı");

    return items.sort((a, b) => b - a);
  }, [items]);

  const listItems = sortedItems;

  return (
    <ul>
      {listItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default MyList;
