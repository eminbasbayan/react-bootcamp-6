import React from "react";

const ProductInput = ({ label, type, name, placeholder, handleChange }) => {
  return (
    <label>
      {label}:
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  );
};

export default ProductInput;
