import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import CreateDog from "./pages/CreateDog.jsx";
import DogDetail from "./pages/DogDetail.jsx";
import NotFound from "./pages/404.jsx";

function App() {
    useEffect(() => {
    localStorage.clear();
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/factory" element={<CreateDog />} />
          <Route path="/dog/:name" element={<DogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
