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
    setDoc,
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

import VisibilityIcon from "@mui/icons-material/Visibility";

import FormControl from "react-bootstrap/FormControl"
// import Form from "react-bootstrap/Form"

import Switch from '@mui/material/Switch';
import PublishIcon from '@mui/icons-material/Publish';


function DraftList({ setProductTotal }) {



    const [checkedShow, setCheckedShow] = useState(false)

    const handleChangeCheckedShow = (e) => {
        setCheckedShow(e.target.checked);
    };

    const [product, setProduct] = React.useState([]);

    const [search, setSearch] = React.useState('');


    const [lastDocB, setLastDocB] = useState([]);

    const [isEmptyB, setIsEmptyB] = useState(false)
    const [isLoadB, setIsPLoadB] = useState(false)

    useEffect(async () => {
        const collectionProduct = collection(db, "draft");
        const q = query(collectionProduct,
            // orderBy("subcat", "asc"),
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
        const collectionRef = collection(db, "draft");
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
        let answer = confirm("Are You Sure !!!! You Want To Delete This Item ....!!!!!!");
        if (answer == false) {
            // await deleteDoc(doc(db, "product", id));
            e.preventDefault()
        } else {
            await deleteDoc(doc(db, "draft", id));
        }
    }



    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };








    const history = useHistory()
    const editData = (data) => {
        history.push({
            pathname: "/editproduct",
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





    const publish = async (data) => {
        await setDoc(doc(db, "product", data.id), {
            ...data,
        })
            .then(deleteDoc(doc(db, "draft", data.id)));
    }

    const publishAll = async () => {
        for (var i = 0; i < product.length; i++) {

            await setDoc(doc(db, "product", product[i].id), {
                ...product[i],
            })
                .then(deleteDoc(doc(db, "draft", product[i].id)));
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '2%' }}>
                {saleTotal ?
                    <p>
                        Available Stock Total Amout :
                        {/* {saleTotal.reduce((a, b) => {
              return a + b;
            }).toFixed()} */}
                        <NumberFormat value={saleTotal.reduce((a, b) => {
                            return a + b;
                        }).toFixed()} displayType={'text'} thousandSeparator={true} prefix={'Rs: '} />
                    </p> : null
                }
            </div>
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
                {product.length ?
                    <div style={{ textAlign: 'end', marginTop: '2%' }}>
                        <PublishIcon sx={{ height: "45px", width: "45px", cursor: "pointer" }} onClick={() => publishAll()} />
                    </div>
                    :
                    null
                }
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
                                            <th className="border-0">Product Image</th>

                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Price</th>
                                            <th className="border-0">Quantity</th>
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
                                                        <td style={{ width: '0px' }}>
                                                            <img width="100%" alt={data.image} src={data.image} />
                                                        </td>

                                                        <td>
                                                            {data.name}
                                                        </td>
                                                        <td>Rs: {data.rate}</td>
                                                        <td>{data.quantity}</td>
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

                                                                {/* <Edit
                                                                    sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                                                                    onClick={() =>
                                                                        editData(data)
                                                                        // history.push('/editproduct')
                                                                    } /> */}
                                                                {/* </Button> */}
                                                                {/* <Button style={{ width: "100%" }} onClick={() => publish(data)} variant="danger">
                                                                    Publish
                                                                </Button> */}
                                                                <PublishIcon sx={{ height: "25px", width: "25px", cursor: "pointer" }} onClick={() => publish(data)} />
                                                                <DeleteIcon sx={{ height: "25px", width: "25px", cursor: "pointer" }} onClick={(e) => del(e, data.id)} />

                                                            </div>
                                                        </td>


                                                    </>

                                                </tr>

                                                {/* <tr> */}

                                                {/* </tr> */}
                                            </>
                                        ))}
                                    </tbody>
                                    {/* {
                    checkedShow === true ?
                      <div>dfgdfb</div>
                      : null
                  } */}
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

export default DraftList;
