import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import BannerCar from "../assets/car_no_background.png";
import { Card } from "flowbite-react";
import Modal from "./Modal";
import UserContext from "../context/user";
import Datepicker from "react-tailwindcss-datepicker";

const Home = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [rentals, setRentals] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

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
    console.log(userCtx);
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
                <button
                  className="bg-primary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGrey"
                  onClick={() => {
                    if (userCtx.accessToken) {
                      setShowModal(true);
                      setSelectedRental(rental);
                    } else {
                      alert("Please sign in or sign up");
                    }
                  }}
                >
                  Rent Now
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {selectedRental && userCtx.accessToken && (
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 class="mb-4 text-xl font-medium text-gray-900">
              Confirm Rental
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="customer_profile"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer ID:
                </label>
                <input
                  type="text"
                  name="customer_profile"
                  value={userCtx.nric}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="car_model"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Car Model
                </label>
                <input
                  type="text"
                  name="car_model"
                  value={`${selectedRental.brand} ${selectedRental.model}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="rental_price"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Rental Price
                </label>
                <input
                  type="number"
                  name="rental_price"
                  value={selectedRental.rental_rate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                  readOnly
                />
              </div>
              <div>
                <Datepicker
                  useRange={false}
                  value={value}
                  onChange={handleValueChange}
                />
              </div>
              <button
                type="submit"
                className="w-fit h-10 bg-primary text-white py-2 px-4 transition-all duration-200 rounded hover:bg-neutralGrey
            rounded-lg "
              >
                Confirm
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Home;
