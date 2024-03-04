import React from "react";
import Addresses from "../pages/user/Addresses/Addresses";
import Profile from "../pages/user/profile/Profile";
import PaymentSuccess from "../pages/user/paymentSuccess/PaymentSuccess";
import Checkout from "../pages/user/checkout/Checkout";
import CartPage from "../pages/user/cart/CartPage";
import AdminAddProduct from "../pages/admin/products/AdminAddProduct/AdminAddProduct";
import AdminAllProducts from "../pages/admin/products/AdminAllProducts/AdminAllProducts";
import AllProducts from "../pages/user/products/AllProducts/AllProducts";
import NotFound404 from "../pages/NotFound404/NotFound404";
import Login from "../features/login/Login";
import SignUp from "../features/SignUp.jsx/SignUp";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import SingleProduct from "../pages/user/products/SingleProduct/SingleProduct";
import AllUser from "../pages/admin/users/AllUsers";
import { Route, Routes } from "react-router-dom";
import "./AllRoutes.css";
import AllOrders from "../pages/user/orders/AllOrders/AllOrders";
import SingleOrder from "../pages/user/orders/SingleOrder/SingleOrder";
import AddCompany from "../pages/admin/companies/AddCompany/AddCompany";
import AllCompanies from "../pages/admin/companies/AllCompanies/AllCompanies";
import Temp from "../pages/admin/products/AdminAllProducts/Temp";
import AddGroup from "../pages/admin/categorization/groups/AddGroup/AddGroup";
import AllGroup from "../pages/admin/categorization/groups/AllGroup/AllGroup";
import AddCategory from "../pages/admin/categorization/categories/AddCategory/AddCategory";
import AllCategories from "../pages/admin/categorization/categories/AllCategories/AllCategories";
import AddSubCategory from "../pages/admin/categorization/subcategories/AddSubCategory/AddSubCategory";
import AdminDashboard from "../pages/admin/admindashboard/AdminDashboard";

const AllRoutes = ({ loading }) => {
  return (
    <div className="allroutes">
      <Routes>
        <Route path="/" element={<AllProducts />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/products" element={<AllProducts />} />
        <Route path="product/">
          <Route path=":id" element={<SingleProduct />} />
        </Route>

        <Route element={<ProtectedRoute loading={loading} />}>
          <Route path="/admin/">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="groups/add" element={<AddGroup />} />
            <Route path="groups/all" element={<AllGroup />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/all" element={<AllCategories />} />
            <Route path="subcategories/add" element={<AddSubCategory />} />
            <Route path="subcategories/all" element={<AllCategories />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/edit" element={<AdminAddProduct />} />
            <Route path="products/all" element={<AdminAllProducts />} />
            <Route path="users/all" element={<AllUser />} />
            <Route path="companies/add" element={<AddCompany />} />
            <Route path="companies/all" element={<AllCompanies />} />
          </Route>

          <Route path="/profile/">
            <Route path="me" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders/" element={<AllOrders />} />
            <Route path="orders/">
              <Route path=":id" element={<SingleOrder />} />
            </Route>
          </Route>
        </Route>

        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/temp" element={<Temp />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
