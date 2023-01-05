import React, { useEffect, useState } from "react";
// import db from "../config/firebase";
// import db from '../../config/firebase'

import db from "../../config/firebase"
import "../../assets/css/style.css"


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


// Table 

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
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "react-bootstrap/FormControl"
// import Form from "react-bootstrap/Form"





function CategoryList() {
  const [product, setProduct] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [lastDocB, setLastDocB] = useState([]);
  const [isEmptyB, setIsEmptyB] = useState(false)
  const [isLoadB, setIsPLoadB] = useState(false)


  useEffect(async () => {
    const collectionProduct = collection(db, "MainCategory");
    const q = query(collectionProduct,
      // orderBy("subcat", "asc"),
      limit(20)
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
    const collectionRef = collection(db, "MainCategory");
    const q = query(collectionRef,
      startAfter(lastDocB),
      limit(10)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {

        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocB = snapshot.docs[snapshot.docs.length - 1];
        setProduct(product => [...product, ...data]);
        setLastDocB(lastDocB);
      } else {
        setIsEmptyB(true);
      }
      setIsPLoadB(false)
    });

    return unsub;

  }




  const del = async (e, id) => {
    let answer = confirm("Are You Sure You Want To Delete This Item!?");
    if (answer == false) {
      e.preventDefault()
    } else {
      await deleteDoc(doc(db, "MainCategory", id));
    }
  }






  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  const history = useHistory()
  const editData = (data) => {
    history.push({
      pathname: "/editCategory",
      state: {
        detail: data,
      },
    });

  }



  return (
    <>
      <div>

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

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">

              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>

                    <tr>
                      <th className="border-0">Category Name</th>
                      <th className="border-0">Category Description</th>
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
                            <td>
                              {data.category}
                            </td>
                            <td>{data.description}</td>

                            <td >
                              <div style={{ display: "flex", flexDirection: 'row' }}>

                                <Edit
                                  sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                                  onClick={() =>
                                    editData(data)
                                  } />
                                <DeleteIcon sx={{ height: "25px", width: "25px", cursor: "pointer" }} onClick={(e) => del(e, data.id)} />
                              </div>
                            </td>


                          </>

                        </tr>

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

            <Stack
              style={{ margin: '3% 5%' }}
            >
              <Button
                className="btnLog-2" onClick={fetchMoreB}>
                Load More
              </Button>
            </Stack>
          }
        </div>
      </Container>





    </>
  );
}

export default CategoryList;
