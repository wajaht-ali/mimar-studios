import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WeatherCard from "./Weather";
import { MdEmail } from "react-icons/md";

interface UserDataTypes {
  id: string;
  name: string;
  email: string;
}
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserDataTypes>({
    name: "",
    email: "",
    id: "",
  });
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      toast.warning("Login Required!");
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = sessionStorage.getItem("userDetails");
        if (user) {
          const parsedData = JSON.parse(user);
          const userData = {
            id: parsedData._id,
            name: parsedData.name,
            email: parsedData.email,
          };
          setData(userData);
        }
      } catch (error) {
        console.error("Error loading user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="h-auto min-h-screen grid grid-cols-1 md:grid-cols-2 items-start gap-6 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-4">
      <div className="rounded-3xl p-6 text-start md:text-left">
        <h1 className="text-3xl font-bold text-dark text-start">
          Welcome,
          <br />
          <span className="text-primary uppercase text-4xl md:text-5xl mt-2 block">
            {data?.name || "Guest"}
          </span>
        </h1>
        <div className="mt-4 flex flex-row items-center gap-x-2">
          <MdEmail fill="#4f46e5" size={20} />
          <p>{data?.email}</p>
        </div>
        <p className="mt-4 text-gray-600">
          Explore the features and stay updated with the latest weather
          information.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate(`/update-user/${data.id}`)}
            className="bg-primary text-white mr-2 rounded-md p-2 outline-none"
          >
            Edit Details
          </button>
          <button className="bg-primary text-white rounded-md ml-2 p-2 outline-none">
            Get a Quote
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-3xl">
        <WeatherCard />
      </div>
    </div>
  );
};

export default Home;
