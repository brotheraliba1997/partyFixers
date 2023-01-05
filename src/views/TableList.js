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
} from "react-bootstrap";
import db from "../config/firebase";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TableList = () => {



  // const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   const collectionProduct = collection(db, "userData");

  //   const unsub = onSnapshot(collectionProduct, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     // dispatch(loginUserGet(data));
  //     setUserData(data)
  //   });

  //   return unsub;
  // }, []);

  // console.log('userData', userData.map(data => data.id))

  const [ndata, setData] = useState([]);

  React.useEffect(() => {

    // for (var i = 0; i < userData.length; i++) {

    // const collectionProduct = collection(db, "Order", `${userData[i].id}/${userData[i].id}`);
    // const collectionProduct = collection(db, "Order", `${userData.map(data => data.id)}/${userData.map(data => data.id)}`);

    // const collectionProduct = collection(db, "Order", `${userData.map(data => data.id)}`, `${userData.map(data => data.id)}`);
    const collectionProduct = collection(db, "Order");

    const q = query(collectionProduct,
      orderBy("orderId", "desc")
    );
    // orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      console.log(data);
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








  // console.log('ndata', ndata)
  const [open, setOpen] = React.useState(false);

  const [sdata, setSdata] = useState([]);
  const [pdata, setPdata] = useState(null);

  const handleClickOpen = (data) => {
    setOpen(true);
    // setSdata(data);
    // setSdata(data.detail.map(data=>data));
    setSdata(data.detail);
    // setPdata(data)

    // setPdata(order);
    // console.log(detail.map((data) => data));
    // console.log("roder", order);
    // console.log('detail', data.detail)
    // return(

    // )
    // console.log("eye", data)
    // setSdata(data)
  };

  // console.log('pdata', pdata)
  // console.log('sdata', sdata)

  const handleClose = () => {
    setOpen(false);
  };

  const SendData = async (data) => {



    for (var i = 0; i < data.detail.length; i++) {
      //   // let fDataValue;
      //   // data.order.detail.map(ele => { fDataValue = ele.product.flashQuantity })
      // let fDataValue = [];
      // await data.detail.map(ele => { fDataValue.push(ele) })


      // if (fDataValue[i].product.flashQuantity) {
      // if (fDataValue) {

      //   const docRef = doc(db, "timesale", `${data.detail.map(ele => { return ele.product.id })}`);
      //   // const batch = writeBatch(db);
      //   await updateDoc(docRef, {
      //     // batch.update(docRef, {
      //     flashQuantity: increment(`${data.detail.map(ele => { return ele.count })}`),
      //   });
      //   // await batch.commit();

      //   addDoc(collection(db, 'OrderCncel'), {
      //     ProcessOrder: data
      //   }).then(
      //     deleteDoc(doc(db, "Order", data.id))
      //   )
      //   // console.log("flash")
      // }
      // else
      // // if (data.order.detail.map(ele => { return ele.product.quantity }))
      // {
      const docRef = doc(db, "product", `${data.detail[i].id}`);
      // const batch = writeBatch(db);
      await updateDoc(docRef, {
        // batch.update(docRef, {
        quantity: increment(`${-data.detail[i].count}`),
      });
      // await batch.commit();
    }
    // console.log(data.id)
    await addDoc(collection(db, 'OrderProcess'), {
      ...data,
    }).then(
      await deleteDoc(doc(db, "Order", data.id))
    )
  };


  // const [flashQuantity, setFlashQuantity] = useState(0)
  // const [fData, setFData] = useState(0)

  // useEffect(() => {
  //   setFlashQuantity(fData)
  //   // return () => setFlashQuantity(0)
  //   // await fData.order.detail.map(ele => { return setFlashQuantity(ele.product.flashQuantity) })
  //   // console.log('fData', fData)
  //   // ndata.map(data => data.order.detail.map(ele => { return setFlashQuantity(ele.product.flashQuantity) }))
  // }, [fData])

  // console.log('flashQuantity', flashQuantity)
  // console.log('fData', fData)

  // const handleCancel = async (data) => {
  //   // if (
  //   //   data.order.detail.map(ele => { return ele.product.flashQuantity })
  //   //   //  ?
  //   // ) {
  //   data.order.detail.map(ele => { return setFData(ele.product.flashQuantity) })
  //   // : null
  //   // }
  //   await deleteData(data)
  // }

  const deleteData = async (data) => {
    // data.order.detail.map(ele => { return setFData(ele.product.flashQuantity) })
    // console.log("dataIDIDIDIDI", data.order.detail.map(ele => { return ele.product }))
    // let condition = data.order.detail.map(ele => { return ele.product.flashQuantity });
    for (var i = 0; i < data.detail.length; i++) {
      //   // let fDataValue;
      //   // data.order.detail.map(ele => { fDataValue = ele.product.flashQuantity })
      // let fDataValue = [];
      // await data.detail.map(ele => { fDataValue.push(ele) })


      // if (fDataValue[i].product.flashQuantity) {
      // if (fDataValue) {

      //   const docRef = doc(db, "timesale", `${data.detail.map(ele => { return ele.product.id })}`);
      //   // const batch = writeBatch(db);
      //   await updateDoc(docRef, {
      //     // batch.update(docRef, {
      //     flashQuantity: increment(`${data.detail.map(ele => { return ele.count })}`),
      //   });
      //   // await batch.commit();

      //   addDoc(collection(db, 'OrderCncel'), {
      //     ProcessOrder: data
      //   }).then(
      //     deleteDoc(doc(db, "Order", data.id))
      //   )
      //   // console.log("flash")
      // }
      // else
      // // if (data.order.detail.map(ele => { return ele.product.quantity }))
      // {
      const docRef = doc(db, "product", `${data.detail[i].product.id}`);
      // const batch = writeBatch(db);
      await updateDoc(docRef, {
        // batch.update(docRef, {
        quantity: increment(`${data.detail[i].count}`),
      });
      // await batch.commit();
    }
    addDoc(collection(db, 'OrderCancel'), {
      ...data,
    }).then(
      deleteDoc(doc(db, "Order", data.id))
    )
    // console.log("product")
    // }
    // else {
    //   // addDoc(collection(db, 'OrderCncel'), {
    //   //   ProcessOrder: data
    //   // }).then(
    //   //   deleteDoc(doc(db, "Order", data.id))
    //   // )
    //   console.log("delete")
    // }


    // }


    // console.log("data", data)
    // // const cityRef = doc(db, 'cities', 'BJ');

    // addDoc(collection(db, 'OrderCncel'), {
    //   ProcessOrder: data
    // }).then(
    //   deleteDoc(doc(db, "Order", data.id))


    // )

  }

  // const delOrder = async (data) => {
  //   console.log("data", data)
  //   // pdata
  //   if (data.detail.product.flashQuantity) {
  //     const docRef = doc(db, "timesale", `${data.detail.product.id}`);
  //     // const batch = writeBatch(db);
  //     await updateDoc(docRef, {
  //       // batch.update(docRef, {
  //       flashQuantity: increment(`${data.detail.count}`),
  //     });
  //   }
  //   else {
  //     const docRef = doc(db, "product", `${data.detail.product.id}`);
  //     // const batch = writeBatch(db);
  //     await updateDoc(docRef, {
  //       // batch.update(docRef, {
  //       quantity: increment(`${data.detail.count}`),
  //     });
  //   }

  //   deleteDoc(doc(db, "Order", `${userData.map(data => data.id)}`, `${userData.map(data => data.id)}`, `${data.id}`))
  //   // await updateDoc(doc(db, "Order", `${userData.map(data => data.id)}`, `${userData.map(data => data.id)}`, `${pdata.orderId}`), {
  //   //   detail: deleteField()
  //   // });
  // }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
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
                      {/* <th /> */}
                      {/* <th className="border-0">User Email</th> */}
                      <th />
                      <th className="border-0">Product Name</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">City</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Phone / Email</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {ndata.map((data, index) => (
                      <tr
                        key={index}
                      >
                        {/* {ndata.length ? */}
                        <>
                          <td >{index}</td>
                          {data.orderId ?
                            <td>{data.orderId}</td> : <td>Not Mention</td>
                          }
                          {data.date ?
                            <td>{data.date}</td> : <td>Not Mention</td>
                          }
                          <td>{data.address.fullName}</td>
                          {/* <td>{data.order.user.email}</td> */}
                          <td>
                            <VisibilityIcon
                              onClick={() => handleClickOpen(data)}
                            />
                          </td>
                          <td>
                            {data.detail.map((item) => (
                              <div style={{ fontSize: "12px", width: "auto" }}>
                                {item.name}
                              </div>
                            ))}
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
                              onClick={() => SendData(data)}
                            >
                              Accept
                            </Button>
                            <Button style={{ width: "100%" }} onClick={() =>
                              deleteData(data)
                              // handleCancel(data)

                            } variant="danger">
                              Cancel
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
                                // {/* {sdata ? */}
                                <div
                                  style={{
                                    display: "flex",
                                    marginBottom: "5%",
                                    // width: '100%'
                                    // border: '1px solid'
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: "25%",
                                      // height:'90px',
                                      flexDirection: "column",
                                      display: "flex",
                                      textAlign: "center",
                                    }}
                                    // rounded
                                    // src={sdata.detail.map(ele=>{ele.product.image})}
                                    src={data.image}
                                    alt="dataimage"
                                  />
                                  <div
                                    style={{
                                      // border: '1px solid red', 
                                      width: '100%'
                                    }}
                                  >
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

                                      {/* Price: {pdata.total} */}
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

                                    {/* <Button style={{ width: "25%" }} onClick={() =>
                                      delOrder(data)
                                      // handleCancel(data)

                                    } variant="danger">
                                      Delete
                                    </Button> */}
                                  </div>
                                </div>
                                //   {/* :
                                //   null
                                // } */}
                              ))}
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} autoFocus>
                                close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                        {/* : null} */}
                      </tr>
                    ))}
                    {/* <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr> */}
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

export default TableList;
