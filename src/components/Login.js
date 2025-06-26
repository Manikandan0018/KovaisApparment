import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import external CSS
import signUpBgImg from './Image/signup-bg.jpg'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Function to validate login via API
  const loginUser = async (formData) => {
    try {
      console.log("Sending Data:", formData);

      const response = await axios.post(
        //  "https://1c9e-2409-408d-618-658e-15f8-262a-6616-c57e.ngrok-free.app/kovais/customer-login/",
        "https://api.capture360.ai/kovais/customer-login/",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      console.log("Login Success:", response.data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/home");
      window.location.reload(); // Force re-render to update navbar
      setTimeout(()=>{
        alert("Login Successful !")
      },1000)
      // alert("Login Successful !")
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.login || "Invalid credentials. Please try again.");
      
    }
  };

//   function refreshPage(){ 
//     window.location.reload(); 
// }

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    loginUser(data);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Login your Account</h2>
            <p className="text-sm text-gray-600 mb-6">
              Don't have an account? <a href="/signup" className="text-blue-500">Create Account here</a>.
            </p>
  
            <form onSubmit={handleSubmit(Login)} className="space-y-5">
             
  
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
  
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" }
                  })}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
  
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
  
           <div className="flex items-center gap-4 my-4">
           <div className="flex-grow h-px bg-gray-300"></div>
           <div className="text-sm text-gray-500">or</div>
           <div className="flex-grow h-px bg-gray-300"></div>
           </div>
              
              <button type="button"
              onClick={() => console.log('Google signup logic here')}
             className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" className="w-5 h-5" />
             <span className="text-sm text-gray-700 font-medium">SigIn with Google</span>
            </button>
            </form>
          </div>
  
          <div className="hidden md:flex items-center justify-center bg-gray-50">
            <img src={signUpBgImg} alt="Signup visual" className="" />
          </div>
  
        </div>
      </div>
     
  );
}

export default Login;
