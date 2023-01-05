import React, { useEffect, useState } from "react";
import db from "../config/firebase";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  // onSnapshot,
  // collection,

  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import {
  Button,
  Card,
  Form,
} from "react-bootstrap";
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from '@mui/icons-material/Delete';
import NumberFormat from 'react-number-format';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import "../assets/css/style.css";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router";

import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";


import {
  Badge,
  // Button,
  // Card,
  // Navbar,
  // Nav,
  Table,
  Container,
  Row,
  Col,
  // Image,
} from "react-bootstrap";
// import db from "../config/firebase";
// import {
//   // onSnapshot,
//   // collection,
//   // updateDoc,
//   // doc,
//   // deleteDoc,
//   addDoc,
// } from "@firebase/firestore";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import Edit from "@mui/icons-material/Edit";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "react-bootstrap/FormControl"
// import Form from "react-bootstrap/Form"

import Switch from '@mui/material/Switch';



function PackageList({ setProductTotal }) {



  const [checkedShow, setCheckedShow] = useState(false)

  const handleChangeCheckedShow = (e) => {
    setCheckedShow(e.target.checked);
  };

  const [product, setProduct] = React.useState([]);
  // const [category, setCategory] = React.useState("");
  // const [name, setName] = React.useState("");
  // const [image, setImage] = React.useState("");
  // const [spec, setSpec] = React.useState("");
  // const [rate, setRate] = React.useState("");
  // const [description, setDescription] = React.useState("");
  // const [page, setPage] = React.useState("");
  // const [subcat, setSubCat] = React.useState("");
  // const [subcat1, setSubCat1] = React.useState("");
  // const [quantity, setQuantity] = React.useState("");
  const [search, setSearch] = React.useState('');
  // const [uid, setUid] = React.useState();
  // const [openImage, setOpenImage] = React.useState(false);
  // const [openName, setOpenName] = React.useState(false);
  // const [openSpec, setOpenSpec] = React.useState(false);
  // const [openRate, setOpenRate] = React.useState(false);
  // const [openPage, setOpenPage] = React.useState(false);
  // const [openSubcat, setOpenSubcat] = React.useState(false);
  // const [openSubcat1, setOpenSubcat1] = React.useState(false);
  // const [openDes, setOpenDes] = React.useState(false);
  // const [openQuantity, setOpenQuantity] = React.useState(false);

  // const handleClose = () => {
  //   setOpenImage(false);
  //   setOpenName(false);
  //   setOpenSpec(false);
  //   setOpenRate(false);
  //   setOpenPage(false);
  //   setOpenSubcat(false);
  //   setOpenSubcat1(false);
  //   setOpenDes(false);
  //   setOpenQuantity(false);
  // };

  const [lastDocB, setLastDocB] = useState([]);

  const [isEmptyB, setIsEmptyB] = useState(false)
  const [isLoadB, setIsPLoadB] = useState(false)

  useEffect(async () => {
    const collectionProduct = collection(db, "Package");
    const q = query(collectionProduct,
      // where("quantity", '>', 0),
      // orderBy("quantity"),
      limit(50)
    );


    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastDocB = snapshot.docs[snapshot.docs.length - 1];
      setProduct(data);
      setLastDocB(lastDocB);
    });

    return unsub;
  }, []);


  const fetchMoreB = () => {
    setIsPLoadB(true)
    // useEffect(async () => {
    const collectionRef = collection(db, "Package");
    const q = query(collectionRef,
      // orderBy("subcat", "asc"),
      startAfter(lastDocB),
      limit(25)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {

        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocB = snapshot.docs[snapshot.docs.length - 1];
        setProduct(product => [...product, ...data]);
        // dispatch(bestData([...bestD, ...data]))
        // setIsLoad(false)
        setLastDocB(lastDocB);
      } else {
        setIsEmptyB(true);
      }
      setIsPLoadB(false)
    });

    return unsub;
    // }, []);


  }




  const del = async (e, id) => {
    let answer = confirm("Are You Sure You Want To Delete This Item!?");
    if (answer == false) {
      e.preventDefault()
    } else {
      await deleteDoc(doc(db, "Package", id));
    }
  }

  // const udpateName = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { name };
  //   updateDoc(docRef, payload);
  //   setOpenName(false);
  // };
  // const updateImage = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { image };
  //   updateDoc(docRef, payload);
  //   setOpenImage(false);
  // };
  // const updateSpec = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { spec };
  //   updateDoc(docRef, payload);
  //   setOpenSpec(false);
  // };
  // const updateRate = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { rate };
  //   updateDoc(docRef, payload);
  //   setOpenRate(false);
  // };
  // const updatePage = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { page };
  //   updateDoc(docRef, payload);
  //   setOpenPage(false);
  // };
  // const updateSubCat = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { subcat };
  //   updateDoc(docRef, payload);
  //   setOpenSubcat(false);
  // };
  // const updatesubCat1 = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { subcat1 };
  //   updateDoc(docRef, payload);
  //   setOpenSubcat1(false);
  // };
  // const updateDes = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { description };
  //   updateDoc(docRef, payload);
  //   setOpenDes(false);
  // };
  // const updateQuantity = async () => {
  //   const docRef = doc(db, "product", uid);
  //   const payload = { quantity };
  //   updateDoc(docRef, payload);
  //   setOpenQuantity(false);
  //   console.log("pro..>>", quantity)
  // };


  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   marginBottom: '5% ',
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: '12ch',
  //       '&:focus': {
  //         width: '20ch',
  //       },
  //     },
  //   },
  // }));
  // console.log('searcg>>', search)





  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };








  // Table


  // const [ndata, setData] = React.useState([]);
  // React.useEffect(() => {
  //   const collectionProduct = collection(db, "product");
  //   const unsub = onSnapshot(collectionProduct, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setData(data);
  //   });
  //   return unsub;
  // }, []);
  // const [show, setShow] = React.useState(false);

  // const [sdata, setSdata] = React.useState([]);

  // const handleClickOpen = (detail) => {
  //   setOpen(true);
  //   setSdata(detail.map((data) => data));
  //   console.log(detail.map((data) => data));
  //   // console.log('afsfs',detail)
  //   // return(

  //   // )
  // };

  // const handleCloseTable = () => {
  //   setOpen(false);
  // };

  // const SendData = (data) => {
  //   // console.log(data.id)
  //   addDoc(collection(db, 'OrderProcess'), {
  //     ProcessOrder: data
  //   }).then(
  //     deleteDoc(doc(db, "Order", data.id))
  //   )
  // };
  // const deleteData = (data) => {
  //   // console.log(data.id)
  //   addDoc(collection(db, 'OrderCncel'), {
  //     ProcessOrder: data
  //   }).then(
  //     deleteDoc(doc(db, "Order", data.id))
  //   )
  // };
  const history = useHistory()
  const editData = (data) => {
    history.push({
      pathname: "/editpackage",
      state: {
        detail: data,
      },
    });
  }

  const [saleTotal, setSaleTotal] = useState()
  let total = [];

  useEffect(() => {
    product.map((data) => {

      total.push(data.rate * data.quantity)
      // console.log('data', total)
      setSaleTotal(total)
    })
  }, [product])
  // console.log('data1', total)

  // useEffect(async () => {

  //   saleTotal ?
  //     setProductTotal(saleTotal)
  //     // await setProductTotal(saleTotal.reduce((a, b) => {
  //     //   return a + b;
  //     // })) 
  //     : null
  // }, [product])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2%' }}>
        {saleTotal ?
          <p>
            {/* Available Stock Total Amout : */}

            <NumberFormat value={saleTotal.reduce((a, b) => {
              return a + b;
            }).toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
          </p> : null
        }
      </div>
      <div>
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search> */}
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
      </div>
      {/* <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Table View" value="2" />
            </TabList>
          </Box> */}
      {/* <TabPanel value="1">
            <div className="map-container">
              <div className="main">
                {product.filter(data => {
                  if (search === '') {
                    return data
                  } else if (data.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                    return data
                  }
                }).map((data, i) => (
                  <Card key={i} style={{ width: "20rem", margin: "10px" }}>
                    <Card.Img
                      variant="top"
                      style={{ height: "20%" }}
                      src={data.image}
                    />
                    <IconButton aria-label="edit" onClick={() => {
                      setOpenImage(true), setUid(data.id)
                    }}>
                      <Edit />
                    </IconButton>

                    <Card.Body>
                      <Card.Title style={{ color: "rgb(68, 190, 238)" }}>
                        {data.name}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenName(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Title>
                      <Card.Text>
                        Rs: {data.rate}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenRate(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>
                      <Card.Text>
                        Model:{data.spec}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenSpec(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>
                      <Card.Text>Category: {data.category}</Card.Text>
                      <Card.Text>
                        Page: {data.page}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenPage(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>
                      <Card.Text>
                        Quantity: {data.quantity}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenQuantity(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>
                      <Card.Text>
                        Page: {data.subcat}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenSubcat(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>
                      <Card.Text>
                        Page: {data.subcat1}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenSubcat1(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>
                      <Card.Text>
                        Description: {data.description}{" "}
                        <IconButton
                          aria-label="edit"
                          onClick={() => { setOpenDes(true), setUid(data.id) }}
                        >
                          <Edit />
                        </IconButton>
                      </Card.Text>

                      <Button variant="danger" onClick={() => del(data.id)}>
                        Delete
                      </Button>
                    </Card.Body>
                    <Dialog open={openImage} onClose={handleClose}>
                      <DialogTitle>Update Image</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Image URL"
                          fullWidth
                          variant="standard"
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateImage}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openName} onClose={handleClose}>
                      <DialogTitle>Update Name</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Enter Name"
                          fullWidth
                          variant="standard"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={udpateName}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openRate} onClose={handleClose}>
                      <DialogTitle>Update Rate</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Enter Update Rate"
                          fullWidth
                          variant="standard"
                          onChange={(e) => setRate(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateRate}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openQuantity} onClose={handleClose}>
                      <DialogTitle>Update Quantity</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Enter Update Quantity"
                          fullWidth
                          variant="standard"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateQuantity}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openSpec} onClose={handleClose}>
                      <DialogTitle>Update Model/Spec</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Enter Update Rate"
                          
                          fullWidth
                          variant="standard"
                          onChange={(e) => setSpec(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateSpec}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openPage} onClose={handleClose}>
                      <DialogTitle>Update Sub Category</DialogTitle>
                      <DialogContent>
                        <Form.Group>
                          <Form.Control as="select" onChange={(e) => setPage(e.target.value)} value={page}>
                            <option value=''>Sub Category</option>
                            <option value="FlashSale">Flash Sale</option>
                            <option value="BestSaleItem">Best Sale Item</option>
                            <option value="NewArrival">New Arrival</option>
                          </Form.Control>
                        </Form.Group>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updatePage}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openSubcat} onClose={handleClose}>
                      <DialogTitle>Update Sub Category</DialogTitle>
                      <DialogContent>
                        <Form.Group>
                          <Form.Control as="select" onChange={(e) => setSubCat(e.target.value)} value={subcat}>
                            <option value=''>Sub Category</option>
                            <option value="FlashSale">Flash Sale</option>
                            <option value="BestSaleItem">Best Sale Item</option>
                            <option value="NewArrival">New Arrival</option>
                          </Form.Control>
                        </Form.Group>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateSubCat}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openSubcat1} onClose={handleClose}>
                      <DialogTitle>Update Sub Category</DialogTitle>
                      <DialogContent>
                        <Form.Group>
                          <Form.Control as="select" onChange={(e) => setSubCat1(e.target.value)} value={subcat1}>
                            <option value=''>Sub Category</option>
                            <option value="FlashSale">Flash Sale</option>
                            <option value="BestSaleItem">Best Sale Item</option>
                            <option value="NewArrival">New Arrival</option>
                          </Form.Control>
                        </Form.Group>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updatesubCat1}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={openDes} onClose={handleClose}>
                      <DialogTitle>Update Sub Description</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Enter Update Description"
                          fullWidth
                          variant="standard"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateDes}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                ))}
              </div>
            </div>
          </TabPanel> */}
      {/* <TabPanel value="2"> */}
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              {/* <Card.Header>
                      <Card.Title as="h4">Order Table</Card.Title>
                    </Card.Header> */}
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>

                    <tr>
                      <th className="border-0">ID</th>
                      {/* <th className="border-0">Product Image</th> */}

                      <th className="border-0">Package Name</th>
                      <th className="border-0">Package Category</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Discount Price</th>
                      <th className="border-0">Cards Quantity</th>
                      <th className="border-0">Chats Quantity</th>

                      {/* <th className="border-0">Model</th> */}
                      {/* <th className="border-0">Model</th>
                            <th className="border-0">Category</th>
                            <th className="border-0">Description</th> */}

                    </tr>
                  </thead>
                  <tbody>
                    {product.filter(data => {
                      if (search === '') {
                        return data
                      } else if (data.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                        return data
                      }
                    }).map((data, i) => (
                      <>
                        <tr key={i}>
                          <>
                            <td>{data.id}</td>
                            {/* <td style={{ width: '0px' }}>
                                                            <img width="100%" alt={data.image} src={data.image} />
                                                        </td> */}

                            <td>
                              {data.name}
                            </td>
                            <td>
                              {data.otherCategory != "" ? data.otherCategory : 'NOT MENTIONED'}
                            </td>
                            <td>
                              Rs: {data.discountPrice != "" ? data.discountPrice : 'NOT MENTIONED'}
                            </td>
                            <td>Rs: {data.rate}</td>
                            <td>{data.numberOfCards}</td>
                            <td>{data.numberOfChats}</td>

                            {/* <td>{data.spec}</td> */}
                            {/* <td>{data.order.address.address}</td> */}
                            {/* <td>{data.order.address.phone}</td> */}
                            <td >
                              {/* <Button
                                      style={{
                                        width: "100%",
                                        marginBottom: "3%",
                                        display: "flex",
                                      }}
                                    // onClick={() => setShow(!show)}
                                    >
                                      View
                                    </Button> */}
                              {/* <Button style={{ width: "100%", color: 'black', borderColor: 'black', marginBottom: '2px' }}
                                      onClick={() => history.push('/editproduct')}
                                    // variant="danger"
                                    > */}
                              <div style={{ display: "flex", flexDirection: 'row' }}>

                                <Edit
                                  sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                                  onClick={() =>
                                    editData(data)
                                    // history.push('/editproduct')
                                  } />
                                {/* </Button> */}
                                {/* <Button style={{ width: "100%" }} onClick={() => del(data.id)} variant="danger">
                                      Delete
                                    </Button> */}
                                <DeleteIcon sx={{ height: "25px", width: "25px", cursor: "pointer" }} onClick={(e) => del(e, data.id)} />
                                {/* <Switch
                                  checked={checkedShow}
                                  onChange={(e) => handleChangeCheckedShow(e, data)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                /> */}
                              </div>
                            </td>
                            {/* <Dialog
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
                                          src={data.data.image}
                                          alt="dataimage"
                                        />
                                        <div>
                                          <div style={{ display: "block" }}>
                                            Name: {data.data.name}
                                          </div>
                                          <div
                                            style={{ display: "block" }}
                                            id="alert-dialog-description"
                                          >
                                            Spec: {data.data.spec}
                                          </div>
                                          <div
                                            style={{ display: "block" }}
                                            id="alert-dialog-description"
                                          >
                                            Price: {data.data.rate}
                                          </div>
                                          <div
                                            style={{ display: "block" }}
                                            id="alert-dialog-description"
                                          >
                                            Quantity: {data.count}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose} autoFocus>
                                      close
                                    </Button>
                                  </DialogActions>
                                </Dialog> */}

                          </>

                        </tr>

                        {/* <tr> */}

                        {/* </tr> */}
                      </>
                    ))}
                  </tbody>

                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div>
          {isLoadB &&

            <div style={{ textAlign: 'center !important', marginLeft: '50%', marginTop: '3%' }}>

              <CircularProgress style={{ margin: '3% 3%' }} disableShrink />
            </div>


          }
          {!isEmptyB && !isLoadB &&
            // <button
            //   style={{ textAlign: 'center !important', marginLeft: '50%' }}
            //   onClick={fetchMoreB}>
            //   More
            // </button>
            <Stack
              // spacing={2}
              // direction="row"
              style={{ margin: '3% 5%' }}
            >
              <Button
                // variant="contained" 
                className="btnLog-2" onClick={fetchMoreB}>
                Load More
              </Button>
            </Stack>
          }
        </div>
      </Container>
      {/* </TabPanel>
        </TabContext>
      </Box> */}




    </>
  );
}

export default PackageList;
