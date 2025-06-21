import React from 'react'

const MyButton = ({children, onClick}) => {
  console.log("MyButton re-render edildi");

  return (
    <button onClick={onClick} className='bg-blue-500 text-white p-2 rounded-md'>{children}</button>
  )
}

const MyButtonMemo = React.memo(MyButton);

export default MyButtonMemo;