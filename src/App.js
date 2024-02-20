import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Header from "./pages/Header";
import Products from "./components/Products";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart";
import Admin from "./Admin/Admin";
import { Provider } from "react-redux";
import store from "./redux/store";
import ViewProducts from "./Admin/ViewProducts";
import AddProducts from "./Admin/AddProducts";
import AddCategory from "./Admin/AddCategory";
import ViewCatogories from "./Admin/ViewCatogories";
import ViewSlider from "./Admin/ViewSlider";
import AddSlider from "./Admin/AddSlider";
import ProductDetail from "./components/ProductDetail";
import CheckoutDetails from "./pages/CheckoutDetails";
import CheckOut from "./components/CheckOut";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AddUsers from "./Admin/AddUsers";
import ViewUsers from "./Admin/ViewUsers";
import AdminHome from "./Admin/AdminHome";
import MyOrder from "./pages/MyOrder";
import Orders from "./Admin/Orders";
import OrderDetails from "./components/OrderDetails";
import MyOrderDetails from "./components/MyOrderDetails";
import "./App.css";
import Footer from "./pages/Footer";
import About from "./pages/About";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          transition={Flip}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route
            path="/admin"
            element={
              // <AdminProtected>
              <Admin />
              // </AdminProtected>
            }
          >
            <Route path="adminhome" element={<AdminHome />}></Route>
            <Route path="viewproducts" element={<ViewProducts />}></Route>
            <Route path="addproducts" element={<AddProducts />}></Route>
            <Route path="editproducts/:id" element={<AddProducts />}></Route>
            <Route path="addcategory" element={<AddCategory />}></Route>
            <Route path="viewcategories" element={<ViewCatogories />}></Route>
            <Route path="viewsliders" element={<ViewSlider />}></Route>
            <Route path="addsliders" element={<AddSlider />}></Route>
            <Route path="addusers" element={<AddUsers />}></Route>
            <Route path="editusers/:id" element={<AddUsers />}></Route>
            <Route path="view-users" element={<ViewUsers />}></Route>
            <Route path="vieworders" element={<Orders />}></Route>
            <Route path="order-details/:id" element={<OrderDetails />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout-details" element={<CheckoutDetails />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route path="/productdetail/:id" element={<ProductDetail />}></Route>
          <Route path="/checkoutsuccess" element={<CheckoutSuccess />}></Route>
          <Route path="/myorders" element={<MyOrder />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/myorder-details/:id"
            element={<MyOrderDetails />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
