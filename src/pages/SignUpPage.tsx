import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  // const [error, setError] = useState("");

  return (
    <Layout>
      <div className="w-1/4 bg-gray-100 rounded-lg p-7 py-9 ">
        <div className="flex flex-col h-full">
          <h1 className="font-semibold text-2xl uppercase text-center text-[#406ffa]">
            Sign Up
          </h1>

          <div className="flex flex-col gap-y-6 mt-10 mb-10">
            <div className="flex flex-col gap-y-1">
              <label className="px-4" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border-[0.1px] border-black"
                type="text"
                name="name"
                placeholder="Alexander"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="px-4" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border-[0.1px] border-black"
                type="text"
                name="email"
                placeholder="alexander@example.com"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="px-4" htmlFor="email">
                Password
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border-[0.1px] border-black"
                type="password"
                name="email"
                placeholder="password"
              />
            </div>
          </div>

          <div className="mt-auto flex items-center justify-center mb-6">
            <button className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200">
              Signup
            </button>
          </div>

          {/* <div className="flex justify-center mb-6">
            <p className="text-red-400">{error}</p>
          </div> */}

          <div className="flex justify-center items-center gap-x-2">
            <p className="text-gray-400">Already have an account?</p>
            <p className="text-[#406ffa] cursor-pointer">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
