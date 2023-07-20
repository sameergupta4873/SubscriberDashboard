import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Sidebar = () => {
  const [list, setList] = useState(true);
  const [detail, setDetail] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === '/pervehicle'){
        setList(false);
        setDetail(true);
    }else{
        setList(true);
        setDetail(false);
    }
  },[location])
  return (
    <>
      <div className="absolute border w-[90px] h-screen top-0 px-5 pt-5">
        <div
          className="w-[48px] h-[43px]"
          style={{
            backgroundImage: "url(eveez_logo.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="border-t mt-2 pt-5">
          <button
            onClick={() => {
              navigate("/");
            }}
            className={`w-[50px] h-[50px] rounded-full ${
              list ? "bg-[#FF5733]" : "bg-[#fff]"
            } flex justify-center pt-4 border`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M15.4333 10.4167H12.0666C10.3916 10.4167 9.58325 9.64167 9.58325 8.04167V2.375C9.58325 0.775 10.3999 0 12.0666 0H15.4333C17.1083 0 17.9166 0.775 17.9166 2.375V8.04167C17.9166 9.64167 17.0999 10.4167 15.4333 10.4167ZM12.0666 1.25C11.0083 1.25 10.8333 1.53333 10.8333 2.375V8.04167C10.8333 8.88333 11.0083 9.16667 12.0666 9.16667H15.4333C16.4916 9.16667 16.6666 8.88333 16.6666 8.04167V2.375C16.6666 1.53333 16.4916 1.25 15.4333 1.25H12.0666Z"
                fill={`${list ? "#fff" : "#000"}`}
              />
              <path
                d="M15.4333 17.418H12.0666C11.2967 17.418 10.8245 17.2391 10.5425 16.9692C10.2648 16.7035 10.0833 16.2645 10.0833 15.543V14.043C10.0833 13.3227 10.2662 12.8834 10.5452 12.6171C10.8286 12.3466 11.3015 12.168 12.0666 12.168H15.4333C16.2032 12.168 16.6754 12.3469 16.9573 12.6167C17.235 12.8824 17.4166 13.3214 17.4166 14.043V15.543C17.4166 16.2632 17.2336 16.7025 16.9547 16.9688C16.6712 17.2394 16.1984 17.418 15.4333 17.418ZM12.0666 12.418C11.5389 12.418 11.0339 12.4769 10.6995 12.8113C10.3614 13.1494 10.3333 13.6359 10.3333 14.043V15.543C10.3333 15.95 10.3614 16.4365 10.6995 16.7746C11.0339 17.109 11.5389 17.168 12.0666 17.168H15.4333C15.9609 17.168 16.466 17.109 16.8003 16.7746C17.1385 16.4365 17.1666 15.95 17.1666 15.543V14.043C17.1666 13.6359 17.1385 13.1494 16.8003 12.8113C16.466 12.4769 15.9609 12.418 15.4333 12.418H12.0666Z"
                fill={`${list ? "#fff" : "#000"}`}
                stroke={`${list ? "#fff" : "#000"}`}
              />
              <path
                d="M5.85 17.9167H2.48333C0.808333 17.9167 0 17.1417 0 15.5417V9.875C0 8.275 0.816667 7.5 2.48333 7.5H5.85C7.525 7.5 8.33333 8.275 8.33333 9.875V15.5417C8.33333 17.1417 7.51667 17.9167 5.85 17.9167ZM2.48333 8.75C1.425 8.75 1.25 9.03333 1.25 9.875V15.5417C1.25 16.3833 1.425 16.6667 2.48333 16.6667H5.85C6.90833 16.6667 7.08333 16.3833 7.08333 15.5417V9.875C7.08333 9.03333 6.90833 8.75 5.85 8.75H2.48333Z"
                fill={`${list ? "#fff" : "#000"}`}
              />
              <path
                d="M5.85 6.25H2.48333C0.808333 6.25 0 5.475 0 3.875V2.375C0 0.775 0.816667 0 2.48333 0H5.85C7.525 0 8.33333 0.775 8.33333 2.375V3.875C8.33333 5.475 7.51667 6.25 5.85 6.25ZM2.48333 1.25C1.425 1.25 1.25 1.53333 1.25 2.375V3.875C1.25 4.71667 1.425 5 2.48333 5H5.85C6.90833 5 7.08333 4.71667 7.08333 3.875V2.375C7.08333 1.53333 6.90833 1.25 5.85 1.25H2.48333Z"
                fill={`${list ? "#fff" : "#000"}`}
              />
            </svg>
          </button>
        </div>
        <div className=" pt-3">
          <button
            onClick={() => {
              navigate("/pervehicle");
            }}
            className={`w-[50px] h-[50px] rounded-full ${
              detail ? "bg-[#FF5733]" : "bg-[#fff]"
            } flex justify-center pt-4 border`}
          >
            <svg
              className="text-[#fff]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
            >
              <path
                d="M5 -2.18557e-07L5 14.17L1.41 10.59L-2.62268e-07 12L6 18L12 12L10.58 10.59L7 14.17L7 -3.0598e-07L5 -2.18557e-07Z"
                fill={`${detail ? "#fff" : "#000"}`}
              />
              <path
                d="M19 18L19 3.83L22.59 7.41L24 6L18 -2.62268e-07L12 6L13.42 7.41L17 3.83L17 18L19 18Z"
                fill={`${detail ? "#fff" : "#000"}`}
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
