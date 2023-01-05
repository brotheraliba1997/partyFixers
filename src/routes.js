import Dashboard from "views/Dashboard.js";
import AddProduct from "views/AddProduct";
import TableList from "views/TableList.js";
import ProductList from "views/ProductList";
import SoldProduct from "views/SoldProduct";
import DraftList from "views/DraftList";
import AddCategory from "views/AddCategory";
import AddBanner from "views/AddBanner";
import OrderProcess from "views/OrderProcess";
import OrderReject from "views/OrderReject";
import OrderDispatch from "views/OrderDispatch";
import FlashSaleProductList from "views/FlashSaleProductList";
import { UserList } from "views/UserList";
import { EditProductList } from "views/EditProductList";
import AddPackages from "views/AddPackages";
import PackageList from "views/PackageList";
import { EditPackageList } from "views/ZaytoonaAdmin/EditPackageList";
import CategoryList from "views/ZaytoonaAdmin/CategoryList";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/userList",
    name: "User's List",
    icon: "nc-icon  nc-circle-09",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/addcategory",
    name: "Add Category",
    icon: "nc-icon  nc-simple-add",
    component: AddCategory,
    layout: "/admin",
  },
  {
    path: "/categoryList",
    name: "Category List",
    icon: "nc-icon  nc-bullet-list-67",
    component: CategoryList,
    layout: "/admin",
  },
  {
    path: "/AddPackages",
    name: "Add Packages",
    icon: "nc-icon nc-simple-add",
    component: AddPackages,
    layout: "/admin",
  },
  // {
  //   path: "/addbanner",
  //   name: "Add Banner",
  //   icon: "nc-icon  nc-simple-add",
  //   component: AddBanner,
  //   layout: "/admin",
  // },
  // {
  //   path: "/addproduct",
  //   name: "Add Product",
  //   icon: "nc-icon  nc-simple-add",
  //   component: AddProduct,
  //   layout: "/admin",
  // },
  {
    path: "/PackagesList",
    name: "Packages List",
    icon: "nc-icon  nc-bullet-list-67",
    component: PackageList,
    layout: "/admin",
  },
  // {
  //   path: "/draft",
  //   name: "Draft List",
  //   icon: "nc-icon  nc-bullet-list-67",
  //   component: DraftList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/soldProduct",
  //   name: "Sold Product",
  //   icon: "nc-icon  nc-bullet-list-67",
  //   component: SoldProduct,
  //   layout: "/admin",
  // },
  // {
  //   path: "/flashSale",
  //   name: "Flash Sale List",
  //   icon: "nc-icon  nc-bullet-list-67",
  //   component: FlashSaleProductList,
  //   layout: "/admin",
  // },


  // {
  //   path: "/editpackage",
  //   name: "Edit Package List",
  //   icon: "nc-icon  nc-notes",
  //   component: EditPackageList,
  //   layout: "/admin",
  // },

  // {
  //   path: "/editproduct",
  //   name: "Edit Product List",
  //   icon: "nc-icon  nc-notes",
  //   component: EditProductList,
  //   layout: "/admin",
  // },


  // {
  //   path: "/table",
  //   name: "Order List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },

  // {
  //   path: "/orderProcess",
  //   name: "Order Process",
  //   icon: "nc-icon nc-refresh-02",
  //   component: OrderProcess,
  //   layout: "/admin",
  // },
  // {
  //   path: "/orderDispatch",
  //   name: "Order Dispatch",
  //   icon: "nc-icon nc-delivery-fast",
  //   component: OrderDispatch,
  //   layout: "/admin",
  // },
  // {
  //   path: "/orderReject",
  //   name: "Order Reject",
  //   icon: "nc-icon nc-vector",
  //   component: OrderReject,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
