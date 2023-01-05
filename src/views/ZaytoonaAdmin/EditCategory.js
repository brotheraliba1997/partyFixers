
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
import { Diversity1Outlined } from "@mui/icons-material";



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const EditCategory = () => {

    const location = useLocation();
    const history = useHistory();


    let data = location.state.detail


    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

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

    const uploadUpdated = async () => {
        const docRef = doc(db, "MainCategory", data.id);

        if (category) {
            const payload = { category };
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

                    <h2 style={{ fontWeight: 'bold' }}>Update Category</h2>
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
                            <FloatingLabel controlId="floatingName" label="Category Name">
                                <Form.Control type="text"
                                    onChange={(e) => setCategory(e.target.value)}
                                    defaultValue={data.category}
                                />
                            </FloatingLabel>

                        </div>

                        <div
                            style={{ marginTop: '2%' }}
                        >
                            <FloatingLabel controlId="floatingDescription" label="Description">
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '100px' }}
                                    defaultValue={data.description}
                                    onChange={(e) => setDescription(e.currentTarget.value)}
                                />
                            </FloatingLabel>
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

