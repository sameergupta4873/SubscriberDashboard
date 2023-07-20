import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import SignUp from "./SignUp";
import VehiclesList from "./VehiclesList";
import VehiclesDetail from "./VehicleDetail";
import Sidebar from "./sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<VehiclesList />} />
          <Route exact path="/signin" element={<SignUp />} />
          <Route exact path="/pervehicle" element={<VehiclesDetail />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
