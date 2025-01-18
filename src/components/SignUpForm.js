import React from "react";

export default function SignUpForm({
  email,
  password,
  handleInputChange,
  setPassword,
  user_name,
  setName,
  confirmPassword,
  setConfirmPassword,
  company_name, 
  setCompanyName,
  handleSignUp
}) {
  return (
    <div className="flex-1 bg-auth-bg flex text-text-normal flex-col justify-center items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Sign Up  to Devicode</h2>
      <form className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-text-light text-sm font-bold mb-2">
            User Name
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light bg-black bg-opacity-[0.25] border-text-light  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your User Name"
            value={user_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-text-light text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light bg-black bg-opacity-[0.25] border-text-light  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your Company Name"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
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
        <div>
          <label className="block text-text-light text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light bg-black bg-opacity-[0.25] border-text-light leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-theme-color-secondary transition-all duration-300 ease-in-out hover:bg-theme-color-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={(e) => handleSignUp(e)}
        >
          Signup
        </button>
        <div className="text-center mt-4">
          <span className="text-text-light mr-2">Already have an account?</span>
          <a
            href="/login"
            className="text-theme-color-primary hover:underline"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
