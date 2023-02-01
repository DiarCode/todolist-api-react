import React from "react";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { selectAuthUser } from "../store/slices/authSlice";
import { useAppSelector } from "../store/store";

const CATS_IMAGES = [
  "https://play-lh.googleusercontent.com/XVHP0sBKrRJYZq_dB1RalwSmx5TcYYRRfYMFO18jgNAnxHAIA1osxM55XHYTb3LpkV8",
  "https://miro.medium.com/max/3600/0*n-2bW82Z6m6U2bij.jpeg",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-540542926-scaled-e1619016093503.jpg",
  "https://i1.sndcdn.com/artworks-cNp3aSmzEI1zkaHw-WPJarQ-t500x500.jpg",
  "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80",
];

const HomePage = () => {
  const user = useAppSelector(selectAuthUser);
  const isAuth = user !== null;

  const homeImage = CATS_IMAGES[Math.floor(Math.random() * CATS_IMAGES.length)];

  const notAuthRendered = (
    <div className="h-full flex items-center justify-center flex-col">
      <div className="mb-12">
        <p className="text-[#406ffa] font-semibold text-3xl mb-4 uppercase text-center">
          Welcome to Todoom
        </p>

        <p className="text-lg text-gray-500 text-center">
          Make your notes and add new animes to your watch list <br />
          with Todos and Towatch services
        </p>
      </div>

      <div className="flex items-center justify-center">
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r text-gray-200">
          <Link to="/signup">Signup for free</Link>
        </button>
      </div>
    </div>
  );

  const authRendered = (
    <div className="h-full flex items-center justify-center flex-col gap-y-7">
      <div className="flex items-center justify-center">
        <img
          className="w-[300px] max-h-[350px] object-cover rounded-3xl"
          src={homeImage}
          alt="cat"
        />
      </div>
      <div>
        <p className="text-[#406ffa] font-semibold text-3xl mb-4 uppercase text-center">
          Welcome back, {user?.name}
        </p>
        <p className="text-lg text-gray-500 text-center">
          Make your notes and add new animes to your watch list <br />
          with Todos and Towatch services
        </p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="w-4/5 h-4/5 bg-gray-100 rounded-lg p-7 bg-[url(./assets/background.jpg)]">
        <div className="flex justify-end pb-7">
          <Navbar />
        </div>
        <hr />
        {isAuth ? authRendered : notAuthRendered}
      </div>
    </Layout>
  );
};

export default HomePage;
