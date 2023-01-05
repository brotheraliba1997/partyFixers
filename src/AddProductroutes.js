import Dashboard from "views/Dashboard.js";
import AddProduct from "views/AddProduct";
import TableList from "views/TableList.js";
import ProductList from "views/ProductList";
import SoldProduct from "views/SoldProduct";
import AddCategory from "views/AddCategory";
import AddBanner from "views/AddBanner";
import OrderProcess from "views/OrderProcess";
import OrderReject from "views/OrderReject";
import DraftList from "views/DraftList";
import CategoryList from "views/CategoryList";
const dashboardRoutes = [
  {
    path: "/addproduct",
    name: "Add Product",
    icon: "nc-icon  nc-simple-add",
    component: AddProduct,
    layout: "/adminUser",
  },
  {
    path: "/product",
    name: "Product List",
    icon: "nc-icon  nc-notes",
    component: ProductList,
    layout: "/adminUser",
  },
  {
    path: "/draft",
    name: "Draft List",
    icon: "nc-icon  nc-bullet-list-67",
    component: DraftList,
    layout: "/adminUser",
  },
  {
    path: "/soldProduct",
    name: "Sold Product",
    icon: "nc-icon  nc-bullet-list-67",
    component: SoldProduct,
    layout: "/adminUser",
  },
  {
    path: "/categoryList",
    name: "Category List",
    icon: "nc-icon  nc-bullet-list-67",
    component: CategoryList,
    layout: "/adminUser",
  },
  {
    path: "/addcategory",
    name: "Add Category",
    icon: "nc-icon  nc-simple-add",
    component: AddCategory,
    layout: "/adminUser",
  },
  {
    path: "/addbanner",
    name: "Add Banner",
    icon: "nc-icon  nc-simple-add",
    component: AddBanner,
    layout: "/adminUser",
  },
];

export default dashboardRoutes;
