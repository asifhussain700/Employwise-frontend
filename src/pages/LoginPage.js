import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Login</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Email</label>
        </div>
        <div className="field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className="field">
          <input type="submit" value="Login" onClick={handleLogin} />
        </div>
        <div className="signup-link">
          Build with  ❤️ for Global Groupware Solutions Ltd by <a href="https://transcendent-clafoutis-929de1.netlify.app/">Asif</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
