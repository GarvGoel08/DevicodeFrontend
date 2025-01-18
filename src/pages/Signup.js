import React, { useEffect, useState } from "react";
import SignupViewer from "../components/SignupViewer";
import SignUpForm from "../components/SignUpForm";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

export default function Signup() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/Dashboard";
    }
  }, [isLoggedIn]);

  const passMask = "Secret, Look Away, You should be ashamed.";

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    fetch(`${backendURL}api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, user_name, company_name }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(login({ userInfo: data.data }));
          window.location.href = "/Login";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="flex max-sm:flex-col h-screen bg-main-bg">
      <SignupViewer passMask={passMask} password={password} email={email} name={user_name} company_name={company_name}/>
      <SignUpForm email={email} handleSignUp={handleSignUp} password={password} handleInputChange={handleInputChange} setPassword={setPassword}  user_name={user_name} setName={setUserName} company_name={company_name} setCompanyName={setCompanyName} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/>
    </div>
  );
}
