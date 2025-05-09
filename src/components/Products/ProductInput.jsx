const ProductInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <label>
      {label}:
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
};

export default ProductInput;
