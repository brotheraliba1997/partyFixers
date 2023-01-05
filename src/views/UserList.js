import React, { useEffect, useState } from "react";
import db from "../config/firebase";
import {
  onSnapshot,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  limit,
  startAfter
} from "@firebase/firestore";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Image,

} from "react-bootstrap";
import NumberFormat from 'react-number-format';
import Stack from "@mui/material/Stack";
import ReactQuill from 'react-quill';
import emailjs from 'emailjs-com';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const UserList = () => {


  const [userTotal, setUserTotal] = useState()
  const [userTotal1, setUserTotal1] = useState()
  const [lastDoc, setLastDoc] = useState()
  const [isLoad, setIsULoad] = useState()
  const [isEmpty, setIsEmpty] = useState()
  const [description, setDescription] = React.useState("");
  const [sdata, setSdata] = useState(null);
  const [open, setOpen] = React.useState(false);



  UserList.formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  UserList.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }



  const handleClickOpen = (data) => {
    setOpen(true);
    // const details = data.userDetails.map(chats => {
    //   return chats;
    // })



    // setSdata(data);
    // setSdata(data.detail.map(data=>data));
    setSdata(data.userDetails);
    // setPdata(data)

    // setPdata(order);
    // console.log(detail.map((data) => data));
    // console.log("roder", order);
    // console.log('detail', data.detail)
    // return(

    // )
    // console.log("eye", data)
    // setSdata(data)
  };


  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const collectionProduct = collection(db, "users");

    const q = query(collectionProduct,
      limit(25));

    const q1 = query(collectionProduct);
    const unsub1 = onSnapshot(q1, (snapshot) => {
      const data1 = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let arr = []
      data1.map(item => {
        arr = arr.concat(item.email)
      })

      setUserTotal1(arr);
    });



    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      // dispatch(loginUserGet(data));
      setUserTotal(data);
      setLastDoc(lastDoc);
    });

    return unsub;
  }, []);


  const fetchMore = () => {
    setIsULoad(true)
    // useEffect(async () => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef,
      // orderBy("subcat", "asc"),
      startAfter(lastDoc),
      limit(25)
    );


    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {

        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setUserTotal(UserTotal => [...UserTotal, ...data]);
        // dispatch(bestData([...bestD, ...data]))
        // setIsLoad(false)
        setLastDoc(lastDoc);
      } else {
        setIsEmpty(true);
      }
      setIsULoad(false)
    });

    return unsub;

  }
  // console.log('userTotal', userTotal)
  function removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();

    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
  }


  const [Message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // const SendEmail = () => {
  //   // userTotal1.map(item=>{
  //   console.log(Message);

  //   var templateParams = {
  //     email: '',
  //     message: Message,
  //     image: selectedFile
  //   };

  //   emailjs.send('service_a0tlqkf', 'template_rtsvkbn', templateParams, 'user_ugj5oxo84z7DRFs40GT1n')
  //     .then(function (response) {
  //       console.log('SUCCESS!', response.status, response.text);
  //     }, function (error) {
  //       console.log('FAILED...', error);
  //     });

  //   // })
  // }

  return (
    // <div>
    <Col>
      {/* <Row>
        <Col md="12">
          <Form.Group >
            <label>
              Message
              <input type="text" onChange={e => setMessage(e.target.value)} />
            </label>
            <label>
              File
              <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
            </label>
            <input type="submit" value="Submit" onClick={SendEmail} />
          </Form.Group>

          <Form.Group >
            <label>Product Description</label>
            <Form.Control
              cols="90"
              placeholder="Here can be your description"
              rows="10"
              as="textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
            <ReactQuill
              value={description}
              onChange={(e) => setDescription(e)}
              // onChangeSelection={(e) => console.log(e)}
              // onChangeSelection={(e) => setDescription(e)}
              formats={UserList.formats}
              modules={UserList.modules}
              placeholder="Write description"
            />

            <Button
              type="submit"
              onClick={() => SendEmail()}
              className="btn-fill pull-right"
              variant="info"
              style={{ marginRight: "5%" }}
              disabled={removeTags(description) != "" ? false : true}>
              Send Email To All Users
            </Button>

          </Form.Group>

        </Col>
      </Row> */}
      <Card>
        <Card.Header>
          <Card.Title as="h4">Users List</Card.Title>
          <p className="card-category">Last Performance</p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          {/* <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div> */}
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0">User Name</th>
                <th className="border-0">User Email</th>
                <th className="border-0">Detailed Info</th>
                <th className="border-0">User Number</th>
                <th className="border-0">Gender</th>
              </tr>
            </thead>
            {userTotal ?
              <tbody>
                {userTotal.map((data, i) => (
                  <>
                    <tr
                      key={i}
                    >
                      <>
                        <td>
                          {data.userDetails.FirstName}
                        </td>
                        <td>{data.userDetails.Email}</td>
                        <td>
                          <VisibilityIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClickOpen(data)}
                          />
                        </td>
                        <td>{data.userDetails.ContactNumber}</td>
                        <td>{data.userDetails.Gender}</td>
                      </>
                    </tr>
                  </>
                ))}
              </tbody>
              : null
            }
          </Table>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"User Details Preview"}
            </DialogTitle>
            <DialogContent>

              <div
                style={{
                  display: "flex",
                  marginBottom: "5%",

                }}
              >


                <Image
                  style={{
                    width: "50%",

                    flexDirection: "column",
                    display: "flex",
                    textAlign: "center",
                  }}

                  src={sdata?.postImg}
                  alt="dataimage"
                />


                <div
                  style={{
                    // backgroundColor: "red",

                    width: '100%'
                  }}
                >


                  <div style={{ paddingLeft: "30px" }}>
                    <div style={{ display: "block", paddingBottom: "2px" }}>
                      Name: {sdata?.FirstName}
                    </div>

                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Description: {sdata?.Description}

                    </div>


                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >


                      Email: {sdata?.Email}

                    </div>
                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >


                      Age: {sdata?.Age}

                    </div>

                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Country: {sdata?.Country}

                    </div>
                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Height: {sdata?.Country}

                    </div>

                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Contact: {sdata?.ContactNumber}

                    </div>
                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Gender: {sdata?.Gender}

                    </div>
                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Postal Code: {sdata?.PostalCode}

                    </div>
                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Religion: {sdata?.Religion}

                    </div>
                    <div
                      style={{ display: "block", paddingBottom: "2px" }}
                      id="alert-dialog-description"
                    >
                      Want To Marry In: {sdata?.TimePeriod}

                    </div>

                  </div>
                </div>
              </div>


            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                close
              </Button>
            </DialogActions>
          </Dialog>

          <hr></hr>

          {!isEmpty && !isLoad &&

            <Stack

              style={{ margin: '3% 5%' }}
            >
              <Button

                className="btnLog-2" onClick={fetchMore}>
                Load More
              </Button>
            </Stack>
          }
          <div className="stats">
            <i className="fas fa-history"></i>
            In the last hour
          </div>
        </Card.Body>
      </Card>
    </Col>

  )
};
