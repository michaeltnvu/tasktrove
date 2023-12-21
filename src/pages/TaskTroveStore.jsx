import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_URL } from "../services/API_URL";

const TaskTroveStore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container>
        <h1>Task Trove Store</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
        <Link to="/tasktrove">Back</Link>
      </Container>
      <Footer />
    </div>
  );
};

export default TaskTroveStore;
