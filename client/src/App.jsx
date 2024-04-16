import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import Page404 from "./components/Page404/Page404";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/videogames" element={<Home />} />
      <Route path="/crearjuego" element={<Create />} />
      <Route path="/videogame/:idVideogame" element={<Detail />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
