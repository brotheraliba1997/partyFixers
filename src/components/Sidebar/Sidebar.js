import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";


import db from "../../config/firebase";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  docRef,
  orderBy,
  query,
  increment,
  deleteDoc,
  addDoc,
  deleteField,
  writeBatch,
} from "@firebase/firestore";

function Sidebar({ color, image, routes }) {



  const [ndata, setData] = React.useState([]);

  React.useEffect(() => {

    // for (var i = 0; i < userData.length; i++) {

    // const collectionProduct = collection(db, "Order", `${userData[i].id}/${userData[i].id}`);
    // const collectionProduct = collection(db, "Order", `${userData.map(data => data.id)}/${userData.map(data => data.id)}`);

    // const collectionProduct = collection(db, "Order", `${userData.map(data => data.id)}`, `${userData.map(data => data.id)}`);
    const collectionProduct = collection(db, "Order");

    const q = query(collectionProduct,
      orderBy("date", "desc")
    );
    // orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // for (var i = 0; i < userData.length; i++) {
      setData(data);
      // }
      // console.log("data;;;;", data.map(ele => {
      //   return ele.order.detail.map(prod => {
      //     return prod.product.name
      //     // return data.name
      // console.log("data", data)
      //   })
      // }))
    });

    return unsub;
    // }
  }, []);




  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar"

      data-image={image} data-color={color}>
      <div
        className="sidebar-black"
      // style={{ color: "white !important" }}
      />
      <div className="sidebar-wrapper"
      >
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="img">
            {/* <img
              src={require("../../assets/img/logo.png").default}
              alt="..."
            /> */}
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    {prop.name == "Order List" ?

                      <p>{`${prop.name} `}
                        {ndata.length > 0 ?
                          <span style={{
                            color: 'red',
                            alignItems: 'center',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginLeft: '3px',
                            // padding: '0.5px',
                            width: '25px',
                            color: 'white',
                            background: 'black',
                            // border: '2px solid ',
                            borderRadius: '50%'
                          }}>
                            {` ${ndata.length}`}
                          </span>
                          : null
                        }

                      </p>
                      :
                      <p>{prop.name}</p>
                    }
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
