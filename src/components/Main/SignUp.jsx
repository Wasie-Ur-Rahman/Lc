import React, { useState } from "react";
import axios from "axios";
const check = "http://127.0.0.1:8003/api/user/is_available/";

const registerUser = async (userData) => {
  const url = "http://127.0.0.1:8003/api/users/user-registeration";

  try {
    const response = await axios.post(url, userData, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("User registration", response);
    console.log("Message", response.data.message);

    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const UserRegistrationForm = ({ setIsAddNewUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
    email: "",
  });

  const [uNameTaken, setUNameTaken] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [regError, setRegError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsWaiting(true);

    try {
      const response = await registerUser(formData);

      // Show success message in a window alert
      window.alert("User registered successfully!");

      // Clear the form after successful registration
      setFormData({
        username: "",
        fullname: "",
        password: "",
        email: "",
      });

      setRegError("");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message ||
          "Failed to register user. Please try again."
        : "Network error. Please check your connection and try again.";

      // Show error message in a window alert
      window.alert(`Error: ${errorMessage}`);
      setRegError(errorMessage);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="flex flex-col justify-evenly w-[30%] h-[120%] bg-[#2C333D] opacity-[84%] border-[1px] border-[#242F3A]">
      <form
        onSubmit={handleSubmit}
        className="h-[86%] flex flex-col justify-evenly"
      >
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter Username"
            className={`w-[60%] px-3 py-3 bg-transparent border-[1px] ${"border-[#2A8BE9]"} font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none`}
          />
          {uNameTaken && <p className="text-red-500">Username already taken</p>}
        </div>

        <div className="flex justify-center">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            placeholder="Enter Fullname"
            className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
          />
        </div>

        <div className="flex justify-center">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Email"
            className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
          />
        </div>

        <div className="flex justify-center">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
            className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
          />
        </div>

        <div className="flex justify-evenly">
          <button
            type="button"
            onClick={() => setIsAddNewUser(false)}
            className="w-[30%] px-4 py-2 bg-blue-500 text-white self-center hover:bg-blue-600 font-Inconsolata text-[22px] font-[800]"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isWaiting}
            className="w-[50%] px-4 py-2 bg-blue-500 text-white self-center hover:bg-blue-600 font-Inconsolata text-[22px] font-[800]"
          >
            {isWaiting ? "Registering..." : "Add New User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
