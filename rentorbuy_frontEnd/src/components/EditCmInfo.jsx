import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const EditCmInfo = () => {
  const fetchData = useFetch();

  const [accountDetails, setAccountDetails] = useState("");

  const getAccountDetails = async () => {
    const res = await fetchData("/customer/details", "POST");

    if (res.ok) {
      setAcountDetails(res.data);
      console.log(res.data);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return (
    <div className="mt-clearNav  bg-neutralSilver ">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen flex justify-center">
        <div class="grid palce-items-center h-screen mt-20">
          <div class="rounded 3xl p-6 w-[450px] text-white h-[250px] bg-secondary">
            <div class="flex justify-between items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCmInfo;
