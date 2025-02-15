import React from "react";
import Spinner from "./Spinner";

export default function LoginForm({ email, password, handleInputChange, setPassword, handleLogin, isLoading }) {
  return (
    <div className="flex-1 bg-auth-bg flex text-text-normal flex-col justify-center items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Login to Devicode</h2>
      <form className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-text-light text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light bg-black bg-opacity-[0.25] border-text-light  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your Email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-text-light text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light bg-black bg-opacity-[0.25] border-text-light leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-theme-color-secondary transition-all duration-300 ease-in-out hover:bg-theme-color-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={(e) => handleLogin(e)}
          disabled={isLoading}
        >
          Login
        </button>
        {isLoading && (
          <div className="mt-4 w-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <div className="text-center mt-4">
          <span className="text-text-light mr-2">Don't have an account?</span>
          <a href="/signup" className="text-theme-color-primary hover:underline">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
