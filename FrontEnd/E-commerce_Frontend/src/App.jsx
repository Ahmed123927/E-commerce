import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/register";
import LoginForm from "./pages/LoginPage/loginPage";
import Landing from "./pages/LandingPage/landingPage";
import AdminPage from "./pages/AdminPage/adminPage";
import CategoryAdd from "./pages/CategoryAdd/categoryAdd";
import ShowPage from "./pages/ShowCategoryPage/showPage";
import Seller from "./components/Seller/seller"; // Import Seller instead of seller
import SellerHome from "./pages/SellerPage/sellerHome";
import ManageProduct from "./pages/ManageSellerProduct/manageProductPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import ShopHomePage from "./pages/ShopHomePage/shopHomePage";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts"; // Import CategoryProducts
import Cart from "./pages/CartPage/Cart";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/category" element={<CategoryAdd />} />
          <Route path="/show-category" element={<ShowPage />} />
          <Route path="/sellerHome" element={<SellerHome />} /> {/* Use Seller instead of seller */}
          <Route path="/manage-product" element={<ManageProduct />} /> 
          <Route path="/add-product" element={<AddProductPage />} /> 
          <Route path="/shop" element={<ShopHomePage />} /> 
          <Route path="/category/:id" element={<CategoryProducts />} /> {/* Define route for CategoryProducts */}
          <Route path="/cart" element={<Cart />} /> 

          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
