/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardSkeleton from "./others/CardSkeleton";
import weatherLogo from "../assets/weatherLogo.png";

interface WheatherData {
  name: string;
  country: string;
  localTime: string;
  temprature: number;
  wind_kph: number;
  humidity: number;
  vis_km: number;
  condition: {
    icon: string;
    text: string;
  };
}
const WeatherCard: React.FC = () => {
  const [city] = useState<string>("Islamabad");
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<WheatherData>({
    name: "",
    country: "",
    localTime: "",
    temprature: 0,
    wind_kph: 0,
    humidity: 0,
    vis_km: 0,
    condition: {
      icon: "",
      text: "",
    },
  });
  const API_KEY = import.meta.env.VITE_WEATHER_API;
  const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;
  const getWeatherData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}&q=${city}`);
      console.log("weather res: ", res);
      const weatherData = {
        name: res.data.location.name,
        localTime: res.data.location.localtime,
        country: res.data.location.country,
        temprature: res.data.current.temp_c,
        wind_kph: res.data.current.wind_kph,
        humidity: res.data.current.humidity,
        vis_km: res.data.current.vis_km,
        condition: {
          icon: res.data.current.condition.icon,
          text: res.data.current.condition.text,
        },
      };

      setData(weatherData);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Unexpected error occured");
      }
      console.log("Error is: ", error);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="text-gray-700 text-sm mb-2">
            <div className="text-xl text-primary font-medium">
              {data.name}, {data.country}
            </div>
            <div>{data.localTime.split(" ")[0]}</div>
          </div>
          <div className="flex justify-center my-4">
            <div className="text-blue-500">
              <img
                src={data.condition.icon ? data.condition.icon : weatherLogo}
                alt="img_icon"
                className="size-16 object-contain"
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800">
              {Math.floor(data.temprature)}° C
            </div>
            <div className="text-gray-500">{data.condition.text}</div>
          </div>
          <div className="flex justify-between text-gray-600 mt-4">
            <div className="text-center">
              <div className="text-sm">Wind</div>
              <div className="font-medium">{data.wind_kph}k/h</div>
            </div>
            <div className="text-center">
              <div className="text-sm">Humidity</div>
              <div className="font-medium">{data.humidity}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm">Visibility</div>
              <div className="font-medium">{data.vis_km}km</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherCard;
