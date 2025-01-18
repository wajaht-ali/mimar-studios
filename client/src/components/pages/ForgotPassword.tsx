/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinners from "../Spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address."),
});

type ForgotValues = z.infer<typeof forgotSchema>;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
  });

  const API_URL = import.meta.env.VITE_APP_URL;

  const onSubmit = async (data: ForgotValues) => {
    try {
      const { email } = data;
      const res = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      console.log("forgot res is: ", res);
      if (res.data.success) {
        toast.success("Reset OTP sent to your inbox.");
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

  return (
    <div className="flex items-center flex-col justify-center h-[80vh] bg-lightShaded m-4 md:m-0">
      <div className="bg-light p-6 rounded-tl-lg rounded-bl-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-start text-primary">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-start mt-2">
          Please enter email address, to receive password reset OTP.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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

          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none flex text-center items-center justify-center focus:ring focus:ring-indigo-300 mt-6 ${
              isSubmitting ? "disabled" : ""
            }`}
          >
            {isSubmitting ? <Spinners color="white" /> : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-4 flex flex-row items-center gap-x-2">
        <FaArrowLeft size={15} fill="#333" />
        <p>
          Back to{" "}
          <Link to={"login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
