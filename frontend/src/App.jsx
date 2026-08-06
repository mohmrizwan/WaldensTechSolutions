import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Service from "./Pages/Service";
import Review from "./Pages/Testimonlas";
import Project from "./Pages/Project";
import LofiAdminLogin from "./Components/adminLogin";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/testimonials" element={<Review />} />
      <Route path="/project" element={<Project />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LofiAdminLogin />} />
    </Routes>
  );
};

export default App;
