// import React from 'react'
import React, { useEffect } from "react";
import db from "../config/firebase";
import {
    onSnapshot,
    collection,
    updateDoc,
    doc,
    deleteDoc
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
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const EditFlashList = () => {

    const location = useLocation();
    const [product, setProduct] = React.useState([]);
    // const [category, setCategory] = React.useState("");
    const [name, setName] = React.useState("");
    // const [image, setImage] = React.useState("");
    const [spec, setSpec] = React.useState("");
    const [discountPrice, setRate] = React.useState("");
    const [rate, setRateO] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [page, setPage] = React.useState("");
    const [subcat, setSubCat] = React.useState("");
    const [subcat1, setSubCat1] = React.useState("");
    const [flashQuantity, setQuantity] = React.useState("");
    const [search, setSearch] = React.useState('');
    const [uid, setUid] = React.useState();
    const [openImage, setOpenImage] = React.useState(false);
    const [openName, setOpenName] = React.useState(false);
    const [openSpec, setOpenSpec] = React.useState(false);
    const [openRate, setOpenRate] = React.useState(false);
    const [openRateO, setOpenRateO] = React.useState(false);
    const [openPage, setOpenPage] = React.useState(false);
    const [openSubcat, setOpenSubcat] = React.useState(false);
    const [openSubcat1, setOpenSubcat1] = React.useState(false);
    const [openDes, setOpenDes] = React.useState(false);
    const [openQuantity, setOpenQuantity] = React.useState(false);
    const [image, setImageUrl] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [productImage, setProductImage] = React.useState(null);


    const handleClose = () => {
        setOpenImage(false);
        setOpenName(false);
        setOpenSpec(false);
        setOpenRate(false);
        setOpenRateO(false);
        setOpenPage(false);
        setOpenSubcat(false);
        setOpenSubcat1(false);
        setOpenDes(false);
        setOpenQuantity(false);
    };

    useEffect(async () => {
        const collectionProduct = collection(db, "timesale");

        const unsub = onSnapshot(collectionProduct, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProduct(data);
        });

        return unsub;
    }, []);

    const del = async (id) => {
        await deleteDoc(doc(db, "timesale", id));
    }

    const udpateName = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { name };
        updateDoc(docRef, payload);
        setOpenName(false);
    };
    const updateImage = async () => {
        // setImage(imageUrl);
        // console.log("img>>", image)
        const docRef = doc(db, "timesale", uid);
        const payload = { image };
        updateDoc(docRef, payload);
        setOpenImage(false);
    };
    const updateSpec = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { spec };
        updateDoc(docRef, payload);
        setOpenSpec(false);
    };
    const updateRate = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { discountPrice };
        updateDoc(docRef, payload);
        setOpenRate(false);
    };
    const updateRateO = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { rate };
        updateDoc(docRef, payload);
        setOpenRateO(false);
    };
    const updatePage = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { page };
        updateDoc(docRef, payload);
        setOpenPage(false);
    };
    const updateSubCat = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { subcat };
        updateDoc(docRef, payload);
        setOpenSubcat(false);
    };
    const updatesubCat1 = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { subcat1 };
        updateDoc(docRef, payload);
        setOpenSubcat1(false);
    };
    const updateDes = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { description };
        updateDoc(docRef, payload);
        setOpenDes(false);
    };
    const updateQuantity = async () => {
        const docRef = doc(db, "timesale", uid);
        const payload = { flashQuantity };
        updateDoc(docRef, payload);
        setOpenQuantity(false);
        // console.log("pro..>>", quantity)
    };

    let data = location.state.detail


    const storage = getStorage();
    const handleCloseI = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseI}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const uploadImage = async () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const uploadData = async () => {
        const storeRef = ref(storage, `productImage/${productImage.name}`);
        await uploadBytes(storeRef, productImage).then((snapshot) => {
            if (productImage != null) {
                setOpen(true);
            }
        });
        getDownloadURL(ref(storage, `productImage/${productImage.name}`)).then(
            (url) => {
                setImageUrl(url);
            }
        )
            //  .then( setImage(imageUrl))
            .then(console.log("img..", image))
        // console.log("img..", image)

    };



    return (
        <div className="map-container">
            <div className="main">
                <Card style={{ width: "20rem", margin: "10px" }}>
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
                            Discount Price - Rs: {data.discountPrice}{" "}
                            <IconButton
                                aria-label="edit"
                                onClick={() => { setOpenRate(true), setUid(data.id) }}
                            >
                                <Edit />
                            </IconButton>
                        </Card.Text>
                        <Card.Text>
                            Original Price - Rs: {data.rate}{" "}
                            <IconButton
                                aria-label="edit"
                                onClick={() => { setOpenRateO(true), setUid(data.id) }}
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
                            Quantity: {data.flashQuantity}{" "}
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
                            {/* <TextField
                                autoFocus
                                margin="dense"
                                label="Image URL"
                                fullWidth
                                variant="standard"
                                // value={imageUrl}
                                onChange={(e) => setImage(e.target.value)}
                            /> */}

                            <div style={{ width: "100%", textAlign: 'center', marginBottom: '2%' }}>
                                <img width="50%" src={image} alt={image} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <Button
                                    className="btn-fill pull-right"
                                    variant="info"
                                    onClick={(e) => uploadData()}
                                    style={{ marginRight: "1%", width: "50%", fontSize: '12px', fontWeight: "bold" }}
                                >
                                    Upload Image
                                </Button>
                                <Button
                                    className="btn-fill pull-right"
                                    variant="info"
                                    onClick={(e) => uploadImage(e)}
                                    style={{ marginRight: "1%", width: "50%", fontSize: '12px', fontWeight: "bold" }}
                                >
                                    Select Image
                                </Button>
                            </div>
                            <input
                                type="file"
                                hidden={"hidden"}
                                id="imageInput"
                                onChange={(e) => setProductImage(e.target.files[0])}
                            />
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleCloseI}
                                message="Image Upload"
                                action={action}
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
                        <DialogTitle>Update Discount Rate</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Enter Update Discount Rate"
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
                    <Dialog open={openRateO} onClose={handleClose}>
                        <DialogTitle>Update Rate</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Enter Update Rate"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setRateO(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={updateRateO}>Submit</Button>
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
                                value={flashQuantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
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
            </div>
        </div>
    )
}
