import React, { useEffect } from "react";
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Table,

} from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { doc, setDoc, collection, addDoc, query, onSnapshot, deleteDoc } from "firebase/firestore";
// import ImageUploading from "react-images-uploading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from "../config/firebase";
import { RMIUploader } from "react-multiple-image-uploader";
import DeleteIcon from '@mui/icons-material/Delete';
import { height } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import PhoneIcon from '@mui/icons-material/Phone';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const dataSources = [
    {
        id: 1,
        // dataURL: "https://picsum.photos/seed/1/600",
    },
    // {
    //   id: 2,
    //   dataURL: "https://picsum.photos/seed/2/600",
    // },
    // {
    //   id: 3,
    //   dataURL: "https://picsum.photos/seed/3/600",
    // },
    // {
    //   id: 4,
    //   dataURL: "https://picsum.photos/seed/4/600",
    // },
    // {
    //   id: 5,
    //   dataURL: "https://picsum.photos/seed/5/600",
    // },
    // {
    //   id: 6,
    //   dataURL: "https://picsum.photos/seed/6/600",
    // },
    // {
    //   id: 7,
    //   dataURL: "https://picsum.photos/seed/7/600",
    // },
    // {
    //   id: 8,
    //   dataURL: "https://picsum.photos/seed/8/600",
    // },
    // {
    //   id: 9,
    //   dataURL: "https://picsum.photos/seed/9/600",
    // },
    // {
    //   id: 10,
    //   dataURL: "https://picsum.photos/seed/10/600",
    // },
];
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AddBanner() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState([]);
    const [productImage, setProductImage] = React.useState([]);
    const [product, setProduct] = React.useState([]);
    const [product2, setProduct2] = React.useState([]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        setOpen2(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    const submit2 = async () => {
        setOpen2(true)
        for (var i = 0; i < imageUrl.length; i++) {

            await addDoc(collection(db, 'webBanner'), {
                image: imageUrl[i],
            })
        }
    }

    const submit3 = async () => {
        setOpen2(true)
        for (var i = 0; i < imageUrl.length; i++) {

            await addDoc(collection(db, 'mobileBanner'), {
                image: imageUrl[i],
            })
        }
    }

    const storage = getStorage();


    useEffect(() => {
        productImage.map(async (image) => {

            const storeRef = ref(storage, `productImage/${image.newName}`);
            await uploadBytes(storeRef, image).then((snapshot) => {
                if (image != null) {
                    setOpen(true);
                }
            });
            await getDownloadURL(ref(storage, `productImage/${image.newName}`)).then(
                (url) => {
                    setImageUrl((prevState) => [...prevState, url]);
                }
            );
        })

    }, [productImage])


    // console.log("pI", productImage)
    // console.log("url", imageUrl)
    const onUpload = async (data) => {

        // let newImage = [];
        for (let i = 0; i < data.length; i++) {
            // newImage.push(data[i].file);
            const extendedName = Date.now();

            data[i].file.newName = `${extendedName}${data[i].file.name}`;
            const newImage = data[i].file
            // console.log("new", newImage)
            setProductImage((prevState) => [...prevState, newImage]);
        }


        // newImage.map(async (image) => {

        //   const storeRef = ref(storage, `productImage/${image.name}`);
        //   await uploadBytes(storeRef, image).then((snapshot) => {
        //     if (image != null) {
        //       setOpen(true);
        //     }
        //   });
        //   await getDownloadURL(ref(storage, `productImage/${image.name}`)).then(
        //     (url) => {
        //       setImageUrl((prevState) => [...prevState, url]);
        //     }
        //   );
        // })

        // await handleProductImage(data)



        // console.log('data', data)
        // console.log("Upload files", data[0].file);
        // for (let i = 0; i < data.length; i++) {

        // productImage.map(async (image) => {

        //   const storeRef = ref(storage, `productImage/${image.name}`);
        //   await uploadBytes(storeRef, image).then((snapshot) => {
        //     if (image != null) {
        //       setOpen(true);
        //     }
        //   });
        //   await getDownloadURL(ref(storage, `productImage/${image.name}`)).then(
        //     (url) => {
        //       setImageUrl((prevState) => [...prevState, url]);
        //     }
        //   );
        // })
        // }

    };
    const onSelect = (data) => {
        // console.log("Select files", data);
    };
    const onRemove = (id) => {
        // console.log("Remove image id", id);
        setImageUrl('');
    };


    useEffect(async () => {
        const collectionProduct = collection(db, "webBanner");
        const q = query(collectionProduct,
            // orderBy("subcat", "asc"),
            //   limit(20)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            //   const lastDocB = snapshot.docs[snapshot.docs.length - 1];
            setProduct(data);
            //   setLastDocB(lastDocB);
        });

        return unsub;
    }, []);

    useEffect(async () => {
        const collectionProduct = collection(db, "mobileBanner");
        const q = query(collectionProduct,
            // orderBy("subcat", "asc"),
            //   limit(20)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            //   const lastDocB = snapshot.docs[snapshot.docs.length - 1];
            setProduct2(data);
            //   setLastDocB(lastDocB);
        });

        return unsub;
    }, []);



    const del = async (e, id) => {
        let answer = confirm("Are You Sure !!!! You Want To Delete This Item ....!!!!!!");
        if (answer == false) {
            // await deleteDoc(doc(db, "product", id));
            e.preventDefault()
        } else {
            await deleteDoc(doc(db, "webBanner", id));
        }
    }
    const del2 = async (e, id) => {
        let answer = confirm("Are You Sure !!!! You Want To Delete This Item ....!!!!!!");
        if (answer == false) {
            // await deleteDoc(doc(db, "product", id));
            e.preventDefault()
        } else {
            await deleteDoc(doc(db, "mobileBanner", id));
        }
    }

    return (
        <div>
            <>
                <Container fluid>

                    <Box sx={{ width: '100%', }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab icon={<DesktopWindowsIcon />} aria-label="DesktopWindowsIcon" label="Web Screen Banners" {...a11yProps(0)} />
                                <Tab icon={<PhoneAndroidIcon />} aria-label="PhoneAndroidIcon" label="Mobile Screen Banners" {...a11yProps(1)} />
                                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Row>
                                {/* </Row>
          <Row> */}
                                <Col md="12" >
                                    <Card className="card-plain table-plain-bg">
                                        {/* <Card.Header>
                      <Card.Title as="h4">Order Table</Card.Title>
                    </Card.Header> */}
                                        <Card.Body className="table-full-width table-responsive px-0">
                                            <Table className="table-hover">
                                                <thead>

                                                    <tr>
                                                        <th className="border-0">Banner height must be 250px</th>
                                                        {/* <th className="border-0">Category Name</th>
                      <th className="border-0">Category Description</th> */}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product
                                                        // .filter(data => {
                                                        //   if (search === '') {
                                                        //     return data
                                                        //   } else if (data.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                                                        //     return data
                                                        //   }
                                                        // })
                                                        .map((data, i) => (
                                                            <>
                                                                <tr key={i}>
                                                                    <>
                                                                        <td style={{
                                                                            // border: '1px solid red', 
                                                                            width: '100%',
                                                                            // height: '300px'
                                                                        }}>
                                                                            <img width="100%" height='250px' style={{ objectFit: 'fill' }} alt={data.image} src={data.image} />
                                                                        </td>

                                                                        {/* <td>
                              {data.category}
                            </td>
                            <td>{data.description}</td> */}

                                                                        <td >
                                                                            <div style={{ display: "flex", flexDirection: 'row' }}>

                                                                                {/* <Edit
                                  sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                                  onClick={() =>
                                    editData(data)
                                    // history.push('/editproduct')
                                  } /> */}
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
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Row>
                                {/* </Row>
          <Row> */}
                                <Col md="12" >
                                    <Card className="card-plain table-plain-bg">
                                        {/* <Card.Header>
                      <Card.Title as="h4">Order Table</Card.Title>
                    </Card.Header> */}
                                        <Card.Body className="table-full-width table-responsive px-0">
                                            <Table className="table-hover">
                                                <thead>

                                                    <tr>
                                                        <th className="border-0">Banner height must be 250px</th>
                                                        {/* <th className="border-0">Category Name</th>
                      <th className="border-0">Category Description</th> */}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product2
                                                        // .filter(data => {
                                                        //   if (search === '') {
                                                        //     return data
                                                        //   } else if (data.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                                                        //     return data
                                                        //   }
                                                        // })
                                                        .map((data, i) => (
                                                            <>
                                                                <tr key={i}>
                                                                    <>
                                                                        <td style={{
                                                                            // border: '1px solid red', 
                                                                            width: '100%',
                                                                            // height: '300px'
                                                                        }}>
                                                                            <img width="100%" height='250px' style={{ objectFit: 'fill' }} alt={data.image} src={data.image} />
                                                                        </td>

                                                                        {/* <td>
                              {data.category}
                            </td>
                            <td>{data.description}</td> */}

                                                                        <td >
                                                                            <div style={{ display: "flex", flexDirection: 'row' }}>

                                                                                {/* <Edit
                                  sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                                  onClick={() =>
                                    editData(data)
                                    // history.push('/editproduct')
                                  } /> */}
                                                                                <DeleteIcon sx={{ height: "25px", width: "25px", cursor: "pointer" }} onClick={(e) => del2(e, data.id)} />
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
                        </TabPanel>

                    </Box>

                    <Row>
                        {/* </Row>
          <Row> */}
                        <Col md="12" >
                            <Card >
                                <Card.Header>
                                    <Card.Title as="h4">Upload Banner</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="12">
                                                <Form.Group>

                                                    <div
                                                    // style={{ border: '1px solid' }}
                                                    >
                                                        <RMIUploader
                                                            // isOpen={visible}
                                                            // hideModal={hideModal}
                                                            onSelect={onSelect}
                                                            // onSelect={handleProductImage}
                                                            // onChange={(e) => handleProductImage(e)}
                                                            onUpload={onUpload}
                                                            onRemove={onRemove}
                                                            dataSources={dataSources}
                                                        />

                                                    </div>
                                                    <Snackbar
                                                        open={open}
                                                        autoHideDuration={6000}
                                                        onClose={handleClose}
                                                        message="Image Upload"
                                                        action={action}
                                                    />
                                                    <Snackbar
                                                        open={open2}
                                                        autoHideDuration={6000}
                                                        onClose={handleClose}
                                                        message="Banner Added"
                                                        action={action}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div>
                                            <Button
                                                onClick={submit2}
                                                className="btn-fill pull-right"
                                                variant="info"
                                                style={{ marginRight: "5%" }}
                                            >
                                                Add To Web App
                                            </Button>
                                            <Button
                                                onClick={submit3}
                                                className="btn-fill pull-right"
                                                variant="info"
                                                style={{ marginRight: "5%" }}
                                            >
                                                Add To Mobile App
                                            </Button>
                                            {/* <Snackbar
                                                open={open}
                                                autoHideDuration={6000}
                                                onClose={handleClose}
                                                message="Main Category Added"
                                                action={action}
                                            /> */}
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        </div>
    );
}
