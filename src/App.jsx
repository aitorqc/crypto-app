import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import CoinDetails from "./pages/CoinDetails";
import Coins from "./pages/Coins";
import Exchanges from "./pages/Exchanges";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route exact path="/coins" element={<Coins />} />
          <Route exact path="/exchanges" element={<Exchanges />} />
          <Route exact path="/coins/:id" element={<CoinDetails />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
