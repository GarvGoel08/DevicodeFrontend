import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginViewer({passMask, email, password}) {
  const router = useNavigate();
  return (
    <div className="flex-1 bg-theme-color-tertiary text-text-normal flex flex-col justify-center items-center p-8">
      <div className="absolute top-4 left-4">
        <button onClick={() => router("/")} className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-1 px-4 w-max rounded-md">
          Go Back to Home
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-12">Welcome Back!</h1>
      <p className="mb-8 text-lg text-center">
        Please login to make backend development easier
      </p>
      <div className="bg-theme-color-primary p-4 rounded-lg shadow-lg w-full max-w-md h-32 overflow-hidden">
        <div className="text-lg font-mono text-wrap">
          Email:{" "}
          {email.split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
          <span className="animate-blink">|</span>
          <div>
            Password:{" "}
            {password.split("").map((_, index) => (
              <span key={index}>{passMask[index % passMask.length]}</span>
            ))}
            <span className="animate-blink">|</span>
          </div>
        </div>
      </div>
    </div>
  )
}
