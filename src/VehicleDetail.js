import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

const VehiclesDetail = () => {
  const getToken = () => {
    return localStorage.getItem("eveezSubAuthToken");
  };

  const [subscriberData, setsubscriberData] = useState(null);

  const [VehicleID, setVehicleId] = useState(1);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert("Subscriber Not Signed In");
    }
    if (subscriberData) {
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
        alert('Something went wrong');
      }
    }
    fetchData();
  }, [subscriberData]);
  return (
    <>
      <Sidebar />
      <div className="ml-[5.57rem] h-screen">
        <div className="flex justify-between w-[80vw]">
          <h1 className="text-[1.75rem] font-[500] my-4 mx-10">
            Trip Report per Vehicle
          </h1>
          <div className="my-5">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Selected Vehicle
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => {
                setVehicleId(e.target.value);
              }}
            >
              <option value={0} selected>
                {subscriberData && subscriberData[0].VehicleID}
              </option>
              {subscriberData &&
                subscriberData
                  .slice(1, subscriberData.length - 1)
                  .map((item, index) => {
                    return <option value={index + 1}>{item.VehicleID}</option>;
                  })}
            </select>
          </div>
        </div>
        <hr />
        <div class="relative overflow-x-auto mt-10">
          <table class="text-sm text-left text-gray-500 border mx-10">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Asset Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Trips
                </th>
                <th scope="col" class="px-6 py-3">
                  Sum of Distance Km
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriberData && (
                <>
                  {subscriberData[VehicleID].days.map((item) => {
                    return (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.Day}
                        </th>
                        <td class="px-6 py-4">{item["Total Trips"]}</td>
                        <td class="px-6 py-4">{item["Total Duration"]}</td>
                        <td class="px-6 py-4">{item["Total Distance"]}</td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex">
          <div className="w-[60vw] border h-[50vh] mt-20">
            <h1 className="text-[1.75rem] font-[500] my-4 mx-10">
              Highest & Lowest Run Per Vehicle (in Kms)
            </h1>
            <hr />
            <div class="relative overflow-x-auto mt-10">
              <table class="text-sm text-left text-gray-500 border mx-10">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Asset Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Highest Run
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Lowest Run
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberData && (
                    <>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {subscriberData[VehicleID].highestDistance.Day}
                        </th>
                        <td class="px-6 py-4">
                          {subscriberData[VehicleID].VehicleID}
                        </td>
                        <td class="px-6 py-4">
                          {subscriberData[VehicleID].highestDistance.distance}
                        </td>
                        <td class="px-6 py-4">-</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {subscriberData[VehicleID].lowestDistance.Day}
                        </th>
                        <td class="px-6 py-4">
                          {subscriberData[VehicleID].VehicleID}
                        </td>
                        <td class="px-6 py-4">-</td>
                        <td class="px-6 py-4">
                          {subscriberData[VehicleID].lowestDistance.distance}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-[45vw] border h-[50vh] mt-20">
            <h1 className="text-[1.75rem] font-[500] my-4 mx-10">
              Days Vehicle Didn't Move
            </h1>
            <hr />
            <div class="relative overflow-x-auto mt-10">
              <table class="text-sm text-left text-gray-500 border mx-10">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Asset Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Not Run Vehicle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberData && (
                    <>
                      {subscriberData[VehicleID].nonRunningDays &&
                        subscriberData[VehicleID].nonRunningDays.map((item) => {
                          return (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item}
                              </th>
                              <td class="px-6 py-4">
                                {subscriberData[VehicleID].VehicleID}
                              </td>
                              <td class="px-6 py-4">Vehicle Not Moving</td>
                            </tr>
                          );
                        })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehiclesDetail;
