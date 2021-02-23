import React, { useState, useEffect } from "react";

import Axios from "axios";

import CardItem from "./Cartitem";

import { random, commerce } from "faker";
import { Container, Col, Row } from "reactstrap";
const apiKey = "563492ad6f91700001000001c3fb127202bc41639d0edd235c491ff2";
// "INSERT_YOUR_KEY_HERE"

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";

// const localUrl =
//   "https://jsonware.com/json/3631f2ed0b38f18d32387d6c5c92c665.json";

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  const fetchPhotos = async () => {
    try {
      const { data } = await Axios.get(url, {
        headers: {
          Authorization: apiKey,
        },
      });

      //   const fetchPhotos = async () => {
      //     const { data } = await Axios.get(localUrl);

      const { photos } = data;

      const allProduct = photos.map((photo) => ({
        smallImage: photo.src.medium,
        tinyImage: photo.src.tiny,
        productName: random.word(),
        productPrice: commerce.price(),
        id: random.uuid(),
      }));
      console.log(allProduct);

      setProduct(allProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CardItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default BuyPage;
