import React from "react";
import ReactDOM from "react-dom";
import App from './App'
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'


import userReducer from './reducer/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    // product: productReducer,
    // category: mainCategoryReducer,
    // userGet: userGetReducer,
    // userGet: userGetReducer,
    // flashSale: flashSaleReducer,
    // arrival: arrivalReducer,
    // best: bestReducer,
  },
})

// import AdminLayout from "layouts/Admin.js";
// import AdminUserLayout from "layouts/UserAddProduct";
// import CallCenterLayout from "layouts/CallCenter";
// import Blank from "views/Blank";
// import SignIn from "layouts/SignIn";

// import { EditProductList } from "views/EditProductList";
// import { EditFlashList } from "views/EditFlashList";


// const [adminAuth, setAdminAuth] = React.useState(false);
// console.log('adminAuth', adminAuth)
ReactDOM.render(
  // <BrowserRouter>
  //   <Switch>
  //     <Route exact path='/model' component={Blank} />
  //     <Route exact path='/editproduct' component={EditProductList} />
  //     <Route exact path='/editflash' component={EditFlashList} />
  //     {/* <Route exact path='/' component={SignIn} /> */}
  //     <Route exact path='/' >
  //       <SignIn setAdminAuth={setAdminAuth} />
  //     </Route>
  //     <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
  //     <Route path="/adminUser" render={(props) => <AdminUserLayout {...props} />} />
  //     <Route path="/callCenter" render={(props) => <CallCenterLayout {...props} />} />

  //     <Redirect from="/login" to="/admin/dashboard" />
  //     <Redirect from="/loginUser" to="/adminUser/addproduct" />
  //     <Redirect from="/loginCall" to="/callCenter/table" />
  //   </Switch>
  // </BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
