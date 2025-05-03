import React, { useState } from "react";
import Button from "../UI/Button";
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleImageChange(event) {
    setImageUrl(event.target.value);
  }

  return (
    <form className="add-product-form">
      {title} <br />
      {price} <br />
      {imageUrl} <br />
      <label>
        Title:
        <input type="text" name="title" onChange={handleTitleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" onChange={handlePriceChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" onChange={handleImageChange} />
      </label>

      <Button color="success">Yeni Ürün Ekle</Button>
    </form>
  );
};

export default AddProduct;
