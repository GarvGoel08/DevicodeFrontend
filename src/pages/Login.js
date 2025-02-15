import React, { useEffect, useState } from "react";
import LoginViewer from "../components/LoginViewer";
import LoginForm from "../components/LoginForm";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

export default function Login() {
  const { isLoggedIn } = useSelector((state) => (state.user && state.user.expiresIn > new Date().getTime()));
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passMask = "Secret, Look Away, You should be ashamed";

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/Dashboard";
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();

    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    fetch(`${backendURL}api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          delete data.user.password;
          delete data.user._id;
          dispatch(login({ userInfo: data.user, expiresIn: new Date().getTime() + 7*24*60*60*1000 }));
          window.location.href = "/Dashboard";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="flex max-sm:flex-col h-screen bg-main-bg">
      <LoginViewer passMask={passMask} password={password} email={email} />
      <LoginForm
        email={email}
        password={password}
        handleInputChange={handleInputChange}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
}
