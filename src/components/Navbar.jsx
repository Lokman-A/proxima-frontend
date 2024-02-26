import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between font-medium border-b border-sky-900 text-sky-400">
      <Link to="/">PROXIMA </Link>
    </div>
  );
};

export default Navbar;
