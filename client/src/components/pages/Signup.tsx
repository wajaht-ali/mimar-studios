/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinners from "../Spinners";
import logo from "../../assets/mimar_Logo-nobg.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const API_URL = import.meta.env.VITE_APP_URL;

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { name, email, password } = data;
      const res = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      console.log("res is: ", res);
      if (res.data.success) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Please try again.`);
      }
      console.log(`Unexpected Error Occurred! ${error}`);
    }
  };

  const googleSignupHandler = async (response: any) => {
    try {
      const { credential } = await response;
      const res = await axios.post(`${API_URL}/google-signup`, {
        token: credential,
      });
      console.log("Res: ", res);
      if (res.data.success) {
        toast.success("Signup successful with Google!");
        sessionStorage.setItem("jwtToken", res.data.jwtToken);
        sessionStorage.setItem("userDetails", JSON.stringify(res.data.user));
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Google signup failed! Please try again.");
      console.error("Error with Google signup", error);
    }
  };

  return (
    <div className="flex items-center flex-row justify-center min-h-screen bg-lightShaded m-4 md:m-0">
      <div className="bg-light p-6 rounded-tl-lg rounded-bl-lg shadow-md w-full max-w-md h-[600px]">
        <h2 className="text-3xl font-bold text-start text-primary">Signup</h2>
        <p className="text-sm text-gray-500 text-start mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary font-medium">
            Login here
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mt-2">
            <label className="block text-sm font-medium text-dark">Name</label>
            <input
              type="text"
              {...register("name")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
                errors.name ? "border-danger" : "border-gray-300"
              }`}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-danger text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-dark">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 ${
                errors.email ? "border-danger" : "border-gray-300"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-danger text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-dark">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 ${
                errors.password ? "border-danger" : "border-gray-300"
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-danger text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none flex text-center items-center justify-center focus:ring focus:ring-indigo-300 mt-6 ${
              isSubmitting ? "disabled" : ""
            }`}
          >
            {isSubmitting ? <Spinners color="white" /> : "Submit"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-evenly">
          <div className="w-[30%] border border-borderGray"></div>
          <span className="text-sm text-dark">OR</span>
          <div className="w-[30%] border border-borderGray"></div>
        </div>

        <div className="mt-4">
          <GoogleLogin
            onSuccess={googleSignupHandler}
            onError={() =>
              toast.error("Google Sign-In failed. Please try again.")
            }
            useOneTap={true}
          />
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center rounded-tr-lg rounded-br-lg justify-center bg-transparent shadow-lg shadow-gray-300 w-full max-w-md h-[600px]">
        <img
          src={logo}
          alt="mimar_logo"
          className="object-contain select-none"
          loading="lazy"
        />
        <p className="opacity-40 cursor-default select-none -mt-4">
          <em>mimAR studios</em>
        </p>
      </div>
    </div>
  );
};

export default Signup;
