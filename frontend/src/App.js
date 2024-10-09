import React, { useEffect } from "react";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/footer/footer.js";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    const token = localStorage.getItem("authToken");
    if (token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <>
      <Header />
      {/* <Slider /> */}
      <main className='min-h-[calc(100vh-120px)] pt-16'>
      {isAuthenticated && <UserOptions user={user} />}
      <Outlet />
      </main>
      

      <Footer />
    </>
  );
}

export default App;
