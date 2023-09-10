import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import BannerCar from "../assets/car_no_background.png";
import { Card } from "flowbite-react";

const Home = () => {
  const fetchData = useFetch();
  const [rentals, setRentals] = useState([]);

  const getRentals = async () => {
    const res = await fetchData("/dealer/cars/rentals", "GET", undefined);
    if (res.ok) {
      setRentals(res.data);
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getRentals();
  }, []);

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
          <div className="flex flex-column justify-between">
            {rentals.map((rental, index) => (
              <Card
                key={index}
                imgAlt="Rental Car"
                imgSrc={import.meta.env.VITE_SERVER + rental.vehicle_image}
                className="w-full ml-8"
              >
                <div>
                  {rental.brand} {rental.model}
                </div>
                <div>{rental.colour}</div>
                <div>Seat Capacity: {rental.seat_capacity}</div>
                <div>Rental Rate: ${rental.rental_rate}</div>
                <div>Vehicle Type: {rental.vehicle_type}</div>
                <div>Listing Date: {rental.listing_date}</div>
                <button className="bg-primary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGrey">
                  Rent Now
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
