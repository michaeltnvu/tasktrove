import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div>
      <h1>Task Trove Store</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <Link to="/tasktrove">Back</Link>
    </div>
  );
};

export default TaskTroveStore;
