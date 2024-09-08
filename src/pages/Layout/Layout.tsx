import { Outlet } from "react-router-dom";
import Nav from "./Navbar";
import "../../style/Layout.css"




const Layout = () => {

  return (
    <div className="bg">
      <Nav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
