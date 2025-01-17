import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinners from "../Spinners";
import logo from "../../assets/mimar_Logo-nobg.png";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const signupSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

type LoginFormValues = z.infer<typeof signupSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const API_URL = import.meta.env.VITE_APP_URL;
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { email, password } = data;
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Login successfully!");
        sessionStorage.setItem("jwtToken", res.data.accessToken);
        sessionStorage.setItem("userDetails", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Invalid Credentials.");
      } else {
        console.log(`Unexpected Error Occurred! ${error}`);
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post(`${API_URL}/google-login`, { token });
      console.log("res", res);
      if (res.data.success) {
        toast.success("Google Login successful!");
        sessionStorage.setItem("jwtToken", res.data.jwtToken);
        sessionStorage.setItem("userDetails", JSON.stringify(res.data.user));
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Google Sign-In failed. Please try again.");
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="flex items-center flex-row justify-center min-h-screen bg-lightShaded m-4 md:m-0">
      <div className="bg-light p-6 rounded-tl-lg rounded-bl-lg shadow-md w-full max-w-md h-[500px]">
        <h2 className="text-3xl font-bold text-start text-primary">Login</h2>
        <p className="text-sm text-gray-500 text-start mt-2">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-primary font-medium">
            Sign up here
          </Link>
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

          <div className="mt-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                className="size-4 rounded-md mr-2"
                id="remember_me"
              />
              <label
                htmlFor="remember_me"
                className="block text-sm font-medium cursor-pointer text-dark"
              >
                Remember Me
              </label>
            </div>
            <div>
              <Link
                className="text-primary font-semibold"
                to={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none flex text-center items-center justify-center focus:ring focus:ring-indigo-300 mt-6 ${
              isSubmitting ? "disabled" : ""
            }`}
          >
            {isSubmitting ? <Spinners color="white" /> : "Login"}
          </button>
        </form>

        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center rounded-tr-lg rounded-br-lg justify-center bg-transparent shadow-lg shadow-gray-300 w-full max-w-md h-[500px]">
        <img
          src={logo}
          alt="mimar_logo"
          className="object-contain select-none"
        />
        <p className="opacity-40 cursor-default select-none -mt-4">
          <em>creativity starts here</em>
        </p>
      </div>
    </div>
  );
};

export default Login;
