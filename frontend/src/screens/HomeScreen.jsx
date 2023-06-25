import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Product from "../components/Product";
// import products from "../products";
import axios from "axios";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <h2>{<Product product={product} />}</h2>
          </Col>
        ))}
      </Row>
    </>
  );
}
