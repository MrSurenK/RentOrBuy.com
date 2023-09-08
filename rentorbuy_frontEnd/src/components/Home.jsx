import React from "react";
import BannerCar from "../assets/car_no_background.png";

const Home = () => {
  return (
    <>
      <div className="mt-clearNav bg-neutralSilver ">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
          <img src={BannerCar} atl="Banner Car" />
        </div>
      </div>
    </>
  );
};

export default Home;
