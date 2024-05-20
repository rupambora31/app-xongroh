import { Outlet } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mb-24">
        <Outlet />
      </main>
      <BottomNavBar />
    </>
  );
};

export default Layout;
