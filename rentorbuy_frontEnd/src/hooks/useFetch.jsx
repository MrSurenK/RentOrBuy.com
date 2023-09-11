import React from "react";

const useFetch = () => {
  const fetchData = async (endpoint, method, body, token) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
        //   mode: "no-cors",
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        return { ok: true, data };
      } else {
        console.log("Error data:", data);
        // Customize error handling based on Django REST framework error responses
        if (data.detail) {
          return { ok: false, data: data.detail };
        }

        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((item) => item.msg);
          return { ok: false, data: messages.join(", ") };
        }

        return { ok: false, data: "An unknown error has occurred" };
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Fetch error:", error);

      // If the error is due to JSON parsing failure, it may be due to a network issue or server error
      if (error.message && error.message.includes("JSON")) {
        return {
          ok: false,
          data: "Could not retrieve data. Please try again later.",
        };
      }

      return { ok: false, data: "An unexpected error has occurred" };
    }
  };

  return fetchData;
};

export default useFetch;
