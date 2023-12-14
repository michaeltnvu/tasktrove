import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../services/API_URL";

const TaskTroveStore = () => {
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Task Trove Store</h1>
    </div>
  );
};

export default TaskTroveStore;
