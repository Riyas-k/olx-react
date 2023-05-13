import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseContext } from "../../store/Context";
// import auth from "../../firebase/Config";
import { getFirestore } from "firebase/firestore";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const db = getFirestore();
  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: formData.name }).then(() => {
          const userDocRef = doc(collection(db, "users"), user.uid);
          const userData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            id: result.user.uid,
          };
          setDoc(userDocRef, userData).then(() => {
            navigate("/login");
          });
        });
      })
      .catch((err) => {
        setError(err.message);
        console.log("Error updating Profile :", err);
      });
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt="logo" src={Logo}></img>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={formData.name || ""}
            onChange={handleFormData}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={formData.email || ""}
            onChange={handleFormData}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={formData.phone || ""}
            onChange={handleFormData}
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
            onChange={handleFormData}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
