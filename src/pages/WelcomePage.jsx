import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h1>Greetings, Task Trove Explorer!</h1>
      <p>
        Are you ready to revolutionize the way you conquer your to-do lists? We
        present to you Task Trove, your all-in-one solution to task management,
        productivity, and the thrill of rewards!
      </p>
      <Link to="/tasktrove">
        <button>Enter as Admin</button>
        <button>Enter as User</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
