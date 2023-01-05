import React from 'react';
// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
import logo from "assets/img/logo.png"
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
    Image,
} from "react-bootstrap";
import './Invoice.css'
import PrintIcon from '@mui/icons-material/Print';
import { useHistory } from "react-router";


import { useLocation } from 'react-router';

export const Invoice = () => {
    // const history = useHistory()
    const location = useLocation();
    // console.log(location)
    const invoiceData = location.state;

    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // });


    return (
        <div
            className='mainInvoice'
            style={{
                width: '96%',
                /* margin-left: 2%;
                margin-right: 2%; */
                margin: '2% 2%'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logo} width='20%' />
                <h2>INVOICE</h2>
            </div>
            <div style={{ marginBottom: '1%', marginTop: '4%', textAlign: 'center' }}>
                <h6>Customer's Detail</h6>
            </div>
            <hr style={{ height: '3px' }} />
            <div className='detailInvoice' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2%', marginTop: '2%' }}>
                <div >
                    <p>Name : <span>{invoiceData.user.fullname}</span></p>
                    <p>Contact Number : <span>{invoiceData.user.phone}</span></p>
                    <p>Email : <span>{invoiceData.user.email}</span></p>
                    <p>Address : <span>{invoiceData.address.address}</span></p>
                </div>
                <div>
                    <p>Order ID : <span>{invoiceData.orderId}</span></p>
                    <p>Date : <span>{invoiceData.date}</span></p>
                </div>
            </div>
            <hr style={{ height: '3px' }} />
            <div style={{ marginBottom: '1%', marginTop: '2%', textAlign: 'center' }}>
                <h6>Product Detail</h6>
            </div>
            <hr style={{ height: '3px' }} />
            <div style={{ marginTop: '3%' }}>
                <Table className="table-hover" style={{}}>
                    <thead>
                        <tr>
                            <th className="border-0">Product Name</th>
                            <th className="border-0">Quantity</th>
                            <th className="border-0">Price</th>
                            {/* <th className="border-0">SubTotal</th> */}
                        </tr>
                    </thead>
                    {/* {userTotal ? */}
                    <tbody>
                        {invoiceData.detail.map((data, i) => (
                            <>
                                <tr
                                // key={i}

                                >
                                    <>
                                        <td>
                                            {data.name}

                                        </td>
                                        <td>
                                            {data.count}

                                        </td>
                                        {data.discountPrice ?
                                            <td>
                                                {data.discountPrice}

                                            </td>
                                            :
                                            <td>
                                                {data.rate}

                                            </td>
                                        }

                                        {/* <td>
                                    
                                        dev
                                    </td> */}
                                    </>
                                </tr>
                            </>
                        ))}
                    </tbody>
                    {/* // : null */}
                    {/* } */}
                </Table>
            </div>
            <div style={{ textAlign: 'end' }}>
                <p>Total : Rs.{invoiceData.total}</p>
            </div>
            <div style={{ textAlign: 'end', cursor: 'pointer' }}>
                <PrintIcon sx={{ height: "30px", width: "30px" }}
                    onClick={() => print()}
                />
            </div>
            {/* <button onClick={handlePrint}>Print this out!</button> */}
        </div >
    );
};


// const Example = () => {
//     const componentRef = useRef();
//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//     });

//     return (
//         <div>
//             {/* <ComponentToPrint ref={componentRef} /> */}
//             {/* <button onClick={handlePrint}>Print this out!</button> */}
//         </div>
//     );
// };