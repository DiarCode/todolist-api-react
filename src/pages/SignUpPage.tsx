import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ISignup, IUser } from "../types/auth/user.type";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import authSliceActions, { selectAuthUser } from "../store/slices/authSlice";
import { signup } from "../api/auth/auth.api";

const SignUpPage = () => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = user !== null;

    if (isAuth) {
      navigate(-1);
    }
  }, [navigate, user]);

  const onSignupClick = async () => {
    const values = [email, password, name];
    if (values.some(value => value === "")) {
      return;
    }

    const signupDto: ISignup = {
      name,
      email,
      password,
    };

    setIsLoading(true);
    const res = await signup(signupDto);

    if (res.code !== 200) {
      setError(res.message);
      setIsLoading(false);
      return;
    }

    const data = res.data;
    const user: IUser = {
      avatar: "",
      id: data.user_id,
      email: data.email,
      name: data.name,
    };

    dispatch(authSliceActions.setAuth({ user, token: data.token }));
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user_id", JSON.stringify(user.id));
    setIsLoading(false);

    navigate("/");
  };

  return (
    <Layout title={"Signup"}>
      <div className="w-[400px] bg-gray-100 rounded-lg p-7 py-9 ">
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
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-[0.1px] border-black"
                type="password"
                name="email"
                placeholder="password"
              />
            </div>
          </div>

          <div className="mt-auto flex items-center justify-center mb-6">
            <button
              disabled={isLoading}
              onClick={onSignupClick}
              className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200"
              style={{ background: isLoading ? "#a6a6a6" : "" }}
            >
              Signup
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <p className="text-red-400">{error}</p>
          </div>

          <div className="flex justify-center items-center gap-x-2 mb-2">
            <p className="text-gray-400">Already have an account?</p>
            <p className="text-[#406ffa] cursor-pointer">
              <Link to="/login">Login</Link>
            </p>
          </div>

          <div className="">
            <Link to={"/"}>
              <p className="text-gray-400 hover:text-gray-500 transition-all duration-200 cursor-pointer text-center">
                Back to Home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
