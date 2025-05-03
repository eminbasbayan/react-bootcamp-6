import React, { useState } from "react";
import Button from "../UI/Button";
import "./AddProduct.css";

const AddProduct = ({ setProducts }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  function handleChange({ target: { name, value } }) {
    setProduct({ ...product, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { imageUrl: image, price, title, category } = product;
    const newProduct = {
      id: Math.random(),
      title,
      price: Number(price),
      image,
      category,
    };

    setProducts((prevState) => [newProduct, ...prevState]);
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" onChange={handleChange} />
      </label>
      <Button color="success">Yeni Ürün Ekle</Button>
    </form>
  );
};

export default AddProduct;
