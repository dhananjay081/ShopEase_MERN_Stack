import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../component/Home/Home.js";
import ProductDetails from "../component/Product/ProductDetails.js";
import Products from "../component/Product/Products.js";
import Search from "../component/Product/search.js";
import LoginSignUp from "../component/User/LoginSignUp.js";
import Profile from "../component/User/Profile.js";
import UpdateProfile from "../component/User/UpdateProfile.js";
import UpdatePassword from "../component/User/UpdatePassword.js";
import ForgotPassword from "../component/User/ForgotPassword.js";
import ResetPassword from "../component/User/ResetPassword.js";
import Cart from "../component/Cart/Cart.js";
import Shipping from "../component/Cart/Shipping.js";
import ConfirmOrder from "../component/Cart/ConfirmOrder.js";
import OrderSuccess from "../component/Cart/OrderSuccess.js";
import MyOrders from "../component/Order/MyOrders.js";
import OrderDetails from "../component/Order/OrderDetails.js";
import Dashboard from "../component/admin/Dashboard.js";
import ProductList from "../component/admin/ProductList.js";
import NewProduct from "../component/admin/NewProduct.js";
import UpdateProduct from "../component/admin/UpdateProduct.js";
import OrderList from "../component/admin/OrderList.js";
import ProcessOrder from "../component/admin/ProcessOrder.js";
import UsersList from "../component/admin/UsersList.js";
import UpdateUser from "../component/admin/UpdateUser.js";
import ProductReviews from "../component/admin/ProductReviews.js";
import NotFound from "../component/layout/Not Found/NotFound.js";
import ProtectedRoute from "../component/Route/ProtectedRoute.js";
import Contact from "../component/layout/Contact/Contact.js";
import About from "../component/layout/About/About.js";
import PaymentForm from '../payment/paymetForm.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App as the layout component
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:keyword", element: <Products /> },
      { path: "/search", element: <Search /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <LoginSignUp /> },
      { path: "*", element: <NotFound /> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/account", element: <Profile /> },
          { path: "/me/updates", element: <UpdateProfile /> },
          { path: "/password/update", element: <UpdatePassword /> },
          { path: "/cart", element: <Cart /> },
          { path: "/shipping", element: <Shipping /> },
          { path: "/success", element: <OrderSuccess /> },
          { path: "/orders", element: <MyOrders /> },
          { path: "/order/confirm", element: <ConfirmOrder /> },
          { path: "/order/:id", element: <OrderDetails /> },


          { path: "/process/payment", element: <PaymentForm/> },
        ],
      },

      // Admin Routes
      {
        element: <ProtectedRoute isAdmin={true} />,
        children: [
          { path: "/admin/dashboard", element: <Dashboard /> },
          { path: "/admin/products", element: <ProductList /> },
          { path: "/admin/product", element: <NewProduct /> },
          { path: "/admin/product/:id", element: <UpdateProduct /> },
          { path: "/admin/orders", element: <OrderList /> },
          { path: "/admin/orders/:id", element: <ProcessOrder /> },
          { path: "/admin/users", element: <UsersList /> },
          { path: "/admin/user/:id", element: <UpdateUser /> },
          { path: "/reviews", element: <ProductReviews /> },
        ],
      },

      // Password Routes
      { path: "/password/forgot", element: <ForgotPassword /> },
      { path: "/password/reset/:token", element: <ResetPassword /> },
    ],
  },
]);

export default router;
