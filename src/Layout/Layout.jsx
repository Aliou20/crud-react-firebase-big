import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import Sidebare from "../Composants/Sidebar";
import Navbar from "../Composants/Navbar";
import { useProSidebar } from "react-pro-sidebar";
import "../Composants/Layout.css";

function Layout() {
  const { toggleSidebar, broken } = useProSidebar();
  return (
    <div className="">
      <Sidebare />
      <div className="d-flex align-items-center">
        <Navbar toggleSidebar={toggleSidebar} broken={broken} />
        <div
          className="children"
          style={{ position: "relative", top: "100px" }}
        >
          dmlgkhêrahrehôrh orgero^ho
        </div>
      </div>
    </div>
  );
}

export default Layout;
