import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [subscriber_id, setsubscriber_id] = useState(null);
  const [password, setpassword] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3600/subscriberlogin",
        {
          key: "fYvsw#24246vdndkndf950350",
          data: {
            subscriber_id: subscriber_id,
            password: password,
          },
        }
      ); // Replace with your API endpoint URL
      const { token } = response.data;
      localStorage.setItem("eveezSubAuthToken", token);
      navigate('/')
    } catch (error) {
      if(error.message === 'Request failed with status code 400'){
        alert('Invalid Credentials');
      }
      else if(error.message === "Network Error"){
        alert('Server not responding, check your internet connection');
      }else{
        alert('Something went wrong');
      }
    }
  };
  return (
    <section class="bg-[#fff] flex">
      <div
        className="w-[50vw] h-[100vh] border"
        style={{
          backgroundImage: "url('./eveez_login_page.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 w-[50vw]">
        {/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite    
        </a> */}
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Subscriber's Login
            </h1>
            <div class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Subscriber ID
                </label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="subscriber id"
                  required=""
                  value={subscriber_id}
                  onChange={(e) => {
                    setsubscriber_id(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={loginHandler}
                class="w-full bg-[#ff5733] text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
