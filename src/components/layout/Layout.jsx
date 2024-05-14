import { Outlet } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNavBar />
    </>
  );
};

export default Layout;
