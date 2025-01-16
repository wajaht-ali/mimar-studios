import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinners from "../Spinners";

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address."),
  password: z.string(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const API_URL = import.meta.env.VITE_APP_URL;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = sessionStorage.getItem("userDetails");
        if (user) {
          const parsedData = JSON.parse(user);
          setValue("name", parsedData.name);
          setValue("email", parsedData.email);
          setValue("password", "");
        }
      } catch (error) {
        console.error("Error loading user details:", error);
      }
    };

    fetchUserDetails();
  }, [setValue]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      console.log("data is ", data);
      const { name, email, password } = data;
      const res = await axios.put(`${API_URL}/update-user/${id}`, {
        name,
        email,
        password,
      });
      if (res.data.success) {
        toast.success("User updated successfully!");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Unexpected error occurred:", error);
      toast.error("Something went wrong, Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightShaded m-4 md:m-0">
      <div className="bg-light p-6 rounded-lg shadow-md w-full max-w-md h-[600px]">
        <h2 className="text-3xl font-bold text-start text-primary">
          Update User
        </h2>
        <p className="text-sm text-gray-500 text-start mt-2">
          Please enter updated credentials below.
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
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-dark">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
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
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
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
            className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none flex text-center items-center justify-center focus:ring mt-6 ${
              isSubmitting ? "disabled" : ""
            }`}
          >
            {isSubmitting ? <Spinners color="white" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
