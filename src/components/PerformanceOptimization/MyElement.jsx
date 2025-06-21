import React from "react";
import MyParagraph from "./MyParagraph";

const MyElement = ({ show }) => {
  console.log("MyElement re-render edildi");
  
  return <MyParagraph>{show && "MyElement" }</MyParagraph>;
};

const MyElementMemo = React.memo(MyElement);

export default MyElementMemo;
