import React, { Component, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Image,
  Modal,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Dropdown,
  Button,
  DropdownButton,
  ButtonGroup,
  Row,
  Card,
  Badge,
  Col,
} from "react-bootstrap";
import exportFromJSON from "export-from-json";
import routes from "routes.js";
import db from "../../config/firebase";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import { loginUser } from "../../reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Notifications } from "@mui/icons-material";
import NotiPreCurrentPopop from "components/CostomCompoments/NotiPreCurrentPopop";

import Notifcations from "views/ZaytoonaAdmin/Notifcations";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../../assets/css/style.css";
import Toast from "react-bootstrap/Toast";
import { async } from "@firebase/util";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Header() {
  const dispatch = useDispatch();
  // console.log('props', props)
  const [product, setProduct] = React.useState([]);
  const fileName = "exportData";
  const exportType = "csv";
  const data = product;
  const history = useHistory();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateDecline, setUpdateDecline] = useState(false);

  const [showPrevDetails, setShowPrevDetails] = useState(false);

  const [prevDetails, setPrevDetails] = useState({});
  const [currentDetails, setCurrentDetails] = useState({});

  const [userChanges, setUserChanges] = useState([]);

  // All On click Functions Below This Line
  const handleUserDetailAccepted = () => {
    userChangeAccepted();
    setShowModal(false);
    setShowPrevDetails(false);
  };
  const handleUserDetailDecline = () => {
    userChangeDeclined();

    setShowModal(false);
    setShowPrevDetails(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowPrevDetails(false);
  };

  const handlePreviousDetails = async (data) => {
    const docRef = doc(db, "users", data.uid);
    const docSnap = await getDoc(docRef);   

    if (docSnap.exists()) {
      setPrevDetails(docSnap.data().userDetails);
      setCurrentDetails(data);
    }

    setShowModal(true);
  };

  const handleShowPreviousDetails = () =>
    setShowPrevDetails((prevState) => !prevState);

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  //ALL normal Function below This line

  const userChangeAccepted = async () => {
    const eusr = doc(db, "users", currentDetails.uid);

    await updateDoc(user, {userDetails: currentDetails.userChangeDetails,}).then(async () => {

      await deleteDoc(doc(db, "userProfileChanges", currentDetails.uid)).then(() => {

        Notifcations(
          currentDetails.uid,
          "Unread",
          "Your Profile Has Been Updated",
          "profile"
        );

        setUpdateSuccess(true);

      });
    });
  };

  const userChangeDeclined = async () => {
    await deleteDoc(doc(db, "userProfileChanges", currentDetails.uid)).then(
      () => {
        Notifcations(
          currentDetails.uid,
          "Unread",
          "Your Profile Updated Request Rejected. Please Fill Appropriate Information.",
          "profile"
        );
        setUpdateDecline(true);
      }
    );
  };

  // ALL useEffect Below This line

  React.useEffect(() => {
    const collectionProduct = collection(db, "product");

    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProduct(data);
    });

    return unsub;
  }, []);

  useEffect(() => {
    const userUpdateRequest = query(
      collection(db, "userProfileChanges"),
      where("status", "==", "pending")
    );

    const unsub = onSnapshot(userUpdateRequest, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
      setUserChanges(data);
    });

    return unsub;
  }, []);

 

  const ExportData = () => {
    exportFromJSON({
      data,
      fileName,
      exportType,
    });
  };

        // partyfixer admin data 

        const [CollectData , setCollectData] = useState()
        useEffect(()=> {
          const hander = async() => {
            const querySnapshot = await getDocs(collection(db, "Notification"));
           querySnapshot.forEach((doc) => {
            let getdata = doc.data().notification
            console.log(getdata)
           

            setCollectData(getdata)
      });    
          }
          
          hander()
      
      
      
      },[])

      console.log( "Collection" ,CollectData)


      const NotificationUpdateStatus = async() => {
        const newCityRef = doc(collection(db, "Notification"));

            // later...
        await setDoc(newCityRef, data);
        

      }





  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <div className="screen_full_navbar_  d-flex justify-content-center align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
            <Navbar.Brand
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="mr-2"
            >
              {getBrandText()}
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <div className="screen_full_size"  >
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                id="dropdown-split-basic"
                as={Notifications}
                
                style={{ cursor: "pointer" }} 
              />
              {CollectData?.length > 0 ?  (
                
                <h6 style={{ cursor: "pointer" }} onClick={NotificationUpdateStatus}  >
                  <span className="position-absolute top-0 start-150 translate-middle badge rounded-pill bg-danger"  >
                    {CollectData?.length}+
                    
                   

                  </span>
                  
                </h6>
              ) : null}

              <Dropdown.Menu align={"end"} className={"DropDown_Notification"}>
                <Dropdown.Item>
                  <div className="d-flex justify-content-between align-items-center mb-3 bg-muted">
                    <div className="fw-bold text-danger">Notifcations</div>
                    <div className="fw-bold text-muted">x</div>
                  </div>

                  {CollectData?.length > 0 ? (
                    CollectData.map((item) => (
                      <div
                        className="d-flex justify-content-between  gap-5"
                        key={item.id}
                      >
                        <div>
                          {" "}
                          <p className="mt-2 Update_Request fw-bold  ">
                            Update Request From{" "}
                            {item?.userName}
                          </p>
                        </div>
                        <div>
                          <button
                            className=" Notification_View_Details_Btn outline-danger bg-danger border-danger text-white  "
                            onClick={() => handlePreviousDetails(item)}
                          >
                            <p
                              className="m-0 fw-bold "
                              style={{ fontSize: 14 }}
                            >
                              View Details
                            </p>
                          </button>
                        </div>

                      </div>

                    ))
                  ) : (
                    <Card.Header>
                      <h5
                        style={{
                          color: "red",
                          margin: "auto",
                          textAlign: "center",
                        }}
                      >
                        No Notification
                      </h5>
                    </Card.Header>
                  )}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>




          <NotiPreCurrentPopop
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            showPrevDetails={showPrevDetails}
            prevDetails={prevDetails}
            currentDetails={currentDetails}
            handleShowPreviousDetails={handleShowPreviousDetails}
            handleUserDetailAccepted={handleUserDetailAccepted}
            handleUserDetailDecline={handleUserDetailDecline}

          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ marginLeft: "auto" }} className="ml-auto" navbar>
                  <Nav.Item>
                    <Nav.Link
                      className="m-0"
                      onClick={() => ExportData()}
                    // onClick={(e) => history.push('/')}
                    >
                      <span className="no-icon">Export</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="m-0"
                      // onClick={(e) => history.push('/')}
                      onClick={() => dispatch(loginUser(false))}
                    >
                      <span className="no-icon">Log out</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* {updateSuccess ?
        <Alert variant="info" onClose={() => setUpdateSuccess(false)} dismissible>
          <Alert.Heading>Successfully Updated!</Alert.Heading>
        </Alert>
        :
        null
      }
      {updateDecline ?
        <Alert variant="danger" onClose={() => setUpdateDecline(false)} dismissible>
          <Alert.Heading>Successfully Updated!</Alert.Heading>
        </Alert>
        :
        null
      } */}
      <Snackbar
        open={updateSuccess}
        autoHideDuration={2000}
        onClose={() => setUpdateSuccess(false)}
      >
        <Alert
          onClose={() => setUpdateSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          User Changes Updated!
        </Alert>
      </Snackbar>
      <Snackbar
        open={updateDecline}
        autoHideDuration={2000}
        onClose={() => setUpdateDecline(false)}
      >
        <Alert
          onClose={() => setUpdateDecline(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          User Changes Rejected!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Header;
