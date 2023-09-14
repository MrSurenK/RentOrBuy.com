import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import BannerCar from "../assets/GreenLambo.jpg";
import bmwLogo from "../assets/car_icons/bmw.png";
import hondaLogo from "../assets/car_icons/honda.png";
import lancerLogo from "../assets/car_icons/lancer.png";
import mazdaLogo from "../assets/car_icons/mazda.png";
import { Card } from "flowbite-react";
import Modal from "./Modal";
import UserContext from "../context/user";
import Datepicker from "react-tailwindcss-datepicker";

const Home = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [rentals, setRentals] = useState([]);
  const [sale, setSale] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);

  // Custom date picker configuration
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const [time, setTime] = useState(null);

  const handleTimeChange = (newTime) => {
    setTime(newTime.target.value);
    console.log(time);
  };

  // GET Rentals API

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
    getSales();
  }, []);

  // GET Sales API

  const getSales = async () => {
    const res = await fetchData("/dealer/cars/forsale", "GET", undefined);
    if (res.ok) {
      setSale(res.data);
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // POST Customer SALES API
  const handleSaleBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      car_id: selectedSale.vehicle_id,
      viewing_date: value.startDate,
      viewing_time: time,
      transaction_amount: selectedSale.sale_price,
    };

    const res = await fetchData(
      "/customer/carSale",
      "POST",
      bookingData,
      userCtx.accessToken
    );
    if (res.ok) {
      alert("Booking successful");
      setShowModal(false);
    } else {
      console.log(selectedSale.vehicle_id);
      alert("Booking failed" + res.data);
    }
  };

  // POST CUSTOMER RENTALS API
  const handleRentalBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      car_id: selectedRental.vehicle_id,
      rental_price: selectedRental.rental_rate,
      transaction_amount: selectedRental.rental_rate,
      rental_start_date: value.startDate,
      rental_end_date: value.endDate,
    };

    const res = await fetchData(
      "/customer/rental",
      "POST",
      bookingData,
      userCtx.accessToken
    );
    if (res.ok) {
      alert("Booking successful");
      setShowModal(false); //Close the modal
      getRentals(); //Refresh listing page
    } else {
      alert("Booking failed: " + res.data);
    }
  };

  const carLogos = [bmwLogo, lancerLogo, hondaLogo, mazdaLogo];

  return (
    <>
      <div className="mt-clearNav  bg-gray900 ">
        <div className="w-full mx-auto">
          <img
            src={BannerCar}
            alt="Banner Car"
            className="bg-cover bg-center"
          />
        </div>

        <div className="h-80 max-w-screen bg-neutralSilver flex flex-col">
          <div className="flex flex-row justify-center items-center h-3/6 font-medium text-3xl">
            Our Brands
          </div>
          <div className="flex flex-row justify-around w-full">
            {carLogos.map((car, index) => (
              <img src={car} alt="index" className="h-20" />
            ))}
          </div>
        </div>
      </div>
      <div className="h-auto max-w-full">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
          <div className="text-3xl font-semibold mt-5">
            <p>Rentals</p>
            <div className="grid grid-cols-4">
              <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 bg-primary"></hr>
            </div>
          </div>
          <div className="flex flex-row justify-between">
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
            <form
              className="space-y-6"
              action="#"
              onSubmit={handleRentalBooking}
            >
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
                  htmlFor="car_id"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Car Id
                </label>
                <input
                  type="text"
                  name="car_model"
                  value={selectedRental.vehicle_id}
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
      <div className="h-screen max-w-screen">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen mt-auto">
          <div className="text-3xl font-semibold mt-5">
            <p>Sale Cars</p>
            <div className="grid grid-cols-4">
              <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 bg-primary"></hr>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            {sale.map((sale, index) => (
              <Card
                key={index}
                imgAlt="Rental Car"
                imgSrc={import.meta.env.VITE_SERVER + sale.vehicle_image}
                className="w-full ml-8"
              >
                <div>
                  {sale.brand} {sale.model}
                </div>
                <div>{sale.colour}</div>
                <div>COE expiry: {sale.coe_expiry}</div>
                <div>Sale Price: ${sale.sale_price}</div>
                <div>Vehicle Type: {sale.vehicle_type}</div>
                <div>Listing Date: {sale.listing_date}</div>
                <button
                  className="bg-primary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGrey"
                  onClick={() => {
                    if (userCtx.accessToken) {
                      setShowModal(true);
                      setSelectedSale(sale);
                    } else {
                      alert("Please sign in or sign up");
                    }
                  }}
                >
                  Book Now
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedSale && userCtx.accessToken && (
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 class="mb-4 text-xl font-medium text-gray-900">
              Confirm Rental
            </h3>
            <form className="space-y-6" action="#" onSubmit={handleSaleBooking}>
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
                  value={`${selectedSale.brand} ${selectedSale.model}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="car_id"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Car Id
                </label>
                <input
                  type="text"
                  name="car_model"
                  value={selectedSale.vehicle_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="sale_price"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Sale Price
                </label>
                <input
                  type="number"
                  name="sale_price"
                  value={selectedSale.sale_price}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                  readOnly
                />
              </div>
              <div>
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={value}
                  onChange={handleValueChange}
                />
              </div>
              <div>
                <input
                  type="time"
                  id="appt"
                  name="appt"
                  min="09:00"
                  max="18:00"
                  required
                  onChange={handleTimeChange}
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
