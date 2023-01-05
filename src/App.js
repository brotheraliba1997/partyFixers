import React from "react";

import { BrowserRouter, Route, Switch, Redirect, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import AdminUserLayout from "layouts/UserAddProduct";
import CallCenterLayout from "layouts/CallCenter";
import Blank from "views/Blank";
import SignIn from "layouts/SignIn";

// import { adminProtect } from 'ProtectRoute/adminProtect'

import { EditProductList } from "views/EditProductList";
import { EditFlashList } from "views/EditFlashList";
import { Invoice } from "views/Invoice";
import { Print } from "views/Print";
import CategoryList from "views/ZaytoonaAdmin/CategoryList";
import { EditCategory } from "views/ZaytoonaAdmin/EditCategory";

import {
    useDispatch,
    useSelector
} from "react-redux";
import { EditPackageList } from "views/ZaytoonaAdmin/EditPackageList";

const App = () => {
    // const [adminAuth, setAdminAuth] = React.useState(false);
    // const [callCenterAuth, setcallCenterAuth] = React.useState(false);
    // const [userAuth, setUserAuth] = React.useState(false);
    const udata = useSelector((state) => state.user.initialState);
    // console.log('udata', udata)
    return (

        <BrowserRouter>
            <Switch>
                <Route exact path='/model' component={Blank} />
                <Route exact path='/editproduct' component={EditProductList} />
                <Route exact path='/editpackage' component={EditPackageList} />
                <Route exact path='/editflash' component={EditFlashList} />
                <Route exact path='/editCategory' component={EditCategory} />
                <Route exact path='/categoryList' component={CategoryList} />
                <Route exact path='/Invoice' component={Invoice} />
                <Route exact path='/Print' component={Print} />
                {/* <Route exact path='/' component={SignIn} /> */}
                <Route exact path='/' >
                    <SignIn
                    // setAdminAuth={setAdminAuth} setcallCenterAuth={setcallCenterAuth} setUserAuth={setUserAuth} 
                    />
                </Route>


                <Route path="/admin" render={(props) => {
                    return udata.payload === true ?
                        <AdminLayout {...props} /> : <Redirect to="/" />
                }}
                />

                <Route path="/adminUser" render={(props) => {
                    return udata.payload === true ?
                        <AdminUserLayout {...props} /> : <Redirect to="/" />
                }}
                />


                <Route path="/callCenter" render={(props) => {
                    return udata.payload === true ?
                        <CallCenterLayout {...props} /> : <Redirect to="/" />
                }
                }
                />

                <Redirect from="/login" to="/admin/dashboard" />


                <Redirect from="/loginUser" to="/adminUser/addproduct" />
                <Redirect from="/loginCall" to="/callCenter/table" />
            </Switch>
        </BrowserRouter>

    )
}


export default App;
