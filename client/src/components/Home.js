import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Nav from "./Nav";

function Home() {
    
  return (
    <div>
      <h1>Dogs-API</h1>
      <Link to="/dogs">
        <button>Lets know thems</button>
      </Link>
      {/* AGREGAR IMAGEN DE FONDO ACA! */}
    </div>
  );
}
export default Home;
