import React from "react";
import "./AdminSidebar.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import sidebarData from "./sidebarData";
import SidebarItemCollapse from "./SidebarItemCollapse/SidebarItemCollapse";
import Accordion from "react-bootstrap/Accordion";

const AdminSidebar = () => {
  return (
    <div className="adminsidebar">
      <Accordion flush>
        {sidebarData.map((item, index) =>
          item.childrens ? (
            <SidebarItemCollapse
              item={item}
              level={1}
              key={index}
              indexKey={index + ""}
            />
          ) : (
            <SidebarItem
              item={item}
              key={index}
              isChild={false}
              level={1}
              indexKey={index + ""}
            />
          )
        )}
      </Accordion>
    </div>
  );
};

export default AdminSidebar;
