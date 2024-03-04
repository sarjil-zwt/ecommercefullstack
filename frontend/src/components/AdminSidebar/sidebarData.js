import { MdAdd, MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { CiBoxes } from "react-icons/ci";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { TbResize } from "react-icons/tb";
import { CgSize } from "react-icons/cg";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GoGear, GoOrganization } from "react-icons/go";
import { RiCoupon3Line } from "react-icons/ri";
import { CiCircleList } from "react-icons/ci";

const sidebarData = [
  {
    path: "/admin/dashboard",
    displayText: "Dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    path: "/admin/products",
    displayText: "Products",
    icon: <CiBoxes />,
    childrens: [
      {
        path: "/admin/products/add",
        displayText: "Add Product",
        icon: <MdAdd />,
      },
      {
        path: "/admin/products/all",
        displayText: "All Products",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    path: "/admin/categories",
    displayText: "Categorization",
    icon: <MdOutlineCategory />,
    childrens: [
      {
        path: "/admin/categorization/groups",
        displayText: "Groups",
        icon: <LiaLayerGroupSolid />,

        childrens: [
          {
            path: "/admin/categorization/groups/add",
            displayText: "Add Group",
            icon: <MdAdd />,
          },
          {
            path: "/admin/categorization/groups/all",
            displayText: "All Groups",
            icon: <CiCircleList />,
          },
        ],
      },
      {
        path: "/admin/categorization",
        displayText: "Categories",
        icon: <LiaLayerGroupSolid />,

        childrens: [
          {
            path: "/admin/categorization/categories/add",
            displayText: "Add Category",
            icon: <MdAdd />,
          },
          {
            path: "/admin/categorization/categories/all",
            displayText: "All Categories",
            icon: <CiCircleList />,
          },
        ],
      },
      {
        path: "/admin/categorization/subcategories",
        displayText: "Sub Categories",
        icon: <LiaLayerGroupSolid />,

        childrens: [
          {
            path: "/admin/categorization/subcategories/add",
            displayText: "Add Subcategory",
            icon: <MdAdd />,
          },
          {
            path: "/admin/categorization/groups/all",
            displayText: "All subcategories",
            icon: <CiCircleList />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/sizes",
    displayText: "Sizes",
    icon: <TbResize />,
    childrens: [
      {
        path: "/admin/sizes/sizecategories",
        displayText: "Size Categories",
        icon: <CgSize />,

        childrens: [
          {
            path: "/admin/sizes/sizecategories/add",
            displayText: "Add Size Category",
            icon: <MdAdd />,
          },
          {
            path: "/admin/sizes/sizecategories/all",
            displayText: "All Size Categories",
            icon: <CiCircleList />,
          },
        ],
      },
      {
        path: "/admin/sizes/sizeoptions",
        displayText: "Size Options",
        icon: <LiaLayerGroupSolid />,

        childrens: [
          {
            path: "/admin/sizes/sizeoptions/add",
            displayText: "Add Size Option",
            icon: <MdAdd />,
          },
          {
            path: "/admin/sizes/sizeoptions/all",
            displayText: "All Size Options",
            icon: <CiCircleList />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/shippingtypes",
    displayText: "Shipping Types",
    icon: <LiaShippingFastSolid />,
    childrens: [
      {
        path: "/admin/shippingtypes/add",
        displayText: "Add Shipping Type",
        icon: <MdAdd />,
      },
      {
        path: "/admin/shippingtypes/all",
        displayText: "All Shipping Types",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    path: "/admin/colors",
    displayText: "Colours",
    icon: <IoColorPaletteOutline />,
    childrens: [
      {
        path: "/admin/colors/add",
        displayText: "Add Colour",
        icon: <MdAdd />,
      },
      {
        path: "/admin/colors/all",
        displayText: "All Colours",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    path: "/admin/brands",
    displayText: "Brands",
    icon: <GoOrganization />,
    childrens: [
      {
        path: "/admin/brands/add",
        displayText: "Add Brand",
        icon: <MdAdd />,
      },
      {
        path: "/admin/brands/all",
        displayText: "All Brands",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    path: "/admin/specifications",
    displayText: "Specification for Product",
    icon: <GoGear />,
    childrens: [
      {
        path: "/admin/specifications/add",
        displayText: "Add Specification",
        icon: <MdAdd />,
      },
      {
        path: "/admin/specifications/all",
        displayText: "All Specifications",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    path: "/admin/couponcodes",
    displayText: "Couponcodes",
    icon: <RiCoupon3Line />,
    childrens: [
      {
        path: "/admin/couponcodes/add",
        displayText: "Add Couponcode",
        icon: <MdAdd />,
      },
      {
        path: "/admin/couponcodes/all",
        displayText: "All Couponcodes",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    path: "/profile",
    displayText: "Profile",
    icon: <MdOutlineDashboard />,
  },
];

export default sidebarData;
