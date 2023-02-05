import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "./Sidebar.css";

function Sidebare() {

  return (
    <div style={{ display: 'flex', height: '100vh', minHeight: '400px', position:'fixed' , top:'80px' ,zIndex : 1 }}>
      <Sidebar customBreakPoint="800px">
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Sidebare;
