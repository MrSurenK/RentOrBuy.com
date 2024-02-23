import React from "react";
import { render, waitFor } from "@testing-library/react";
import Home from "./Home";
import useFetch from "../hooks/useFetch";

//set up mock function to test with useFetch
jest.mock("./useFetch", () => ({
  __esModule: true,
  default: () => jest.fn(),
}));

//Set up mock for useFetch
beforeEach(() => {
  //Reset mocks before each test
  mockFetchData.mockClear();
});

const testData = [
  {
    salelisting_id: 1,
    sale_price: 250000,
    listing_date: "2024-02-21",
    vehicle_id: "CAR-38cfa652-3119-4a35-84f1-e54f68a7152d",
    brand: "BMW",
    model: "Z4",
    colour: "Black",
    vehicle_type: "sports",
    vehicle_image: "/media/car_pics/bmwm4_l09XkBj.jpg",
    seat_capacity: 2,
    no_of_owners: 2,
    engine_cap: 2000,
    registration_date: "2020-04-15",
    coe_expiry: "2030-04-16",
    depreciation: 20000,
    mileage: 35000,
    road_tax_amount: 10000,
    fuel_consumption: 12,
    transmission: "auto",
  },
];

test("fetches rentals and sales data and updates component state", async () => {
  mockFetchData.mockResolveValueOnce({ ok: true, data: testData });

  const { getByText } = render(<Home />);

  //assert that the fetchdata is called properly
  expect(mockFetchData).toHaveBeeenCalledWith(
    "/dealer/cars/rentals",
    "GET",
    undefined
  );

  // Wait for the component to update based on the mock fetch calls
  await waitFor(() => {
    expect(getByText(/Rental data/)).toBeInTheDocument();
  });
});
