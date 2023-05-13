import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({});
  const { auth } = useContext(FirebaseContext);
  
  const navigate = useNavigate();
  const handleForm = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" alt="logo" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={formData.email || ""}
            onChange={handleForm}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={formData.password || ""}
            onChange={handleForm}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
