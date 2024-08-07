import Logo from "../components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { trackEvent } from "../analytics";
import { API_URL } from "../../config/global";

import "../styles/Login.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send signup attempt event to Google Analytics
    trackEvent("User", "Attempted SignUp", formData.email);

    try {
      const response = await axios.post(`${API_URL}/signup/verify`, formData);
      if (response.data === "verifyUserAdded") {
        alert("Registeration link has sent to your email id");
        navigate("/login");
      } else if (response.data === "verifyUserExist") {
        alert("Registeration link already sent to your email id");
      } else if (response.data === "userExist") {
        alert("User already exist");
      } else if (response.data === "Server Busy") {
        alert("Verify your email id");
      }
    } catch (e) {
      console.error("Error during registeration: ", e);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Logo />
        <h1>Signup</h1>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
        <p>
          Already have an account?&nbsp;<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
