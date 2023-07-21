import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const VehiclesList = () => {
  const getToken = () => {
    return localStorage.getItem("eveezSubAuthToken");
  };

  const [subscriberData, setsubscriberData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/signin")
      return;
    }
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://eveez.in:3611/reportpervehicle/",
          {
            key: "fYvsw#24246vdndkndf950350",
            token: token,
          }
        ); // Replace with your API endpoint URL
        setsubscriberData(response.data);
      } catch (error) {
        console.log(error);
        alert('Something Went Wrong')
      }
    }
    fetchData();
  }, []);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = subscriberData ? subscriberData.length : null;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscriberData
    ? subscriberData.slice(indexOfFirstItem, indexOfLastItem)
    : null;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Sidebar />
      <div className="ml-[5.7rem] h-screen">
        <h1 className="text-[1.75rem] font-[500] my-4 mx-10">
          Subscribers Dashboard
        </h1>
        <hr />
        <div class="relative overflow-x-auto my-10">
          <table id="convert" class="text-sm text-left text-gray-500 border mx-10">
            <thead class="text-xs border border-t-1 border-[#000] text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-20 py-3">
                  Asset Name
                </th>
                <th scope="col" class="px-6 py-3 pl-12">
                  Total Trips
                </th>
                <th scope="col" class="px-6 py-3 pl-12">
                  Total Distance
                </th>
                <th scope="col" class="px-6 py-3 pl-12">
                  Total Duration
                </th>
                <th scope="col" class="px-6 py-3 pl-16">
                  Avg Speed
                </th>
                <th scope="col" class="px-6 py-3 pl-16">
                  Max Speed
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems
                  .slice(0, currentItems.length - 1)
                  .map((vehicle) => {
                    return (
                      <tr class="bg-white border-b border-l border-r border-x-[#000] dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-20 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {vehicle.VehicleID}
                        </th>
                        <td class="px-20 py-4">{vehicle["Total Trips"]}</td>
                        <td class="px-20 py-4">{vehicle["Total Distance"]}</td>
                        <td class="px-6 py-4 pl-16">
                          {vehicle["Total Duration"]}
                        </td>
                        {vehicle["Total Duration"] && (
                          <td class="px-20 py-4">
                            {Number(
                              Number(vehicle["Total Distance"]) /
                                (Number(
                                  vehicle["Total Duration"].split(" ")[0]
                                ) +
                                  Number(
                                    vehicle["Total Duration"].split(" ")[2]
                                  ) /
                                    60)
                            ).toFixed(2)}
                          </td>
                        )}
                        {vehicle["Total Duration"] && (
                          <td class="px-20 py-4">
                            {Number(
                              (2 * Number(vehicle["Total Distance"])) /
                                (Number(
                                  vehicle["Total Duration"].split(" ")[0]
                                ) +
                                  Number(
                                    vehicle["Total Duration"].split(" ")[2]
                                  ) /
                                    60)
                            ).toFixed(2)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
              {subscriberData && (
                <tr class="bg-white border border-t-2 border-[#000]">
                  <th
                    scope="row"
                    class="px-20 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Grand Total
                  </th>
                  <td class="px-20 py-4">
                    {subscriberData[subscriberData.length - 1].grandTotalTrips}
                  </td>
                  <td class="px-16 py-4 pl-[4.5rem]">
                    {subscriberData[subscriberData.length - 1].grandTotalDist}
                  </td>
                  <td class="px-6 py-4 pl-16">
                    {subscriberData[subscriberData.length - 1].grandTotalDur}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ReactHTMLTableToExcel
        id="export-to-excel-button"
        className="export-button rounded w-[9rem] mx-auto absolute left-[49%] border py-1 px-3"
        table="convert"
        filename="data"
        sheet="sheet 1"
        buttonText="Export to Excel"
      />
        <div className="ml-10 w-[90vw]">
          <div className="w-[12rem] mx-auto flex mt-[6rem]">
            <button
              className="rounded-full pt-[7px] border h-10 w-10 flex justify-center"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <input
              className="border w-8 mx-2 text-center rounded"
              value={currentPage}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= totalPages) {
                  setCurrentPage(e.target.value);
                } else {
                  setCurrentPage(1);
                }
              }}
            />
            <span className="ml-0 mr-2 text-md mt-[7px] ">of {totalPages}</span>
            <button
              className="rounded-full pt-[7px] border h-10 w-10 flex justify-center"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehiclesList;
