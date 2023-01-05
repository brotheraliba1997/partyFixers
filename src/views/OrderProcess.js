import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Image,
  Form
} from "react-bootstrap";
import db from "../config/firebase";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
  deleteDoc,
  addDoc,
} from "@firebase/firestore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
import emailjs from 'emailjs-com';
import FormControl from "react-bootstrap/FormControl"


const OrderProcess = () => {
  const [ndata, setData] = useState([]);
  const [search, setSearch] = React.useState('');


  React.useEffect(() => {
    const collectionProduct = collection(db, "OrderProcess");
    const q = query(collectionProduct,
      orderBy("orderId", "desc"),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      // const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(data);
    });
    return unsub;
  }, []);
  const [open, setOpen] = React.useState(false);

  const [sdata, setSdata] = useState([]);

  const handleClickOpen = (detail) => {
    setOpen(true);
    setSdata(detail.map((data) => data));
    // console.log(detail.map((data) => data));
  };

  const handleClose = () => {
    setOpen(false);
  };



  const SendDispatch = (data) => {
    // console.log('data', data)
    addDoc(collection(db, 'OrderDispatch'), {
      ...data,
    })
      .then(
        addDoc(collection(db, 'salesReport'), {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          orderId: data.orderId,
          customerName: data.user.fullname,
          customerEmail: data.user.email,
          customerPhone: data.user.phone,
          total: data.total,
        })
      )
      .then(
        deleteDoc(doc(db, "OrderProcess", data.id))
      )
    var templateParams = {
      name: data.user.fullname,
      email: data.user.email,
      total: data.total,
      orderId: data.orderId,
    };

    emailjs.send('service_a0tlqkf', 'template_600qijn', templateParams, 'user_ugj5oxo84z7DRFs40GT1n')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });
  };
  // console.log('data', new Date().toLocaleDateString())





  // const SendDataApi = async () => {
  //   axios({
  //     method: 'post',
  //     url: 'https://sonic.pk/api/shipment/book',
  //     // mode: 'no-cors',
  //     headers: {
  //       'Authorization': 'SjhwRkp4MDFBZENwMVAzMWVUeU53b1RuUTJ2SVVUalVpMzc0NDhLdWwxTGRsOVNJdHdMaVZJN1FMV25t6178f7f46dc0a'
  //     },
  //     data: {

  //     }

  //   }).then((res) => {
  //     console.log(res)
  //   })

  // try{
  //   let data = await fetch('https://sonic.pk/api/pickup_addresses',{
  //     // mode: 'no-cors',
  //     headers:{
  //       'Content-Type': 'application/json;charset=UTF-8',
  //       'Authorization': 'SjhwRkp4MDFBZENwMVAzMWVUeU53b1RuUTJ2SVVUalVpMzc0NDhLdWwxTGRsOVNJdHdMaVZJN1FMV25t6178f7f46dc0a'
  //     }
  //   })
  //   console.log(data)
  //   if(!data.ok){
  //     throw Error('No data avaible')
  //   }
  //   let cities = await data.json()
  //   console.log(cities)
  // }catch(err){
  //   console.log(err)
  // }

  // };



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <Card.Title as="h4">Order Table</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Order ID</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">User Name</th>
                      {/* <th className="border-0">User Email</th> */}
                      <th className="border-0">Product Name</th>
                      <th />
                      <th className="border-0">Total</th>
                      <th className="border-0">City</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Phone / Email</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {ndata.filter(data => {
                      if (search === '') {
                        return data
                      } else if (data.address.fullName.toLowerCase().includes(search.toLocaleLowerCase())) {
                        return data
                      } else if (data.orderId.toString() === search) {
                        return data
                      }
                    }).map((data, index) => (
                      <tr>
                        <>
                          <td>{index}</td>
                          {data.orderId ?
                            <td>{data.orderId}</td> : <td>Not Mention</td>
                          }
                          {data.date ?
                            <td>{data.date}</td> : <td>Not Mention</td>
                          }
                          <td>{data.address.fullName}</td>
                          {/* <td>{data.order.user.email}</td> */}
                          <td>
                            {data.detail.map((data) => (
                              <div style={{ fontSize: "12px", width: "250px" }}>{data.name}</div>
                            ))}
                          </td>
                          <td>
                            <VisibilityIcon
                              onClick={() =>
                                handleClickOpen(data.detail)
                              }
                            />
                          </td>
                          <td>Rs: {data.total}</td>
                          <td>{data.address.city}</td>
                          <td>{data.address.address}</td>
                          <td>{data.address.phone}<br />{data.user.email}</td>
                          <td>
                            <Button
                              style={{
                                width: "100%",
                                marginBottom: "3%",
                                display: "flex",
                              }}
                              onClick={() => SendDispatch(data)}
                            >
                              Dispatch
                            </Button>
                          </td>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Order Images"}
                            </DialogTitle>
                            <DialogContent>
                              {sdata.map((data) => (
                                <div
                                  style={{
                                    display: "flex",
                                    marginBottom: "5%",
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: "19%",
                                      // height:'90px',
                                      flexDirection: "column",
                                      display: "flex",
                                      textAlign: "center",
                                    }}
                                    // rounded
                                    src={data.image}
                                    alt="dataimage"
                                  />
                                  <div>
                                    <div
                                      style={{ display: "block" }}
                                      id="alert-dialog-description"
                                    >
                                      Product ID: {data.id}
                                    </div>
                                    <div style={{ display: "block" }}>
                                      Name: {data.name}
                                    </div>
                                    <div
                                      style={{ display: "block" }}
                                      id="alert-dialog-description"
                                    >
                                      Spec: {data.spec}
                                    </div>
                                    <div
                                      style={{ display: "block" }}
                                      id="alert-dialog-description"
                                    >
                                      Original Price: {data.rate}
                                    </div>
                                    <div
                                      style={{ display: "block" }}
                                      id="alert-dialog-description"
                                    >

                                      {/* Price: {pdata.total} */}
                                      Discount Price: {data.discountPrice}
                                    </div>
                                    <div
                                      style={{ display: "block" }}
                                      id="alert-dialog-description"
                                    >
                                      Quantity: {data.count}
                                    </div>
                                    {data.color ?

                                      <div
                                        style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}
                                        id="alert-dialog-description"
                                      >
                                        Color:
                                        <div
                                          style={{
                                            backgroundColor: data.color,
                                            padding: '10px',
                                            width: '20px',
                                            marginLeft: '3%',

                                          }}
                                        ></div>
                                      </div> : null
                                    }
                                    {data.size ?
                                      <div
                                        style={{ display: "block" }}
                                        id="alert-dialog-description"
                                      >
                                        Size: {data.size}
                                      </div> : null
                                    }
                                  </div>
                                </div>
                              ))}
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} autoFocus>
                                close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderProcess;
