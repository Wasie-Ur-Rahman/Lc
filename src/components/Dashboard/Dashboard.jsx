import React, { useState, useEffect, useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import ChartContainer from "./Barchart"; 
import DailyLc from "./DailyLc";
import LcRatio from "./LcRatio";
import NC_Field_Count from './NC_Field_Count';
import TotalTimeScatter from "./TotalTimeScatter";
import { UserContext } from '../UserContext/UserContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ setIsLoggedIn, setUserId, setToken, setIsAddNewUser, handleLogout }) => {
  const { token } = useContext(UserContext); 
  console.log("token", token);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("checking");
      if (token === null) {
        console.log("Checking");
        setIsLoggedIn(false);
        handleLogout();
      }
    }, 200); 

    return () => clearInterval(interval);
  }, [token, setIsLoggedIn, handleLogout]);

  return (
    <div className="w-full h-full absolute grid grid-cols-2 p-8    space-y-5 gap-y-8 justify-center items-center overflow-y-auto">
    <div className="flex justify-center items-center">
      <ChartContainer />
    </div>
    <div className="flex justify-center items-center">
      <DailyLc />
    </div>
    <div className="flex justify-center items-center ">
      <NC_Field_Count />
    </div>
    <div className="flex justify-center items-center">
      <TotalTimeScatter />
    </div>
    <div className="col-span-1 lg:col-span-2 flex justify-center items-center mt-5">
      <LcRatio />
    </div>
  </div>
  
  );
};

export default Dashboard;
