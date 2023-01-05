
import React, { useEffect, useState } from "react";
import db from "../config/firebase";
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
    Table
} from "react-bootstrap";
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
import "../assets/css/style.css";
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
import { Carousel } from 'react-responsive-carousel';
import { RMIUploader } from "react-multiple-image-uploader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Tippy from '@tippyjs/react'
import { BlockPicker, SketchPicker, ChromePicker } from 'react-color'


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const dataSources = [
    {
        id: 1,
        // dataURL: "https://picsum.photos/seed/1/600",
    },
];

export const EditProductList = () => {

    const location = useLocation();
    const history = useHistory();





    const del = async (id) => {
        await deleteDoc(doc(db, "product", id));
    }

    let data = location.state.detail
    // console.log('loc', history)

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





    // .........................New Code.....................................................

    const [productImage, setProductImage] = React.useState([]);
    const [image, setImageUrl] = React.useState([]);
    const [name, setName] = React.useState("");
    const [rate, setRate] = React.useState(null);
    const [discountPercentage, setDiscountPer] = React.useState(null);
    const [discountPrice, setDiscountPrice] = React.useState(null);
    const [quantity, setQuantity] = React.useState("");
    const [subcat, setSubCat] = React.useState("");
    const [subcat1, setSubCat1] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [open, setOpen] = React.useState(false);

    const [color, setSelectedColor] = useState([])
    const [colorState, setColorState] = useState('000000')

    const [size, setCheckedSize] = React.useState([]);


    // const [hasImage, setHasImage] = useState(false);
    // const [hasName, setHasName] = useState(false);
    // const [hasRate, setHasRate] = useState(false);
    // const [hasDiscountPer, setHasDiscountPer] = useState(false);
    // const [hasDiscountPrice, setHasDiscountPrice] = useState(false);
    // const [hasQuantity, setHasQuantity] = useState(false);
    // const [hasDescription, setHasDescription] = useState(false);



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
    // console.log("size", size)


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };



    const [visible, setVisible] = useState(false);
    const handleSetVisible = (e) => {
        e.preventDefault();
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };



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


    const handleDiscount = (e) => {

        // var discountValue = rate - (rate * e.target.value / 100)
        var discountValue = ((rate - e.target.value) / rate) * 100

        setDiscountPer(discountValue.toFixed())
        setDiscountPrice(e.target.value);
    }




    // const updateImage = async (id) => {
    //     const docRef = doc(db, "product", id);
    //     const payload = { image };
    //     updateDoc(docRef, payload);
    // };



    // const updateName = async (id) => {
    //     const docRef = doc(db, "product", id);
    //     const payload = { name };
    //     updateDoc(docRef, payload);
    // };

    // const handlePriceUpdate = async (id) => {

    //     if (discountPrice && discountPercentage) {

    //         // const updateRate = async (id) => {
    //         const docRef = doc(db, "product", id);
    //         const payloadRate = { rate };
    //         updateDoc(docRef, payloadRate);
    //         // };

    //         // const updateDiscountPercentage = async (id) => {
    //         // const docRef = doc(db, "product", id);
    //         const payloadDiscountPercentage = { discountPercentage };
    //         updateDoc(docRef, payloadDiscountPercentage);
    //         // };
    //         // const updateDiscountPrice = async (id) => {
    //         // const docRef = doc(db, "product", id);
    //         const payloadDiscountPrice = { discountPrice };
    //         updateDoc(docRef, payloadDiscountPrice);
    //         // };
    //     }
    //     else {
    //         const docRef = doc(db, "product", id);
    //         const payloadRate = { rate };
    //         updateDoc(docRef, payloadRate);
    //     }
    // }


    // const updateQuantity = async (id) => {
    //     const docRef = doc(db, "product", id);
    //     const payload = { quantity };
    //     updateDoc(docRef, payload);
    // };


    // const updateDes = async (id) => {
    //     const docRef = doc(db, "product", id);
    //     const payload = { description };
    //     updateDoc(docRef, payload);
    // };



    const uploadUpdated = async () => {
        const docRef = doc(db, "product", data.id);
        if (image.length) {
            const payload = { image };
            updateDoc(docRef, payload);
        }
        if (name) {
            const payload = { name };
            updateDoc(docRef, payload);
        }
        if (rate) {
            if (discountPrice && discountPercentage) {
                // const updateRate = async (id) => {
                // const docRef = doc(db, "product", id);
                const payloadRate = { rate };
                updateDoc(docRef, payloadRate);
                // };

                // const updateDiscountPercentage = async (id) => {
                // const docRef = doc(db, "product", id);
                const payloadDiscountPercentage = { discountPercentage };
                updateDoc(docRef, payloadDiscountPercentage);
                // };
                // const updateDiscountPrice = async (id) => {
                // const docRef = doc(db, "product", id);
                const payloadDiscountPrice = { discountPrice };
                updateDoc(docRef, payloadDiscountPrice);
                // };
            }
            else {
                // const docRef = doc(db, "product", id);
                const payloadRate = { rate };
                updateDoc(docRef, payloadRate);
            }
        }
        if (quantity) {
            const payload = { quantity };
            updateDoc(docRef, payload);
        }
        if (subcat) {
            const payload = { subcat };
            updateDoc(docRef, payload);
        }
        if (subcat1) {
            const payload = { subcat1 };
            updateDoc(docRef, payload);
        }
        if (subcat1) {
            const payload = { subcat1 };
            updateDoc(docRef, payload);
        }
        if (color.length) {
            const payload = { color };
            updateDoc(docRef, payload);
        }
        if (size.length) {
            const payload = { size };
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
                    {/* <h6>Back</h6> */}
                </div>
                <div style={{ textAlign: 'center', marginLeft: '10%' }}>

                    <h2 style={{ fontWeight: 'bold' }}>Update Product</h2>
                </div>
            </div>
            <div
                style={{ width: '90%', display: 'flex', flexDirection: 'row' }}
            >
                {/* <Container fluid> */}
                <Col md="6" style={{
                    // border: '2px solid blue',
                    margin: '2% 2%',
                    padding: '2% 2% 2% 2%',
                    background: 'white',
                }}>
                    <div
                        style={{
                            // width: '45%',
                            // border: '1px solid',
                            background: 'white'
                        }}
                    >
                        <div style={{
                            width: '80%'
                        }}>
                            <Carousel
                                showStatus={false}
                            >

                                {data.image.map((ele, i) => (

                                    <div key={i}>

                                        <img src={ele} />

                                    </div>
                                ))}


                            </Carousel>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <RMIUploader
                                isOpen={visible}
                                hideModal={hideModal}
                                onSelect={onSelect}
                                // onSelect={handleProductImage}
                                // onChange={(e) => handleProductImage(e)}
                                onUpload={onUpload}
                                onRemove={onRemove}
                                dataSources={dataSources}
                            />
                            {/* <CloudUploadIcon
                        sx={{ height: "50px", width: "50px", cursor: "pointer" }}
                        onClick={() =>
                            updateImage(data.id)
                            
                        } /> */}
                        </div>

                    </div>
                </Col>
                <Col md="6" style={{
                    // border: '2px solid blue',
                    margin: '2% 2%',
                    padding: '2% 2% 2% 2%',
                    background: 'white',
                }} >

                    <div
                        style={{
                            // width: '45%'
                            // border: '1px solid',
                            // alignContent: 'flex-end'
                            // display:'flex',
                            // justifyContent:'flex-start'
                            // mar
                            background: 'white'
                        }}
                    >
                        <div
                            style={{ marginTop: '2%' }}
                        // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%' }}
                        >
                            <h4>Name : </h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                // name="name"
                                // value={data.name}
                                defaultValue={data.name}
                                // label="Please enter first and last name"
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%' }}

                            />
                            {/* <CloudUploadIcon
                        sx={{ height: "20px", width: "20px", cursor: "pointer" }}
                        onClick={() =>
                            updateName(data.id)
                            
                        } /> */}
                        </div>
                        <div

                        // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%' }}
                        >
                            <div>


                                <div
                                    style={{ marginTop: '2%' }}
                                // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%' }}
                                >
                                    <h4>Original Price : </h4>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        // name="name"
                                        // value={data.name}
                                        defaultValue={data.rate}
                                        // label="Please enter first and last name"
                                        style={{ width: '100%' }}

                                        onChange={(e) => setRate(parseInt(e.target.value))}

                                    />
                                </div>







                                <div
                                    style={{ marginTop: '2%' }}
                                // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%' }}
                                >
                                    <h4>Discount Price : </h4>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        // name="name"
                                        // value={data.name}
                                        defaultValue={data.discountPrice}

                                        style={{ width: '100%' }}
                                        // label="Please enter first and last name"

                                        onChange={(e) => handleDiscount(e)}

                                    />
                                </div>
                                <div
                                    style={{ marginTop: '2%' }}
                                // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%' }}
                                >
                                    <h4>Discount Percentage : </h4>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        // name="name"
                                        value={discountPercentage}
                                        defaultValue={data.discountPercentage}
                                        disabled
                                        style={{ width: '100%' }}
                                    // label="Please enter first and last name"

                                    // onChange={(e) => handleDiscount(e)}

                                    />
                                </div>
                            </div>
                            <div>
                                {/* <CloudUploadIcon
                            sx={{ height: "20px", width: "20px", cursor: "pointer" }}
                            onClick={() =>
                                handlePriceUpdate(data.id)
                                
                            } /> */}
                            </div>
                        </div>

                        <div
                            style={{ marginTop: '2%' }}
                        // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '2%' }}
                        >
                            <h4>Quantity : </h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                // name="name"
                                // value={data.name}
                                defaultValue={data.quantity}
                                style={{ width: '100%' }}
                                // label="Please enter first and last name"

                                onChange={(e) => setQuantity(parseInt(e.target.value))}

                            />
                            {/* <CloudUploadIcon
                        sx={{ height: "20px", width: "20px", cursor: "pointer" }}
                        onClick={() =>
                            updateQuantity(data.id)
                            
                        } /> */}
                        </div>
                        <div
                            style={{ marginTop: '2%' }}
                        >
                            <h4>Sub Category : </h4>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => setSubCat(e.target.value)}
                                    //  value={subcat}
                                    defaultValue={data.subcat}
                                >
                                    <option value='-'></option>
                                    <option value="BestSaleItem">Best Sale Item</option>
                                    {/* <option value="NewArrival">New Arrival</option> */}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div
                            style={{ marginTop: '2%' }}
                        >
                            <h4>Sub Category 1 : </h4>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => setSubCat1(e.target.value)}
                                    //  value={subcat1}
                                    defaultValue={data.subcat1}
                                >
                                    <option value='-'></option>
                                    {/* <option value="BestSaleItem">Best Sale Item</option> */}
                                    <option value="NewArrival">New Arrival</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div
                            style={{ marginTop: '2%' }}
                        >
                            <h4>Color : </h4>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                {color.length ?
                                    color.map(data => (

                                        <div
                                            className='area'
                                            style={{
                                                backgroundColor: data,
                                                padding: '20px',
                                                width: '25px',
                                                // borderRadius: '20px',
                                                marginBottom: '3%',
                                                marginLeft: '10%'
                                            }}
                                        >

                                        </div>
                                    ))
                                    :
                                    data.color.map(data => (

                                        <div
                                            className='area'
                                            style={{
                                                backgroundColor: data,
                                                padding: '20px',
                                                width: '25px',
                                                // borderRadius: '20px',
                                                marginBottom: '3%',
                                                marginLeft: '10%'
                                            }}
                                        >

                                        </div>
                                    ))
                                }
                            </div>
                            <div
                                // className='area'
                                style={{
                                    backgroundColor: colorState,
                                    padding: '15px',
                                    // width: '25px',
                                    width: '96%',
                                    borderRadius: '20px',
                                    // marginBottom: '3%',
                                    // marginLeft: '2%',
                                    // marginRight: '2%',
                                    margin: '2% 2%',
                                    // cursor: 'pointer',
                                }}
                            // onClick={() => setSelectedColor([...selectedColor, colorState])}
                            >
                            </div>
                            {/* <div style={{ textAlign: 'center' }}> */}
                            <Tippy interactive={true} placement={'bottom'} content={
                                <SketchPicker
                                    color={color}
                                    // onChangeComplete={color => setSelectedColor([...selectedColor, color.hex])}
                                    onChangeComplete={color => setColorState(color.hex)}
                                />
                            }>

                                <Button
                                    // className='ref-button'
                                    // className="btn-fill pull-right"
                                    variant="light"
                                    style={{ width: '100%', fontSize: '10px', marginRight: '2%', marginBottom: '2%' }}
                                >Pick Colour</Button>

                            </Tippy>
                            <Button
                                // className='ref-button'
                                // className="btn-fill pull-right"
                                variant="light"
                                style={{ width: '50%', fontSize: '10px', }}
                                onClick={() => setSelectedColor([...color, colorState])}
                            >Select Colour</Button>
                            <Button
                                // className='ref-button'
                                // className="btn-fill pull-right"
                                variant="light"
                                style={{ width: '50%', fontSize: '10px', }}
                                onClick={() => setSelectedColor([])}
                            >Remove Colour</Button>

                        </div>
                        <div
                            style={{ marginTop: '2%' }}
                        >
                            <h4>Size : </h4>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {['Small', 'Extra-Small', 'Medium', 'Large', 'Extra-Large'].map((value, i) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={size.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={value} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            {/* <ul>
                                {data.size.map(data => (
                                    <li>{data}</li>
                                ))}
                            </ul> */}
                        </div>
                        <div >
                            <h4>Description : </h4>
                            <div
                            // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}
                            >

                                <ReactQuill
                                    // value={description}
                                    defaultValue={data.description}
                                    onChange={(e) => setDescription(e)}
                                    // onChangeSelection={(e) => console.log(e)}
                                    // onChangeSelection={(e) => setDescription(e)}
                                    formats={EditProductList.formats}
                                    modules={EditProductList.modules}
                                // placeholder="Write description"
                                />
                                {/* <CloudUploadIcon
                            sx={{ height: "20px", width: "20px", cursor: "pointer" }}
                            onClick={() =>
                                updateDes(data.id)
                                
                            } /> */}
                            </div>
                        </div>
                        {/* <CloudUploadIcon
                            sx={{ height: "50px", width: "50px", cursor: "pointer" }}
                            onClick={() =>
                                uploadUpdated()

                            } /> */}
                        <div style={{ marginTop: '2%', textAlign: 'right' }}>
                            <Button
                                // className='ref-button'
                                // variant="light"
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
                {/* </Container> */}
            </div>

        </div >
    )
}


EditProductList.formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

EditProductList.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}