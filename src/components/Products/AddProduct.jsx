import React, { useState } from "react";
import Button from "../UI/Button";
import "./AddProduct.css";
import ProductInput from "./ProductInput";

const productInputs = [
  {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Bir Title Giriniz.",
  },
  {
    label: "Price",
    type: "number",
    name: "price",
    placeholder: "Bir Price Giriniz.",
  },
  {
    label: "Image URL",
    type: "text",
    name: "imageUrl",
    placeholder: "Bir Image URL Giriniz.",
  },
  {
    label: "Category",
    type: "text",
    name: "category",
    placeholder: "Bir Category Giriniz.",
  },
];

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

    // console.log(Object.keys(product));
    const isFormValid = Object.values(product).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Lütfen inputları doldurun!");
      return;
    }

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
      {productInputs.map((input, index) => (
        <ProductInput key={index} {...input} handleChange={handleChange} />
      ))}
      <Button color="success">Yeni Ürün Ekle</Button>
    </form>
  );
};

export default AddProduct;
