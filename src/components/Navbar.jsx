import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { logOut } from "../utils/util";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) {
      return;
    }
    logOut(setUser);
    alert("Successfully logged out");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      {user ? (
        <>
          <Link to="/new-post">Create New Post</Link>
          <Link to="/profile">Profile</Link>
          <Link onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;