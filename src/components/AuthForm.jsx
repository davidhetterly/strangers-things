/* eslint-disable react/no-unescaped-entities */

import { useState, useContext } from "react";
import { loginUser, registerUser } from "../API";
import { logIn } from "../utils/util";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const { setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering && formData.password !== formData.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      let response;
      if (isRegistering) {
        response = await registerUser(formData.username, formData.password);
      } else {
        response = await loginUser(formData.username, formData.password);
      }

      if (response && response.data && response.data.token) {
        logIn(
          {
            username: formData.username,
            token: response.data.token,
          },
          setUser
        );
        alert("Successfully logged in!");
        navigate("/profile"); 
      } else if (response && !response.data.token) {
        alert("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        {isRegistering && (
          <label>
            Confirm Password:
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              required
            />
          </label>
        )}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      {isRegistering ? (
        <p>
          Already have an account?{" "}
          <Link to="#" onClick={() => setIsRegistering(false)}>
            Login here
          </Link>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}
          <Link to="#" onClick={() => setIsRegistering(true)}>
            Register here
          </Link>
        </p>
      )}
    </div>
  );
}

export default AuthForm;