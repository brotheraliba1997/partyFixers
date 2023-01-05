import React, { useState, useEffect } from "react";
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
    FloatingLabel
} from "react-bootstrap";
import FormCheck from "react-bootstrap/FormCheck"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import Card from "@mui/material/Card";
import Checkbox from '@mui/material/Checkbox';
import db from "../config/firebase";
import {
    doc,
    setDoc,
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    // writeBatch
} from "firebase/firestore";
import ImageUploading from "react-images-uploading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
// import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Divider from '@mui/material/Divider';

import Switch from '@mui/material/Switch';

import { RMIUploader } from "react-multiple-image-uploader";

import Tippy from '@tippyjs/react'
import { BlockPicker, SketchPicker, ChromePicker } from 'react-color'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



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

function AddPackages() {
    const navigation = useHistory();
    const [Package, setPackage] = React.useState([]);
    const [Package2, setPackage2] = React.useState([]);
    const [Package3, setPackage3] = React.useState([]);
    const [category, setCategory] = React.useState("");
    const [category1, setCategory1] = React.useState("");
    const [category2, setCategory2] = React.useState("");
    const [PackageName, setPackageName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [PackageImage, setPackageImage] = React.useState([]);
    const [spec, setSpec] = React.useState("");
    const [rate, setRate] = React.useState();
    const [rating, setRating] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [description, setDescription] = React.useState("");
    // const [page, setPage] = React.useState("");
    const [subcat, setSubCat] = React.useState("");
    const [subcat1, setSubCat1] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState([]);
    const [flashData, setFlashData] = React.useState([]);
    const [filterCategory, setFilterCategory] = React.useState([]);
    // const [brand, setBrand] = React.useState("");
    // const [fsubmit, setFsubmit] = React.useState(false);
    const [uid, setUid] = React.useState("");
    const [fquantity, setFquantity] = React.useState("");
    // const [disPrice, setDisPrice] = React.useState("");
    const [disPer, setDisPer] = React.useState("");
    const [disCount, setDisCount] = React.useState("");
    const [discountPer, setDiscountPer] = React.useState("");
    const [discountPrice, setDiscountPrice] = React.useState("");
    const [availableID, setAvailableID] = React.useState("");
    const [cardsQuantity, setCardsQuantity] = React.useState("")
    const [chatsQuantity, setChatsQuantity] = React.useState("")


    const [selectedColor, setSelectedColor] = useState([])
    const [colorState, setColorState] = useState('000000')

    // console.log("selectedColor", selectedColor)


    const storage = getStorage();
    const handleClose = (event, reason) => {
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
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    // const handlePackageImage = async (data) => {
    //   for (let i = 0; i < data.length; i++) {
    //     const newImage = data[i].file;
    //     setPackageImage((prevState) => [...prevState, newImage]);
    //   }

    // }

    // const handlePackageImageUpload = async () => {
    //   PackageImage.map(async (image) => {

    //     const storeRef = ref(storage, `PackageImage/${image.name}`);
    //     await uploadBytes(storeRef, image).then((snapshot) => {
    //       if (image != null) {
    //         setOpen(true);
    //       }
    //     });
    //     await getDownloadURL(ref(storage, `PackageImage/${image.name}`)).then(
    //       (url) => {
    //         setImageUrl((prevState) => [...prevState, url]);
    //       }
    //     );
    //   })
    // }

    // const uploadImage = async () => {
    //   const fileInput = document.getElementById("imageInput");
    //   fileInput.click();
    // };

    // const uploadData = async () => {
    //   const storeRef = ref(storage, `PackageImage/${PackageImage.name}`);
    //   await uploadBytes(storeRef, PackageImage).then((snapshot) => {
    //     if (PackageImage != null) {
    //       setOpen(true);
    //     }
    //   });
    //   getDownloadURL(ref(storage, `PackageImage/${PackageImage.name}`)).then(
    //     (url) => {
    //       setImageUrl(url);
    //     }
    //   );
    // };


    const [visible, setVisible] = useState(false);
    const handleSetVisible = (e) => {
        e.preventDefault();
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };


    useEffect(() => {
        PackageImage.map(async (image) => {

            const storeRef = ref(storage, `PackageImage/${image.newName}`);
            await uploadBytes(storeRef, image).then((snapshot) => {
                if (image != null) {
                    setOpen(true);
                }
            });
            await getDownloadURL(ref(storage, `PackageImage/${image.newName}`)).then(
                (url) => {
                    setImageUrl((prevState) => [...prevState, url]);
                }
            );
        })

    }, [PackageImage])

    const onUpload = async (data) => {

        // let newImage = [];
        for (let i = 0; i < data.length; i++) {
            // newImage.push(data[i].file);
            const extendedName = Date.now();

            data[i].file.newName = `${extendedName}${data[i].file.name}`;

            const newImage = data[i].file
            // console.log("data", newImage)
            setPackageImage((prevState) => [...prevState, newImage]);
        }


        // newImage.map(async (image) => {

        //   const storeRef = ref(storage, `PackageImage/${image.name}`);
        //   await uploadBytes(storeRef, image).then((snapshot) => {
        //     if (image != null) {
        //       setOpen(true);
        //     }
        //   });
        //   await getDownloadURL(ref(storage, `PackageImage/${image.name}`)).then(
        //     (url) => {
        //       setImageUrl((prevState) => [...prevState, url]);
        //     }
        //   );
        // })

        // await handlePackageImage(data)



        // console.log('data', data)
        // console.log("Upload files", data[0].file);
        // for (let i = 0; i < data.length; i++) {

        // PackageImage.map(async (image) => {

        //   const storeRef = ref(storage, `PackageImage/${image.name}`);
        //   await uploadBytes(storeRef, image).then((snapshot) => {
        //     if (image != null) {
        //       setOpen(true);
        //     }
        //   });
        //   await getDownloadURL(ref(storage, `PackageImage/${image.name}`)).then(
        //     (url) => {
        //       setImageUrl((prevState) => [...prevState, url]);
        //     }
        //   );
        // })
        // }

    };
    const onSelect = (data) => {
        console.log("Select files", data);
    };
    const onRemove = (id) => {
        console.log("Remove image id", id);
        setImageUrl('');
    };

    const [openl, setOpenl] = React.useState(false);

    // const handleClick = () => {
    //   setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }

    //   setOpen(false);
    // };
    const handleClosel = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenl(false);
    };

    // console.log("uid", uid)
    // console.log("rate", rate)
    // console.log("Package3", Package3)




    const [checkedShow, setCheckedShow] = useState(false)

    const handleChangeCheckedShow = (event) => {
        setCheckedShow(event.target.checked);
    };


    const [checkedShowSize, setCheckedShowSize] = useState(false)

    const handleChangeCheckedShowSize = (event) => {
        setCheckedShowSize(event.target.checked);
    };




    const [checkedSize, setCheckedSize] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checkedSize.indexOf(value);
        const newChecked = [...checkedSize];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedSize(newChecked);
    };





    const submit = async (e) => {
        e.preventDefault();

        if (imageUrl !== "") {
            // const batch = writeBatch(db);
            // await batch.set(doc(db, "Package", uid), {
            await setDoc(doc(db, "Package", uid), {
                otherCategory: category,
                // category: checked,
                name: PackageName,
                // image: imageUrl,
                // spec: spec,
                rate: rate,
                // rating: rating,
                // quantity: quantity,
                // color: selectedColor,
                // size: checkedSize,
                description: description,
                // Brand: category1,
                // subcat: subcat,
                // subcat1: subcat1,
                id: uid,
                discountPrice: discountPrice,
                discountPercentage: discountPer,
                numberOfChats: chatsQuantity,
                numberOfCards: cardsQuantity
            })
                .then(navigation.push("/model"));
        }
    };
    const AddSale = () => {

        if (fquantity) {

            addDoc(collection(db, "timesale"), {
                ...flashData,
                discountPrice: disCount,
                flashQuantity: fquantity,
                discountPercenage: disPer,
            })
                .then(setOpenl(true))
        } else {
            alert("Please Fill All Fields ....!!")
        }
        // .then(setTimeout(() => {
        //   history.go(0)
        // }, 2000))
    };


    const submitDraft = async (e) => {
        e.preventDefault();

        if (imageUrl !== "") {
            await setDoc(doc(db, "draft", uid), {
                otherCategory: category,
                // category: checked,
                name: PackageName,
                // image: imageUrl,
                // spec: spec,
                rate: rate,
                // rating: rating,
                // quantity: quantity,
                // color: selectedColor,
                // size: checkedSize,
                description: description,
                // Brand: category1,
                // subcat: subcat,
                // subcat1: subcat1,
                id: uid,
                discountPrice: discountPrice,
                discountPercentage: discountPer,
                numberOfChats: chatsQuantity,
                numberOfCards: cardsQuantity
            })
                .then(navigation.push("/model"));
        }
    };



    React.useEffect(() => {
        const collectionPackage = collection(db, "CategoryBrand");

        const unsub1 = onSnapshot(collectionPackage, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPackage(data);
        });

        return unsub1;
    }, []);

    React.useEffect(() => {
        const collectionPackage = collection(db, "MainCategory");

        const unsub2 = onSnapshot(collectionPackage, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPackage2(data);
            // setPackage4(data);
        });

        return unsub2;
    }, []);

    React.useEffect(() => {
        const collectionPackage = collection(db, "Package");

        const unsub3 = onSnapshot(collectionPackage, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPackage3(data);
        });

        return unsub3;
    }, []);



    const SelectPackage = () => {
        filterCategory.map((data) =>
            category1 == data.name ? setFlashData(data) : null
        );
        // console.log("cat1", category1)
    };
    const SelectCategory = () => {
        setFilterCategory(Package3.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === category2) { return data } } }));
    };

    const del = (e) => {
        e.preventDefault();
        navigation.push("/model");
        // setPackageName()
    };


    // const [checked, setChecked] = useState([])
    // const [checked, setChecked] = useState({

    // })



    // const handleChange = (e) => {
    //   const value = e.target.value;
    //   setChecked({
    //     ...checked,
    //     [e.target.value]: value
    //   })
    // };
    // const handleChange = (e) => {
    //   // const value = e.target.value;
    //   setChecked([...checked, e.target.value])
    // };

    const [checked, setChecked] = React.useState([]);

    const handleChange = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    // console.log("checked", checked)



    const handleDiscount = (e, rate) => {
        // console.log(">>>>>>r", rate)
        // console.log(">>>>>>re", e.target.value)
        // var discountValue = rate * ((100 - e.target.value) / 100)
        // var discountValue = rate / (e.target.value / 100)
        var discountValue = rate - (rate * e.target.value / 100)
        setDisPer(e.target.value)
        setDisCount(discountValue);
        // console.log(">>>>>>re", discountValue)
    }

    const handleDiscountPackage = (e, rate) => {
        // console.log(">>>>>>r", rate)
        // console.log(">>>>>>re", e.target.value)
        // var discountValue = rate * ((100 - e.target.value) / 100)
        // var discountValue = rate / (e.target.value / 100)
        var discountValuePackage = ((rate - e.target.value) / rate) * 100

        setDiscountPer(discountValuePackage.toFixed())
        setDiscountPrice(e.target.value);
        // console.log(">>>>>>re", discountValue)
    }


    const handleUID = (e) => {
        Package3.length ?
            Package3.filter(data => {
                if (data.id == e.target.value) {
                    setAvailableID(data.id)
                } else {
                    setUid(e.target.value)
                }
            })
            :
            setUid(e.target.value)
    }


    // console.log("che>>>>", checked)
    // const [TestingPro, setTestingPro] = React.useState([]);

    // React.useEffect(() => {
    //   const collectionPackage = collection(db, "testing");

    //   const unsub3 = onSnapshot(collectionPackage, (snapshot) => {
    //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //     setTestingPro(data);
    //   });

    //   return unsub3;
    // }, []);

    // const AddAllPackageSale = () => {
    //   const docRef = doc(db, 'testing', doc.id);
    //   const payload = { ...TestingPro, disrate: 123, disper: 4 };
    //   updateDoc(docRef, payload);
    // }



    // const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    //   <a
    //     href=""
    //     ref={ref}
    //     onClick={(e) => {
    //       e.preventDefault();
    //       onClick(e);
    //     }}
    //   >
    //     {children}
    //     &#x25bc;
    //   </a>
    // ));



    // const CustomMenu = React.forwardRef(
    //   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    //     const [value, setValue] = useState('');

    //     return (
    //       <div
    //         ref={ref}
    //         style={style}
    //         className={className}
    //         aria-labelledby={labeledBy}
    //       >
    //         <FormControl
    //           autoFocus
    //           className="mx-3 my-2 w-auto"
    //           placeholder="Type to filter..."
    //           onChange={(e) => setValue(e.target.value)}
    //           value={value}
    //         />
    //         <ul className="list-unstyled">
    //           {React.Children.toArray(children).filter(
    //             (child) =>
    //               !value || child.props.children.toLowerCase().startsWith(value),
    //           )}
    //         </ul>
    //       </div>
    //     );
    //   },
    // );







    // console.log('checkedSize', checkedSize)

    return (
        <>
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-evenly" }}>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title style={{ display: "inline" }} as="h4">
                                        Add Package Form
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row >
                                            <Col md="6">
                                                {/* <Form.Group>
                                                    <label>Package Id</label>
                                                    <Form.Control
                                                        placeholder="Package Id"
                                                        type="text"
                                                        onInput={(e) => handleUID(e)}
                                                    />
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Package Id">
                                                    <Form.Control
                                                        placeholder="Package Id"
                                                        type="text"
                                                        onInput={(e) => handleUID(e)}
                                                    />
                                                </FloatingLabel>

                                            </Col>
                                            <Col md="6">
                                                {/* <Form.Group>
                                                    <label>Id Exists</label>
                                                    <Form.Control
                                                        placeholder="Please Change Your Id If Displayed Here"
                                                        type="text"
                                                        disabled
                                                        defaultValue={availableID}
                                                    />
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Id Exists">
                                                    <Form.Control
                                                        placeholder="Please Change Your Id If Displayed Here"
                                                        type="text"
                                                        disabled
                                                        defaultValue={availableID}
                                                    // onChange={(e) => handleUID(e)}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col md="12">
                                                {/* <Form.Group>
                                                    <label>Package Name</label>
                                                    <Form.Control
                                                        placeholder="Package Name"
                                                        type="text"
                                                        maxLength={45}
                                                        onChange={(e) => setPackageName(e.target.value)}
                                                    />
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Package Name">
                                                    <Form.Control
                                                        placeholder="Package Name"
                                                        type="text"
                                                        maxLength={45}
                                                        onChange={(e) => setPackageName(e.target.value)}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row>


                                            <Col md="4">
                                                {/* <Form.Group>
                                                    <label>Price</label>
                                                    <Form.Control
                                                        placeholder="Price"
                                                        type="number"
                                                        onChange={(e) => setRate(parseInt(e.target.value))}
                                                    />
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Price">
                                                    <Form.Control
                                                        placeholder="Price"
                                                        type="number"
                                                        onChange={(e) => setRate(parseInt(e.target.value))}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="4">
                                                {/* <Form.Group>
                                                    <label>Discount Price</label>
                                                    <Form.Control
                                                        placeholder="Discount Price"
                                                        maxLength="2"
                                                        type="number"
                                                        onChange={(e) => handleDiscountPackage(e, rate)}
                                                    // onChange={(e) => setDiscountPer(e.target.value)}
                                                    />
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Discount Price">
                                                    <Form.Control
                                                        placeholder="Discount Price"
                                                        maxLength="2"
                                                        type="number"
                                                        onChange={(e) => handleDiscountPackage(e, rate)}
                                                        disabled={rate ? false : true}
                                                    // onChange={(e) => setDiscountPer(e.target.value)}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col md="4">
                                                {/* <Form.Group>
                                                    <label>Discount Percentage</label>
                                                    <Form.Control
                                                        placeholder="Discount Percentage"
                                                        type="number"
                                                        disabled
                                                        defaultValue={discountPer}
                                                    // ={rate - (rate * discountPer / 100)}
                                                    // onChange={(e) => setRate(e.target.value)}
                                                    />
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Discount Percentage">
                                                    <Form.Control
                                                        placeholder="Discount Percentage"
                                                        maxLength="2"
                                                        type="number"
                                                        disabled
                                                        defaultValue={discountPer}
                                                        onChange={(e) => handleDiscountPackage(e, rate)}
                                                    // onChange={(e) => setDiscountPer(e.target.value)}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>

                                        <Row>
                                            {/* <Col className="pl-1" md="12">
                                                <Form.Group>
                                                    <label>Model/Spec</label>
                                                    <Form.Control
                                                        placeholder="Model/Spec"
                                                        type="text"
                                                        onChange={(e) => setSpec(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="12">
                                                <Form.Group>
                                                    <label>Quantity</label>
                                                    <Form.Control
                                                        placeholder="Quantity"
                                                        type="text"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(parseInt(e.target.value.replace(/\D/g, '')))}
                                                    />
                                                </Form.Group>
                                            </Col> */}
                                            <Col md="12">
                                                {/* <Form.Group>
                                                    <label>Main Category Name</label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        value={category}
                                                    >
                                                        <option>Select Main Category</option>
                                                        {Package2.map((data) => (
                                                            <option value={data.category}>
                                                                {data.category}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group> */}
                                                <FloatingLabel controlId="floatingId" label="Main Category Name">
                                                    <Form.Control
                                                        as="select"
                                                        onClick={(e) => setCategory(e.target.value)}
                                                        value={category}
                                                        placeholder='text'
                                                    >
                                                        {Package2.length > 0 ?

                                                            Package2.map((data) => (
                                                                <option value={data.category}>
                                                                    {data.category}
                                                                </option>
                                                            ))
                                                            :
                                                            <option>No Categories Added</option>

                                                        }
                                                    </Form.Control>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row md={6}>
                                            <Col >

                                                <FloatingLabel controlId="floatingCards" label="Cards Count">
                                                    <Form.Control type="text" placeholder="Enter The Number Of Cards User Will Swipe"
                                                        onChange={(e) => setCardsQuantity(e.target.value)}
                                                        defaultValue={cardsQuantity}

                                                    />
                                                </FloatingLabel>
                                            </Col>
                                            <Col >

                                                <FloatingLabel controlId="floatingChats" label="Chats Count">
                                                    <Form.Control type="text" placeholder="Enter The Number Of Chats User Can Have"
                                                        onChange={(e) => setChatsQuantity(e.target.value)}
                                                        defaultValue={chatsQuantity}

                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Brand Category</label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={(e) => setCategory1(e.target.value)}
                                                        value={category1}
                                                    >
                                                        <option>Select Brand Category</option>
                                                        {Package.map((data) => (
                                                            <option value={data.category}>
                                                                {data.category}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Sub Category Name</label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={(e) => setSubCat(e.target.value)}
                                                        value={subcat}
                                                    >
                                                        <option>Sub Category</option>
                                                        <option value="BestSaleItem">Best Sale Item</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Sub Category Name</label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={(e) => setSubCat1(e.target.value)}
                                                        value={subcat1}
                                                    >
                                                        <option>Sub Category</option>
                                                        <option value="NewArrival">New Arrival</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row> */}
                                        {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '2% 1%' }}>
                                            <Card.Title style={{ display: "inline" }} as="h4">
                                                Is this Package Have Colour ?
                                            </Card.Title>
                                            <Switch
                                                checked={checkedShow}
                                                onChange={handleChangeCheckedShow}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </div> */}
                                        {/* {

                                            checkedShow === true ?
                                                <Row>

                                                    <Col md='12'>

                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            {selectedColor.map(data => (

                                                                <div
                                                                    className='area'
                                                                    style={{
                                                                        backgroundColor: data,
                                                                        padding: '20px',
                                                                        width: '25px',
                                                                        marginBottom: '3%',
                                                                        marginLeft: '10%'
                                                                    }}
                                                                >

                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div
                                                            style={{
                                                                backgroundColor: colorState,
                                                                padding: '15px',
                                                                width: '96%',
                                                                borderRadius: '20px',
                                                                margin: '2% 2%',
                                                            }}
                                                        >
                                                        </div>
                                                        <Tippy interactive={true} placement={'bottom'} content={
                                                            <SketchPicker
                                                                color={selectedColor}
                                                                onChangeComplete={color => setColorState(color.hex)}
                                                            />
                                                        }>

                                                            <Button
                                                                variant="light"
                                                                style={{ width: '100%', fontSize: '10px', marginRight: '2%', marginBottom: '2%' }}
                                                            >Pick Colour</Button>

                                                        </Tippy>
                                                        <Button
                                                            variant="light"
                                                            style={{ width: '50%', fontSize: '10px', }}
                                                            onClick={() => setSelectedColor([...selectedColor, colorState])}
                                                        >Select Colour</Button>
                                                        <Button
                                                            variant="light"
                                                            style={{ width: '50%', fontSize: '10px', }}
                                                            onClick={() => setSelectedColor([])}
                                                        >Remove Colour</Button>
                                                    </Col>
                                                </Row>
                                                : null
                                        } */}




                                        {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '2% 1%' }}>
                                            <Card.Title style={{ display: "inline" }} as="h4">
                                                Is this Package Have Size ?
                                            </Card.Title>
                                            <Switch
                                                checked={checkedShowSize}
                                                onChange={handleChangeCheckedShowSize}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </div> */}
                                        {/* {

                                            checkedShowSize === true ?
                                                <Row>
                                                    <Col md='12'>
                                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                            {['Small', 'Extra-Small', 'Medium', 'Large', 'Extra-Large'].map((value) => {
                                                                const labelId = `checkbox-list-label-${value}`;

                                                                return (
                                                                    <ListItem
                                                                        key={value}
                                                                        // secondaryAction={
                                                                        //   <IconButton edge="end" aria-label="comments">
                                                                        //     <CommentIcon />
                                                                        //   </IconButton>
                                                                        // }
                                                                        disablePadding
                                                                    >
                                                                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                                            <ListItemIcon>
                                                                                <Checkbox
                                                                                    edge="start"
                                                                                    checked={checkedSize.indexOf(value) !== -1}
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
                                                    </Col>
                                                </Row>
                                                : null
                                        } */}


                                        <Row>
                                            <Col md="12">
                                                <Form.Group >
                                                    <label>Package Description</label>

                                                    <ReactQuill
                                                        value={description}
                                                        onChange={(e) => setDescription(e)}
                                                        formats={AddPackages.formats}
                                                        modules={AddPackages.modules}
                                                        placeholder="Write description"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="col-lg-6 " style={{ marginTop: "2%" }}>

                                            {/* <input
                                                type="file"
                                                multiple
                                                hidden={"hidden"}
                                                id="imageInput"
                                            // onChange={(e) => setPackageImage(e.target.files)}
                                            // onChange={(e) => handlePackageImage(e)}
                                            /> */}
                                            {/* <RMIUploader
                                                isOpen={visible}
                                                hideModal={hideModal}
                                                onSelect={onSelect}
                                                // onSelect={handlePackageImage}
                                                // onChange={(e) => handlePackageImage(e)}
                                                onUpload={onUpload}
                                                onRemove={onRemove}
                                                dataSources={dataSources}
                                            /> */}
                                            <Col className=" col-lg-4">
                                                <Button
                                                    type="submit"
                                                    onClick={(e) => submit(e)}
                                                    className="btn-fill"
                                                    variant="info"
                                                // style={{ marginRight: "5%" }}
                                                >
                                                    Add Package
                                                </Button>
                                            </Col>
                                            {/* <Col className="col-lg-6">

                                                <Button
                                                    type="submit"
                                                    onClick={(e) => submitDraft(e)}
                                                    className="btn-fill "
                                                    variant="info"
                                                // style={{ marginRight: "5%" }}
                                                >
                                                    Move To Draft
                                                </Button>
                                            </Col> */}
                                        </Row>
                                        <Snackbar
                                            open={open}
                                            autoHideDuration={6000}
                                            onClose={handleClose}
                                            message="Image Upload"
                                            action={action}
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div style={{

                    // border: '1px solid green',
                    width: '35%',
                    // display: 'inline-block',
                    // flexDirection: "column",
                }}>
                    <div>

                        {/* <Card
                            style={{
                                width: "100%"
                            }}
                            sx={{ maxWidth: 180 }}
                            className="cardSli"
                        >
                            
                            <CardContent>
                                <div className="artypo">
                                    <Typography variant="body2" gutterBottom component="span">
                                        {PackageName}
                                    </Typography>

                                </div>
                                <div className="disdiv">

                                    <div className="discount-f">

                                        <span
                                            style={{ color: "coral", fontWeight: "bold" }}
                                            className="textf"
                                        >{discountPrice ? <>
                                            Rs.{discountPrice}
                                        </>
                                            : <>
                                                Rs.{rate}
                                            </>
                                            }
                                        </span>
                                    </div>
                                    {discountPrice ?
                                        <div className="discountf">
                                            <span className="disratef" style={{ textDecorationLine: 'line-through' }}>
                                                {discountPrice ? <>
                                                    RS.{rate}
                                                </>
                                                    :
                                                    <>
                                                        RS.{discountPrice}
                                                    </>
                                                }
                                            </span>
                                            <span className="disperf" style={{ marginLeft: '5%' }}>-{discountPer}%</span>
                                        </div> : null
                                    }
                                </div>

                            </CardContent>
                        </Card> */}

                        <Card className="text-center">
                            <Card.Header>{category}</Card.Header>
                            <Card.Body>
                                <Card.Title>{PackageName}</Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{ __html: description }}>
                                    {/* {description} */}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Row className="">

                                    <Col
                                        style={{ color: "coral", fontWeight: "bold" }}
                                        className=""
                                    >{discountPrice ? <>
                                        Rs.{discountPrice}
                                    </>
                                        : <>
                                            Rs.{rate}
                                        </>
                                        }
                                    </Col>
                                </Row>
                                {discountPrice ?
                                    <Row className="col-lg-12">
                                        <Col className="col-lg-12" style={{ textDecorationLine: 'line-through' }}>
                                            {discountPrice ?
                                                <>
                                                    RS.{rate}
                                                </>
                                                :
                                                <>
                                                    RS.{discountPrice}
                                                </>
                                            }
                                        </Col>
                                        <Col className="col-lg-12" >-{discountPer}%</Col>
                                    </Row> : null
                                }
                            </Card.Footer>
                        </Card>
                    </div>
                    {/* <div style={{
                        height: '260px',
                        overflowY: 'scroll',
                        width: "100%"
                    }}>
                        <Card
                            style={{
                                width: "100%"
                            }}
                            sx={{ maxWidth: 180 }}
                            className="cardSli"
                        >
                            <CardContent>
                                <div className="artypo">

                                    <label ><b>Other Category Name</b></label>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {Package2.map((value) => {
                                            const labelId = `checkbox-list-label-${value.category}`;

                                            return (
                                                <ListItem
                                                    key={value.category}
                                                    disablePadding
                                                >
                                                    <ListItemButton role={undefined} onClick={handleChange(value.category)} dense>
                                                        <ListItemIcon>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={checked.indexOf(value.category) !== -1}
                                                                tabIndex={-1}
                                                                disableRipple
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={labelId} primary={value.category} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>


                                </div>
                            </CardContent>

                        </Card>
                    </div> */}
                </div>

            </div>
            {/* <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Flash Sale Form</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Select Main Category</label>
                        <Form.Control
                          as="select"
                          onChange={(e) => setCategory2(e.target.value)}
                          value={category2}
                        >
                          <option>Select Main Category</option>
                          {Package2.map((data) => (
                            <option value={data.category}>
                              {data.category}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Select Package</label>
                        <Form.Control
                          as="select"
                          onChange={(e) => setCategory1(e.target.value)}
                          value={category1}
                        >
                          <option>Select Package</option>
                          {filterCategory.map((data) => (
                            <option value={data.name}>{data.name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          placeholder="Price"
                          type="number"
                          defaultValue={flashData.rate}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Available Quantity</label>
                        <Form.Control
                          placeholder="Available Quantity"
                          type="number"
                          disabled
                          defaultValue={flashData.quantity}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Quantity</label>
                        <Form.Control
                          placeholder="Quantity"
                          type="number"
                          onChange={(e) => setFquantity(parseInt(e.target.value))}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Discount Rate</label>
                        <Form.Control
                          placeholder="Discount Rate"
                          type="number"
                          disabled
                          defaultValue={disCount}

                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Discount Percentage</label>
                        <Form.Control
                          placeholder="Discount Percentage"
                          type="number"
                          onChange={(e) => handleDiscount(e, flashData.rate)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div style={{ marginTop: "2%" }}>
                    <Button
                      onClick={AddSale}
                      className="btn-fill pull-right"
                      variant="info"
                      style={{ marginRight: "5%" }}
                    >
                      Add Sale
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      variant="info"
                      onClick={() => SelectCategory()}
                      style={{ marginRight: "5%" }}
                    >
                      Select Category
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      variant="info"
                      onClick={() => SelectPackage()}
                    >
                      Select Package
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
            <Stack spacing={2} sx={{ width: '100%' }}>
                {/* <Button variant="outlined" onClick={handleClick}>
                      Open success snackbar
                    </Button> */}
                <Snackbar open={openl} autoHideDuration={2000} onClose={handleClosel}>
                    <Alert onClose={handleClosel} severity="success" sx={{ width: '100%' }}>
                        Sale Added Successfully!
                    </Alert>
                </Snackbar>
                {/* <Snackbar open={openl} autoHideDuration={3000} onClose={handleClosel}>
                    <Alert onClose={handleClosel} severity="error" sx={{ width: '100%' }}>
                      Please Login!
                    </Alert>
                  </Snackbar> */}
                {/* <Alert severity="error">This is an error message!</Alert>
                    <Alert severity="warning">This is a warning message!</Alert>
                    <Alert severity="info">This is an information message!</Alert>
                    <Alert severity="success">This is a success message!</Alert> */}
            </Stack>
            {/* <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Sale To All Packages</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                  </Row>
                  <Row>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Discount Percentage</label>
                        <Form.Control
                          placeholder="Discount Percentage"
                          type="number"
                          onChange={(e) => handleDiscount(e, flashData.rate)}
                        onChange={(e) => setDisPer(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div style={{ marginTop: "2%" }}>
                    <Button
                      onClick={AddAllPackageSale}
                      className="btn-fill pull-right"
                      variant="info"
                      style={{ marginRight: "5%" }}
                    >
                      Add Sale
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
        </>
    );
}



AddPackages.formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

AddPackages.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}


export default AddPackages;