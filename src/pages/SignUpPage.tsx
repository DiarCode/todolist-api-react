import React from "react";
import Layout from "../components/Layout/Layout";

const SignUpPage = () => {
  return (
    <Layout>
      <div className="w-1/3 h-[55%] bg-gray-100 rounded-lg p-7 py-9 ">
        <div className="flex flex-col h-full">
          <h1 className="font-semibold text-2xl uppercase text-center">
            Sign Up
          </h1>

          <div className="flex flex-col gap-y-6 mt-10">
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

          <div className="mt-auto flex items-center justify-center">
            <button className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200">
              Signup
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
