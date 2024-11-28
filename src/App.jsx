import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./Customer/Page";




function App() {


  return (
    <div className="flex justify-center container_app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />} />




          {/*  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

