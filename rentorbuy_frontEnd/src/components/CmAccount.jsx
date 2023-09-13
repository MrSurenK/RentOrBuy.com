import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CmAccount = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [accountDetails, setAccountDetails] = useState([]);

  const getAccountDetails = async () => {
    const res = await fetchData(
      "/customer/details/",
      "POST",
      { nric: userCtx.nric },
      userCtx.accessToken
    );

    if (res.ok) {
      setAccountDetails(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    console.log(userCtx);
    getAccountDetails();
  }, [userCtx.isLoggedIn]);

  useEffect(() => {
    console.log("accountDetails:", accountDetails);
  }, [accountDetails]);

  // Delete account by changing activity from active to inactive. ( Do not let inactive log in )
  const deleteAccount = async (e) => {
    const res = await fetchData(
      "/customer/delete/",
      "DELETE",
      { is_active: false },
      userCtx.accessToken
    );

    if (res.ok) {
      alert("Account Deleted!");
      window.location.reload();
      navigate("/home"); //Return to homepage
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // Update acount information states and functions
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [editAddress, setEditAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log(`Field changed: ${name}, New value: ${value}`);

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "editAddress":
        setEditAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "postal":
        setPostal(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fullAddress = `${editAddress} ${city} ${postal}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("contact_no", contact);
    formData.append("address", fullAddress);

    if (file) {
      formData.append("profile_pic", file);
    }
    // Cant use customer fetch hook because the head has to accept formData not application/JSON
    console.log(userCtx.accessToken);

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/customer/editInfo/",
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Update successful!", data);
        getAccountDetails();
      } else {
        throw new Error("Network response was not ok" + data.message);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      console.error("Error", error);
    }
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen flex justify-center mt-10">
      <div className="grid place-items-center h-screen mt-20">
        <div className="rounded 3xl p-6 w-[450px] text-white h-[250px] bg-secondary">
          <div className="flex flex-col justify-start ">
            <img
              src={accountDetails.profile_pic}
              alt="profile pic"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div Name="justify-items-end">
            <div>{accountDetails.nric}</div>
            <dic>
              {accountDetails.first_name} {accountDetails.last_name}
            </dic>
            <div>{accountDetails.age}</div>
            <div>{accountDetails.email}</div>
            <div>{accountDetails.contact_no}</div>
            <div>{accountDetails.address}</div>
            <div>
              <button
                className="bg-red-500 rounded-lg w-max py-2.5 px-2.5"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">Edit Personal Information</div>

        <form noValidate="" action="" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              valie={email}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="editAddress"
              id="address"
              value={editAddress}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="postal"
                value={postal}
                id="postal"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Postal
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="contact"
                id="contact"
                value={contact}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
              />
              <label
                htmlFor="contact"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (+65 62944757)
              </label>
            </div>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Profile Picture
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
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CmAccount;
