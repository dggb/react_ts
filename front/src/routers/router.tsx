import React from "react";
import { Route, Routes } from "react-router-dom";
import ImageBoard from "@/views/imageBoard/imageBoard";
import DashBoard from "@/views/dashBoard/DashBoard";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/DashBoard" element={<DashBoard />} />
      <Route path="/ImageBoard" element={<ImageBoard />} />
    </Routes>
  );
};

export default Router;
