import React from "react";
import BannerCar from "../assets/car_no_background.png";
import { Card } from "flowbite-react";

const Home = () => {
  return (
    <>
      <div className="mt-clearNav  bg-neutralSilver ">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
          <div className="w-full mx-auto">
            <img src={BannerCar} alt="Banner Car" />
          </div>
        </div>
        <div className="h-80 max-w-screen bg-stone-500">Search bar</div>
      </div>
      <div className="h-screen max-w-screen">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
          <div className="text-3xl font-semibold mt-5">
            <p>Rentals</p>
            <div className="grid grid-cols-4">
              <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 bg-primary"></hr>
            </div>
          </div>
          <div>
            <Card
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="/images/blog/image-1.jpg"
              className="min-w-fit"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Noteworthy technology acquisitions 2021</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
