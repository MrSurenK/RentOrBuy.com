import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const SignUp = () => {
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    nric: "",
    age: "",
    email: "",
    contact_no: "",
    address: "",
    password: "",
  });

  const [addressField, setAddressField] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // useEffect(() => {
  //   console.log(addressField);
  //   console.log(city);
  //   console.log(zip);
  // });
  // Combines address to 1
  const fullAddress = `${addressField}, ${city}, ${zip}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setRegister((prev) => {
    //   return { ...prev, address: fullAddress, profile_pic: file };
    // });
    const updatedRegister = {
      ...register,
      address: fullAddress,
    };

    const formData = new FormData();

    for (const [key, value] of Object.entries(updatedRegister)) {
      formData.append(key, value);
    }

    if (file) {
      formData.append("profile_pic", file);
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/customer/register/",
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registration Successful!", data);
        window.location.href = "http://localhost:5173/home";
      } else {
        throw new Error("Network response was not ok" + data.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <div className="mt-clearNav bg-neutralSilver ">
        <div className="mt-30 px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
          <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
            <form
              noValidate=""
              action=""
              className="container flex flex-col mx-auto space-y-12"
              onSubmit={handleSubmit}
            >
              <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="space-y-2 col-span-full lg:col-span-1">
                  <p className="font-medium">Personal Inormation</p>
                  <p className="text-xs">
                    Please provide us with personal information for our records.
                    The information given will only be used as needed for
                    administrative purposes. We abide strictly by PDPA
                    guidelines.Your privacy is in our best interest
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="firstname" className="text-sm">
                      First name
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      placeholder="First name"
                      name="first_name"
                      onChange={handleChange}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="lastname" className="text-sm">
                      Last name
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Last name"
                      name="last_name"
                      onChange={handleChange}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="row-start-3 col-span-3 sm:col-span-2 md:col-span-2 ">
                    <label htmlFor="nric" className="text-sm">
                      NRIC
                    </label>
                    <input
                      id="nric"
                      type="text"
                      placeholder="S1234567A"
                      maxLength="9"
                      name="nric"
                      onChange={handleChange}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="row-start-3 col-span-2 sm:col-span-1 pr-20">
                    <label htmlFor="age" className="text-sm">
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      maxlength="2"
                      onChange={handleChange}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="row-start-4 col-span-3 sm:col-span-2 md:col-span-2 ">
                    <label htmlFor="contact" className="text-sm">
                      Contact
                    </label>
                    <input
                      id="contact_no"
                      type="tel"
                      placeholder="+65 12345678"
                      pattern="^\+65 \d{8}$"
                      name="contact_no"
                      maxlength="12"
                      onChange={handleChange}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="address" className="text-sm">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      onChange={(e) => setAddressField(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="city" className="text-sm">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value="Singapore"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  {/* <div className="col-span-full sm:col-span-2">
                    <label for="state" className="text-sm">
                      State / Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div> */}
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="zip" className="text-sm">
                      ZIP / Postal
                    </label>
                    <input
                      id="zip"
                      type="text"
                      placeholder=""
                      maxlength="6"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="row-start-9 col-span-full sm:col-span-3">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Upload a Profile Picture
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </div>
              </fieldset>
              <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="space-y-2 col-span-full lg:col-span-1">
                  <p className="font-medium">Set your password</p>
                  <p className="text-xs">Please set a strong password.</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-primary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGrey"
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignUp;
