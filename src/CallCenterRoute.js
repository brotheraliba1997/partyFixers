import Dashboard from "views/Dashboard.js";
import AddProduct from "views/AddProduct";
import TableList from "views/TableList.js";
import ProductList from "views/ProductList";
import AddCategory from "views/AddCategory";
import OrderProcess from "views/OrderProcess";
import OrderReject from "views/OrderReject";
const dashboardRoutes = [
    {
        path: "/table",
        name: "Order List",
        icon: "nc-icon nc-notes",
        component: TableList,
        layout: "/callCenter",
      },
];

export default dashboardRoutes;
