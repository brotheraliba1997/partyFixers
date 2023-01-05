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

export const EditCategory = () => {

    const location = useLocation();
    const [product, setProduct] = React.useState([]);
    const [category, setCategory] = React.useState("");
    // const [name, setName] = React.useState("");
    // const [image, setImage] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [search, setSearch] = React.useState('');
    const [uid, setUid] = React.useState();
    const [openImage, setOpenImage] = React.useState(false);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [openDes, setOpenDes] = React.useState(false);
    const [image, setImageUrl] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [productImage, setProductImage] = React.useState(null);


    const handleClose = () => {
        setOpenImage(false);
        setOpenCategory(false);
        setOpenDes(false);
    };

    useEffect(async () => {
        const collectionProduct = collection(db, "MainCategory");

        const unsub = onSnapshot(collectionProduct, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProduct(data);
        });

        return unsub;
    }, []);

    const del = async (id) => {
        await deleteDoc(doc(db, "MainCategory", id));
    }

    const udpateCategory = async () => {
        const docRef = doc(db, "MainCategory", uid);
        const payload = { category };
        updateDoc(docRef, payload);
        setOpenCategory(false);
    };
    const updateImage = async () => {
        // setImage(imageUrl);
        // console.log("img>>", image)
        const docRef = doc(db, "MainCategory", uid);
        const payload = { image };
        updateDoc(docRef, payload);
        setOpenImage(false);
    };


    const updateDes = async () => {
        const docRef = doc(db, "MainCategory", uid);
        const payload = { description };
        updateDoc(docRef, payload);
        setOpenDes(false);
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
                            {data.category}
                            <IconButton
                                aria-label="edit"
                                onClick={() => { setOpenCategory(true), setUid(data.id) }}
                            >
                                <Edit />
                            </IconButton>
                        </Card.Title>
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
                    <Dialog open={openCategory} onClose={handleClose}>
                        <DialogTitle>Update Name</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Enter Category"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={udpateCategory}>Submit</Button>
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
