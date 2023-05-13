import "./App.css";
import React, { useEffect, useContext } from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import Create from "./Pages/Create";
import { onAuthStateChanged } from "firebase/auth";
import ViewPost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  },[]);
  return (
      <Post>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />} ></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/view" element={<ViewPost />}></Route>
    </Routes>
      </Post>
  );
}

export default App;
