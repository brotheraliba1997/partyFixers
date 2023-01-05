import React, { useEffect, useState } from "react";
import db from "../config/firebase";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import NumberFormat from 'react-number-format';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



function Dashboard() {
  // console.log('productTotal', productTotal)

  const [product, setProduct] = React.useState([]);


  useEffect(async () => {
    const collectionProduct = collection(db, "product");

    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProduct(data);
    });

    return unsub;
  }, []);


  const [timesale, setTimesale] = React.useState([]);

  useEffect(async () => {
    const collectionProduct = collection(db, "timesale");

    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTimesale(data);

    });

    return unsub;
  }, []);




  const [saleProductTotal, setSaleProductTotal] = useState([])
  const [saleProductTotalDiscount, setSaleProductTotalDiscount] = useState([])
  // const [saleFlashTotal, setSaleFlashTotal] = useState()
  let productTotal = [];
  let productTotalDiscount = [];
  // let flashTotal = [];

  let totalprize = 0
  let totaldisprize = 0

  useEffect(() => {
    product.map((data) => {
      if (data.quantity > 0 && data.discountPrice != 'NaN') {

        productTotal.push(data.rate * data.quantity)
        productTotalDiscount.push(data.discountPrice * data.quantity)
        // console.log('data', total)

        totalprize = totalprize + (parseInt(data.rate) * parseInt(data.quantity))
        totaldisprize = totaldisprize + (parseInt(data.discountPrice) * parseInt(data.quantity))
      }

    })

    setSaleProductTotal(productTotal)
    setSaleProductTotalDiscount(productTotalDiscount)


  }, [product])


  // useEffect(() => {

  //   timesale.map((data) => {

  //     flashTotal.push(data.discountPrice * data.flashQuantity)
  //     // console.log('data', total)
  //     setSaleFlashTotal(flashTotal)
  //   })
  // }, [timesale])


  const [totalStock, setTotalStock] = useState()
  const [totalDiscountStock, setTotalDiscountStock] = useState()

  useEffect(async () => {


    // let sum2;

    if (saleProductTotal.length > 0) {

      let sum1;

      saleProductTotal ?
        sum1 = await saleProductTotal.reduce((a, b) => {
          return a + b;
        }) : null

      setTotalStock(sum1);

    } else {

      setTotalStock(0);

    }

    if (saleProductTotalDiscount.length > 0) {

      let sumDiscount;

      saleProductTotalDiscount ?
        sumDiscount = await saleProductTotalDiscount.reduce((a, b) => {
          return a + b;
        })
        : null

      setTotalDiscountStock(sumDiscount);

    } else {

      setTotalDiscountStock(0);

    }
    // saleFlashTotal ?
    //   sum2 = await saleFlashTotal.reduce((a, b) => {
    //     return a + b;
    //   })
    //   : null


    // setTotalStock(sum1 + sum2);

    // }, [saleProductTotal, saleFlashTotal])
  }, [saleProductTotal, saleProductTotalDiscount])

  // console.log('totalStock', totalStock)



  const [userTotal, setUserTotal] = useState()
  const [usersOnMemTotal, setUsersOnMemTotal] = useState()
  const [usersOnMemberShip, setUsersOnMemberShip] = useState()
  const [membershipPackages, setMembershipPackage] = useState()
  const [packgeData, setPackageData] = useState()


  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen = (data) => {
    const packageDetails = membershipPackages.filter(packageData => packageData.id == data.packageId)
    setPackageData(packageDetails[0])
    setOpen(true);
  };

  useEffect(() => {

    const collectionProduct = collection(db, "users");

    const unsub = onSnapshot(collectionProduct, (snapshot) => {

      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));


      // dispatch(loginUserGet(data));
      let usersData = []
      let usersWithMembership = []
      let totalMembershipsUsers = 0;

      snapshot.docs.map((doc) => {
        usersData.push({ ...doc.data(), id: doc.id })
        if (doc.data().userDetails.AccountType != "Normal") {

          usersWithMembership.push({ ...doc.data(), id: doc.id })

          totalMembershipsUsers++
        }
      });

      setUsersOnMemberShip(usersWithMembership);
      setUsersOnMemTotal(totalMembershipsUsers)
      setUserTotal(usersData);

    });

    return unsub;
  }, []);

  // console.log('userTotal', userTotal)
  useEffect(() => {
    const collectionProduct = collection(db, "Package");
    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // dispatch(loginUserGet(data));
      setMembershipPackage(data);
    });

    return unsub;
  }, []);






  const [salesReport, setSalesReport] = useState([])

  useEffect(() => {
    const collectionProduct = collection(db, "salesReport");
    const q = query(collectionProduct,
      orderBy("orderId", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // dispatch(loginUserGet(data));
      setSalesReport(data);
    });

    return unsub;
  }, []);

  // ...............Daily Sales Report Total...................................................

  const [salesReportDaily, setSalesReportDaily] = useState([])

  useEffect(() => {
    const collectionProduct = collection(db, "salesReport");
    const q = query(collectionProduct,
      where("date", "==", `${new Date().toLocaleDateString()}`),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSalesReportDaily(data);
    });


    return unsub;
  }, []);

  // console.log('salesReport>>>', salesReportDaily)

  const [salesReportDailyTotal, setSaleReportDailyTotal] = useState()


  useEffect(() => {
    let productTotal = [];
    let total = 0;
    salesReportDaily.map(async (data) => {

      productTotal.push(data.total)
      // console.log('data', productTotal)
      // setSaleReportDailyTotal(productTotal)

      // let sum1;
      // let sum2;
      // saleProductTotal ?

      let sum1 = await productTotal.reduce((a, b) => {
        return a + b;
      })
      // : null

      total = sum1

    })


    setSaleReportDailyTotal(total)


  }, [salesReportDaily])

  // console.log('salesReportDailyTotal>>>', salesReportDailyTotal)



  // ...............Weekly Sales Report Total...................................................

  const [salesReportWeekly, setSalesReportWeekly] = useState([])
  var currentDate = new Date();
  // console.log("The current Date=" + currentDate);
  var before7Daysdate = new Date(currentDate.setDate(currentDate.getDate() - 7)).toLocaleDateString();
  // console.log("The One week ago date=" + before7Daysdate);

  useEffect(() => {
    const collectionProduct = collection(db, "salesReport");

    const q = query(collectionProduct,
      where(`date`, '>=', `${before7Daysdate}`),
      where(`date`, '<=', `${new Date().toLocaleDateString()}`),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSalesReportWeekly(data);
    });

    return unsub;
  }, []);

  // console.log('salesReportWeekly>>>', salesReportWeekly)




  const [salesReportWeeklyTotal, setSaleReportWeeklyTotal] = useState()


  useEffect(() => {
    let productTotal = [];
    salesReportWeekly
      .map(async (data) => {

        productTotal.push(data.total)

        let sum1 = await productTotal.reduce((a, b) => {
          return a + b;
        })
        setSaleReportWeeklyTotal(sum1)

      })

  }, [salesReportWeekly])








  // ...............Monthly Sales Report Total...................................................

  const [salesReportMonthly, setSalesReportMonthly] = useState([])


  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var lastDayWithSlashes = (lastDay.getDate()) + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getFullYear();
  // console.log('f', firstDay)
  // console.log('l', lastDayWithSlashes)
  // alert(lastDayWithSlashes);

  useEffect(() => {
    const collectionProduct = collection(db, "salesReport");

    const q = query(collectionProduct,
      where(`date`, '<=', `${lastDay.toLocaleDateString()}`),
      where(`date`, '>=', `${firstDay.toLocaleDateString()}`),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSalesReportMonthly(data);
    });

    return unsub;
  }, []);

  // console.log('salesReportMonthly>>>', salesReportMonthly)




  const [salesReportMonthlyTotal, setSaleReportMonthlyTotal] = useState()


  useEffect(() => {
    let productTotal = [];
    salesReportMonthly
      .map(async (data) => {

        productTotal.push(data.total)
        // console.log('data', productTotal)
        // setSaleReportDailyTotal(productTotal)

        // let sum1;
        // let sum2;
        // saleProductTotal ?
        let sum1 = await productTotal.reduce((a, b) => {
          return a + b;
        })
        // : null
        setSaleReportMonthlyTotal(sum1)

      })

  }, [salesReportMonthly])




  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Users</p>
                      {userTotal ?
                        <Card.Title as="h4">
                          <NumberFormat value={userTotal.length} displayType={'text'} thousandSeparator={true} />
                        </Card.Title> : null
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Users On Membership</p>
                      {usersOnMemTotal >= 0 ?
                        <Card.Title as="h4">
                          <NumberFormat value={usersOnMemTotal} displayType={'text'} thousandSeparator={true} />
                        </Card.Title> : null
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>


          {/* <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          {/* <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Stock Amount</p>
                      {totalStock &&
                        <Card.Title as="h4" style={{ fontSize: 12 }}>
                          <NumberFormat value={totalStock.toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
                        </Card.Title>
                      }
                    </div>
                    <div className="numbers">
                      <p className="card-category">Discounted Amount</p>
                      {totalDiscountStock &&
                        <Card.Title as="h4" style={{ fontSize: 12 }}>
                          <NumberFormat value={totalDiscountStock.toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
                        </Card.Title>
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>

            </Card>
          </Col> */}
          {/* <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          {/* <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Users</p>
                      {userTotal ?
                        <Card.Title as="h4">
                          <NumberFormat value={userTotal.length} displayType={'text'} thousandSeparator={true} />
                        </Card.Title> : null
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              
            </Card>
          </Col> */}
          {/* <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-app"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Products</p>
                      {product ?
                        <Card.Title as="h4">
                          
                          <NumberFormat value={product.length} displayType={'text'} thousandSeparator={true} />
                        </Card.Title> : null
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              
            </Card>
          </Col> */}
        </Row>
        <Row>
          {/* <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-preferences-circle-rotate text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Daily Sales</p>
                      {salesReportDailyTotal &&
                        <Card.Title as="h4" style={{ fontSize: 12 }}>
                          <NumberFormat value={salesReportDailyTotal.toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
                        </Card.Title>
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              
            </Card>
          </Col> */}
          {/* <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-preferences-circle-rotate text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Weekly Sales</p>
                      {salesReportWeeklyTotal ?
                        <Card.Title as="h4" style={{ fontSize: 12 }}>
                          
                          <NumberFormat value={salesReportWeeklyTotal.toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
                        </Card.Title> : null
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              
            </Card>
          </Col> */}
          {/* <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-preferences-circle-rotate text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Monthly Sales</p>
                      {salesReportMonthlyTotal ?
                        <Card.Title as="h4" style={{ fontSize: 12 }}>
                          <NumberFormat value={salesReportMonthlyTotal.toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
                        </Card.Title> : null
                      }
                    </div>
                  </Col>
                </Row>
              </Card.Body>
             
            </Card>
          </Col> */}
        </Row>
        <Row>
          {/* <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users List</Card.Title>
                <p className="card-category">Last Performance</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">

                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">User Name</th>
                      <th className="border-0">User Email</th>
                      <th className="border-0">User Number</th>
                      <th className="border-0">Gender</th>
                    </tr>
                  </thead>
                  {userTotal ?
                    <tbody>
                      {userTotal?.map((data, i) => (
                        <>
                          <tr
                            key={i}
                          >
                            <>
                              <td>
                                {data.userDetails.FirstName}
                              </td>
                              <td>{data.userDetails.Email}</td>
                              <td>{data.userDetails.ContactNumber}</td>
                              <td>{data.userDetails.Gender}</td>
                            </>
                          </tr>
                        </>
                      ))}
                    </tbody>
                    : null
                  }
                </Table>

                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  In the last hour
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Customers On Membership (SALES)</Card.Title>
                <p className="card-category">Last Update</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">

                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">UserId</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Time</th>
                      <th className="border-0">Customer Name</th>
                      <th className="border-0">Customer Email</th>
                      <th className="border-0">Customer Number</th>
                      <th className="border-0">Membership Type</th>
                    </tr>
                  </thead>


                  {usersOnMemberShip ?
                    <tbody>
                      {usersOnMemberShip?.map((data, i) => (
                        <>
                          <tr
                            key={i}
                          >
                            <>
                              <td>
                                {i}
                              </td>
                              <td>
                                {data?.id}
                              </td>
                              {/* <td>{new Date(data?.userDetails.createdAt.seconds * 1000).toDateString()}</td>
                              <td>{new Date(data?.userDetails.createdAt.seconds * 1000).toTimeString()}</td> */}
                              <td>{data?.userDetails.FirstName}</td>
                              <td>{data?.userDetails.Email}</td>
                              <td>{data?.userDetails.ContactNumber}</td>
                              <td>{data?.userDetails.AccountType}{" "}{data?.userDetails.AccountType != "Normal" ?
                                <VisibilityIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleClickOpen(data?.userDetails)}
                                /> : null}
                              </td>

                            </>
                          </tr>
                        </>
                      ))}
                    </tbody>
                    : null
                  }
                </Table>

                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  In the last hour
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            {/* <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card> */}
          </Col>
          <Col md="4">
            {/* <Card>
              <Card.Header>
                <Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Bounce <i className="fas fa-circle text-warning"></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {/* <Card>
              <Card.Header>
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542,
                          443,
                          320,
                          780,
                          553,
                          453,
                          326,
                          434,
                          568,
                          610,
                          756,
                          895,
                        ],
                        [
                          412,
                          243,
                          280,
                          580,
                          453,
                          353,
                          300,
                          364,
                          368,
                          410,
                          636,
                          695,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card> */}
          </Col>
          <Col md="6">
            {/* <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-160575228">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                disabled
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-938342127">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card> */}
          </Col>
        </Row>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Membership Package Details"}
        </DialogTitle>
        <DialogContent>

          <div
            style={{
              display: "flex",
              marginBottom: "5%",

            }}
          >
            <div
              style={{
                // backgroundColor: "red",

                width: '100%'
              }}
            >


              <div style={{ paddingLeft: "30px" }}>
                <div style={{ display: "block", paddingBottom: "2px" }}>
                  Category Id: {packgeData?.id}
                </div>

                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >
                  Category Name: {packgeData?.otherCategory ? packgeData?.otherCategory : "Not Mentioned"}

                </div>


                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >


                  Package Name: {packgeData?.name ? packgeData?.name : "Not Mentioned"}

                </div>
                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >
                  Price: {packgeData?.rate ? packgeData?.rate : "Not Mentioned"}

                </div>
                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >

                  Discount Price: {packgeData?.discountPrice ? packgeData?.discountPrice : "Not Mentioned"}

                </div>
                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >

                  Discount Percentage: {packgeData?.discountPercentage ? packgeData?.discountPercentage : "Not Mentioned"}

                </div>
                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >
                  Description:
                  {packgeData?.description ? (<div contentEditable='true' dangerouslySetInnerHTML={{ __html: packgeData?.description }}></div>) : "Not Mentioned"}

                </div>

                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >
                  Number Of Cards: {packgeData?.numberOfCards ? packgeData?.numberOfCards : "Not Mentioned"}

                </div>
                <div
                  style={{ display: "block", paddingBottom: "2px" }}
                  id="alert-dialog-description"
                >

                  Number Of Chats: {packgeData?.numberOfChats ? packgeData?.numberOfChats : "Not Mentioned"}

                </div>


              </div>
            </div>
          </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default Dashboard;
