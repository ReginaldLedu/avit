import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import ItemPage from "./pages/ItemPage";
import SellerProfile from "./pages/SellerProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CurrentPost from "./pages/CurrentPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/itemPage" element={<ItemPage />} />
        <Route path="/sellerprofile" element={<SellerProfile />} />
        <Route path="/chosenPost" element={<CurrentPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
