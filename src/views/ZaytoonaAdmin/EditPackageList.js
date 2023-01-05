
import React, { useEffect, useState } from "react";
import db from '../../config/firebase'

import {
    onSnapshot,
    collection,
    updateDoc,
    doc,
    deleteDoc
} from "@firebase/firestore";

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
    InputGroup,
    FormControl,
    Dropdown,
    Table,
    FloatingLabel
} from "react-bootstrap";

import "../../assets/css/style.css";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import VisibilityIcon from "@mui/icons-material/Visibility";

import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// .............New Code............................................
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const EditPackageList = () => {

    const location = useLocation();
    const history = useHistory();

    const [productImage, setProductImage] = React.useState([]);
    const [image, setImageUrl] = React.useState([]);
    const [name, setName] = React.useState("");
    const [rate, setRate] = React.useState(null);
    const [discountPercentage, setDiscountPer] = React.useState(null);
    const [discountPrice, setDiscountPrice] = React.useState(null);
    const [cardsQuantity, setCardsQuantity] = React.useState("");
    const [chatsQuantity, setChatsQuantity] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [mainCategories, setMainCategories] = React.useState("")
    const [subcat, setSubCat] = React.useState("");
    const [subcat1, setSubCat1] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [color, setSelectedColor] = useState([])
    const [colorState, setColorState] = useState('000000')
    const [size, setCheckedSize] = React.useState([]);
    const [visible, setVisible] = useState(false);



    let data = location.state.detail




    React.useEffect(() => {
        const collectionPackage = collection(db, "MainCategory");

        const MainCategories = onSnapshot(collectionPackage, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setMainCategories(data);
        });

        return MainCategories;
    }, []);





    const del = async (id) => {
        await deleteDoc(doc(db, "Package", id));
    }


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






    const handleToggle = (value) => () => {
        const currentIndex = size.indexOf(value);
        const newChecked = [...size];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedSize(newChecked);
    };


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };



    const handleSetVisible = (e) => {
        e.preventDefault();
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };

    const onUpload = async (data) => {


        for (let i = 0; i < data.length; i++) {
            const extendedName = Date.now();

            data[i].file.newName = `${extendedName}${data[i].file.name}`;
            const newImage = data[i].file
            setProductImage((prevState) => [...prevState, newImage]);
        }

    };
    const onSelect = (data) => {
        console.log("Select files", data);
    };
    const onRemove = (id) => {
        console.log("Remove image id", id);
        setImageUrl('');
    };


    const handleDiscount = (e, rate) => {

        var discountValue = (((rate ? rate : data.rate) - e.target.value) / (rate ? rate : data.rate)) * 100

        setDiscountPer(discountValue.toFixed())
        setDiscountPrice(e.target.value);
    }



    const uploadUpdated = async () => {
        const docRef = doc(db, "Package", data.id);

        if (name) {
            const payload = { name };
            updateDoc(docRef, payload);
        }
        if (rate) {
            if (discountPrice && discountPercentage) {

                const payloadRate = { rate };
                updateDoc(docRef, payloadRate);

                const payloadDiscountPercentage = { discountPercentage };
                updateDoc(docRef, payloadDiscountPercentage);

                const payloadDiscountPrice = { discountPrice };
                updateDoc(docRef, payloadDiscountPrice);
            }
            else {
                const payloadRate = { rate };
                updateDoc(docRef, payloadRate);
            }
        }

        if (cardsQuantity) {
            const payload = { numberOfCards: cardsQuantity };
            updateDoc(docRef, payload);
        }
        if (chatsQuantity) {
            const payload = { numberOfChats: chatsQuantity };
            updateDoc(docRef, payload);
        }
        if (category) {
            const payload = { otherCategory: category };
            updateDoc(docRef, payload);
        }
        if (description) {
            const payload = { description };
            updateDoc(docRef, payload);
        }

        setOpen(true)
        setTimeout(() => {
            history.goBack()
        }, 2000)

    }


    return (
        <div
            style={{
                background: '#ebebeb',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', background: 'white', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    <KeyboardBackspaceIcon
                        sx={{ height: "50px", width: "50px", cursor: "pointer", marginLeft: '1%' }}
                        onClick={() =>
                            history.goBack()

                        } />
                </div>
                <div style={{ textAlign: 'center', marginLeft: '10%' }}>

                    <h2 style={{ fontWeight: 'bold' }}>Update Package</h2>
                </div>
            </div>
            <div
                style={{ width: '90%', display: 'flex', flexDirection: 'row' }}
            >

                <Col md="6" style={{
                    margin: '2% 2%',
                    padding: '2% 2% 2% 2%',
                    background: 'white',
                }} >

                    <div
                        style={{
                            background: 'white'
                        }}
                    >
                        <div
                            style={{ marginTop: '2%' }}
                        >
                            <FloatingLabel controlId="floatingName" label="Name">
                                <Form.Control type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    defaultValue={data.name}
                                />
                            </FloatingLabel>

                        </div>
                        <div>
                            <div>
                                <div
                                    style={{ marginTop: '2%' }}
                                >
                                    {/* <h4>Original Price : </h4>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={data.rate}
                                        style={{ width: '100%' }}

                                        onChange={(e) => setRate(parseInt(e.target.value))}

                                    /> */}

                                    <FloatingLabel controlId="floatingPrice" label="Original Price">
                                        <Form.Control type="text"
                                            defaultValue={data.rate}
                                            onChange={(e) => setRate(parseInt(e.target.value))}
                                        />
                                    </FloatingLabel>
                                </div>
                                <div
                                    style={{ marginTop: '2%' }}
                                >
                                    {/* <h4>Discount Price : </h4>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={data.discountPrice}

                                        style={{ width: '100%' }}
                                        onChange={(e) => handleDiscount(e)}

                                    /> */}
                                    <FloatingLabel controlId="floatingDiscountPrice" label="Discount Price">
                                        <Form.Control type="text"
                                            defaultValue={data.discountPrice}
                                            onChange={(e) => handleDiscount(e, rate)}
                                        />
                                    </FloatingLabel>
                                </div>
                                <div
                                    style={{ marginTop: '2%' }}
                                >
                                    {/* <h4>Discount Percentage : </h4>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={discountPercentage}
                                        defaultValue={data.discountPercentage}
                                        disabled
                                        style={{ width: '100%' }}


                                    /> */}
                                    <FloatingLabel controlId="floatingDiscountPercentage" label="Discount Percentage">
                                        <Form.Control type="text"
                                            value={discountPercentage}
                                            defaultValue={data.discountPercentage}
                                            disabled
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div
                            style={{ marginTop: '2%' }}
                        >
                            {/* <h4>Cards Quantity : </h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                defaultValue={data.cardsQuantity}
                                style={{ width: '100%' }}

                                onChange={(e) => setCardsQuantity(parseInt(e.target.value))}

                            /> */}
                            <FloatingLabel controlId="floatingCardsQuantity" label="Cards Quantity">
                                <Form.Control type="text"
                                    defaultValue={data.numberOfCards}
                                    onChange={(e) => setCardsQuantity(parseInt(e.target.value))}
                                />
                            </FloatingLabel>

                        </div>
                        <div
                            style={{ marginTop: '2%' }}
                        >
                            {/* <h4>Cards Quantity : </h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                defaultValue={data.cardsQuantity}
                                style={{ width: '100%' }}

                                onChange={(e) => setCardsQuantity(parseInt(e.target.value))}

                            /> */}
                            <FloatingLabel controlId="floatingChatsQuantity" label="Chats Quantity">
                                <Form.Control type="text"
                                    onChange={(e) => setChatsQuantity(e.target.value)}
                                    defaultValue={data.numberOfChats}
                                />
                            </FloatingLabel>
                        </div>

                        <div
                            style={{ marginTop: '2%' }}
                        >

                            <FloatingLabel controlId="floatingChatsQuantity" label="Category">
                                <Form.Control
                                    as="select"
                                    onClick={(e) => setCategory(e.target.value)}
                                    value={data.category}
                                    placeholder='text'
                                >
                                    {mainCategories.length > 0 ?

                                        mainCategories.map((category) => (
                                            <option value={category.category}>
                                                {category.category}
                                            </option>
                                        ))
                                        :
                                        <option>No Categories Added</option>

                                    }
                                </Form.Control>
                            </FloatingLabel>

                        </div>
                        <div >
                            <h4>Description : </h4>
                            <div>

                                <ReactQuill
                                    defaultValue={data.description}
                                    onChange={(e) => setDescription(e)}
                                    formats={EditPackageList.formats}
                                    modules={EditPackageList.modules}
                                />

                            </div>
                        </div>

                        <div style={{ marginTop: '2%', textAlign: 'right' }}>
                            <Button
                                className="btn-fill pull-right"
                                variant="info"
                                style={{ width: '40%', fontSize: '18px', }}
                                onClick={() =>
                                    uploadUpdated()}
                            >Update</Button>
                        </div>
                    </div>
                </Col>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Updated Successfully!
                    </Alert>
                </Snackbar>
            </div>

        </div >
    )
}


EditPackageList.formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

EditPackageList.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}