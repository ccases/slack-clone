import React from "react";
import "./SidebarOption.css";

const SidebarOptions = ({ Icon, title }) => {
  return (
    <div className="sidebar-option-container">
      {Icon && (
        <Icon fontSize="20px" style={{ paddingRight: "4px", color: "white" }} />
      )}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <div className="sidebar-option-channel">
          <span>#</span> {title}
        </div>
      )}
    </div>
  );
};

export default SidebarOptions;
