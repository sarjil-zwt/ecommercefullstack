import {
  Avatar,
  Drawer,
  IconButton,
  List,
  Stack,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sizeConfigs from "../../configs/sizeConfigs";
import colorConfigs from "../../configs/colorConfigs";
// import SidebarItemCollapse from "../Sidebar/SidebarItemCollapse";
// import SidebarItem from "../Sidebar/SidebarItem";
import {
  Add,
  CategoryOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  DashboardOutlined,
  GridViewOutlined,
  GroupAddOutlined,
  PersonOutline,
  ShoppingCartOutlined,
  StyleOutlined,
  WorkspacesOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import { useTheme } from "@emotion/react";
import { VscOrganization } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
import SidebarItem from "./SidebarItem/SidebarItem";
import sidebarData from "./sidebarData";
import SidebarItemCollapse from "./SidebarItemCollapse/SidebarItemCollapse";
import Accordion from "react-bootstrap/Accordion";

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const userState = useSelector((state) => state.userState);
  const cartState = useSelector((state) => state.cartState);

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
