import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/tasktrove">Dashboard</Link>
      <Link to="/tasktrove/calendar">Calendar</Link>
      <Link to="/tasktrove/about">About</Link>
      <Link to="/tasktrove/store">Store</Link>
    </div>
  );
};

export default Navbar;
