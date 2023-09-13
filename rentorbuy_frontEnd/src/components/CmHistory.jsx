import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Card } from "flowbite-react";
import Modal from "./Modal";
import UserContext from "../context/user";

const CmHistory = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [rentals, setRentals] = useState([]);
  const [appt, setAppt] = useState([]);

  const getRentalHistory = async () => {
    const res = await fetchData(
      "/customer/cars/rentals",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setRentals(res.data);
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // Get sale transaction history
  const getSaleHistory = async () => {
    const res = await fetchData(
      "/customer/cars/sales/",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setAppt(res.data);
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // Only return data if user is logged in
  useEffect(() => {
    getRentalHistory();
    getSaleHistory();
  }, [userCtx.isLoggedIn]);

  return (
    <>
      <div className="mt-clearNav  bg-neutralSilver ">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
          <div className="w-full mx-auto">
            <div className="h-screen max-w-screen">
              <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
                <div className="text-3xl font-semibold mt-5">
                  <div className="h-screen max-w-screen">
                    <p>Bookings</p>
                    <div className="grid grid-cols-4">
                      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 bg-primary"></hr>
                    </div>
                    <div className="flex flex-column justify-between">
                      {rentals.map((rental, index) => (
                        <Card
                          key={index}
                          imgAlt="Rental Car"
                          imgSrc={
                            import.meta.env.VITE_SERVER +
                            rental.car_id.vehicle_image
                          }
                          className="w-full mx-auto"
                        >
                          <div>
                            {rental.car_id.brand} {rental.car_id.model}
                          </div>
                          <div>Daily Rate: {rental.transaction_amount}</div>
                          <div>Start Date: {rental.rental_start_date}</div>
                          <div>End Date: {rental.rental_end_date}</div>
                          <div>Rental_Status: {rental.rental_status}</div>
                        </Card>
                      ))}
                    </div>
                    <div className="flex flex-column justify-between">
                      {appt.map((apt, index) => (
                        <Card
                          key={index}
                          imgAlt="Sale Car Appt"
                          imgSrc={
                            import.meta.env.VITE_SERVER +
                            apt.car_id.vehicle_image
                          }
                          className="w-full mx-auto"
                        >
                          <div>
                            {apt.car_id.brand} {apt.car_id.model}
                          </div>
                          <div>Price: ${apt.transaction_amount}</div>
                          <div>Appt Date: {apt.viewing_date}</div>
                          <div>Time: {apt.viewing_time}</div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmHistory;
