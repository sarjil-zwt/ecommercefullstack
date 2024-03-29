import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { login } from "./redux/features/userSlice";
import Loader from "./components/loader/Loader";
import { setCartState } from "./redux/features/cartSlice";
import { setAddressesState } from "./redux/features/addressSlice";
import Header from "./components/Header/Header";
import { setGroupsState } from "./redux/features/groupSlice";
import AllRoutes from "./routes/AllRoutes";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import { setOrdersState } from "./redux/features/orderSlice";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      await axios
        .get("/groups")
        .then((res) => {
          dispatch(setGroupsState(res.data.groups));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.message || "Error");
        });

      await axios
        .get("/user/me")
        .then((res) => {
          dispatch(login(res.data));
          dispatch(setCartState(res.data.user.Cart));
          dispatch(setAddressesState(res.data.user.Addresses));
          dispatch(setOrdersState(res.data.user.Orders));
          // navigate("/");
          toast.success("Login Successful");
        })
        .catch((err) => {
          console.log(err.response.data.message || "Error loading user");
          toast.error("Please Login");
          // navigate("/login"); // Programmatically navigate to the login page
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("lastLocation", location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="App">
      <Toaster position="bottom-right" containerStyle={{ zIndex: 10000000 }} />

      {loading && <Loader />}

      {/* {userState?.isLoggedIn && userState?.userState?.eRole === "admin" && (
       
      )} */}

      {/* <AdminSidebar /> */}

      <Header />
      <AllRoutes loading={loading} />
    </div>
  );
}

export default App;
