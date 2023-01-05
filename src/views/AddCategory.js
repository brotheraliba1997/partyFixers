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
  FloatingLabel
} from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { doc, setDoc, collection, addDoc, } from "firebase/firestore";
// import ImageUploading from "react-images-uploading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from "../config/firebase";
import { RMIUploader } from "react-multiple-image-uploader";




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


export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('')
  const [mainCategory, setMainCategory] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState([]);
  const [productImage, setProductImage] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState('')
  const [textDes, setTextDes] = React.useState('')


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

  const submit = async (e) => {
    e.preventDefault();
    setOpen(true)
    const cate = categoryName.toLocaleUpperCase()
    await addDoc(collection(db, "CategoryBrand"), {
      category: cate,

    }).then({
    })
    setCategoryName('')

  };

  const submit2 = async () => {
    setOpen(true)
    const maincate = mainCategory.toLocaleUpperCase();
    await addDoc(collection(db, 'MainCategory'), {
      category: maincate,
      // image: imageUrl,
      description: textDes,
    })
  }
  // const submit3 = async () => {
  //   setOpen(true)
  //   const subcate = mainCategory.toLocaleUpperCase()
  //   await addDoc(collection(db, 'SubCategory'), {
  //     category: maincate
  //   })
  // }
  const storage = getStorage();

  // const uploadImage = async () => {
  //   const fileInput = document.getElementById("imageInput");
  //   fileInput.click();
  // };

  // const uploadData = async () => {
  //   const storeRef = ref(storage, `productImage/${productImage.name}`);
  //   await uploadBytes(storeRef, productImage).then((snapshot) => {
  //     if (productImage != null) {
  //       setOpen(true);
  //     }
  //   });
  //   getDownloadURL(ref(storage, `productImage/${productImage.name}`)).then(
  //     (url) => {
  //       setImageUrl(url);
  //     }
  //   );
  // };

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
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
    setImageUrl('');
  };

  return (
    <div>
      <>
        <Container fluid>
          <Row>
            {/* <Col md="5">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Add Brand Category Form</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Category Name</label>
                          <Form.Control

                            placeholder="Category Name"
                            type="text"
                            onChange={(e) => setCategoryName(e.target.value)}
                          ></Form.Control>

                        </Form.Group>
                      </Col>
                    </Row>
                    <div>
                      <Button
                        onClick={submit}
                        className="btn-fill pull-right"
                        variant="info"
                        style={{ marginRight: "5%" }}
                      >
                        Add Product
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Brand Category Add"
                        action={action}
                      />
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col> */}
            {/* </Row>
          <Row> */}
            <Col md="12" >
              <Card >
                <Card.Header>
                  <Card.Title as="h4">Add Main Category Form</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FloatingLabel className="pt-1" controlId="floatingName" label="Category Name">
                          <Form.Control type="text"
                            onChange={(e) => setMainCategory(e.target.value)}
                          />
                        </FloatingLabel>
                        <FloatingLabel className="pt-1" controlId="floatingTextarea2" label="Category Description">
                          <Form.Control
                            as="textarea"
                            style={{ height: '100px' }}
                            onChange={(e) => setTextDes(e.currentTarget.value)}
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <div>
                      <Button
                        onClick={submit2}
                        className="btn-fill pull-right"
                        variant="info"
                        style={{ marginRight: "5%" }}
                      >
                        Add Category
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Main Category Added"
                        action={action}
                      />
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Add Sub Category Form</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Category Name</label>
                          <Form.Control
                            placeholder="Category Name"
                            type="text"
                            onChange={(e) => setSubCategory(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div>
                      <Button
                          
                        className="btn-fill pull-right"
                        variant="info"
                        style={{ marginRight: "5%" }}
                      >
                        Add Product
                      </Button>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Sub Category Added"
                        action={action}
                      />
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row> */}
        </Container>
      </>
    </div>
  );
}
