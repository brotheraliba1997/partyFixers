import React from 'react'
import {
    Image,
    Modal,
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Form,
    Dropdown,
    Button,
    DropdownButton,
    ButtonGroup,
    Row,
    Card,
    Badge,
    Col,
  } from "react-bootstrap";

function NotiPreCurrentPopop({showModal , handleCloseModal , showPrevDetails, prevDetails ,currentDetails, handleShowPreviousDetails ,handleUserDetailAccepted ,handleUserDetailDecline   }) {
  return (
    <div> 
          <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header
      closeButton
      style={{ marginTop: "-30px" }}
      className="d-flex justify-between "
    >
      <Modal.Title className="Notification-Title">
        {!showPrevDetails
          ? "Current Changes From User"
          : "Previous Details Of User"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {prevDetails ? (
        <Container>
          {!showPrevDetails ? (
            <div className="Notification_images d-flex justify-center items-center">
              <div>
                <Image
                  className="img-thumbnail"
                  src={
                    currentDetails?.userChangeDetails?.postImg
                      ? currentDetails.userChangeDetails.postImg
                      : prevDetails.postImg
                  }
                />
              </div>
              <div>
                <div>
                  Name:{" "}
                  {currentDetails?.userChangeDetails?.FirstName
                    ? currentDetails.userChangeDetails.FirstName
                    : "Not Mentioned"}
                </div>

                <div>
                  age:{" "}
                  {currentDetails?.userChangeDetails?.Age
                    ? currentDetails.userChangeDetails.Age
                    : "Not Mentioned"}
                </div>

                <div>
                  Account Type:{" "}
                  {currentDetails?.userChangeDetails?.AccountType
                    ? currentDetails.userChangeDetails.AccountType
                    : "Not Mentioned"}
                </div>

                <div>
                  Address:{" "}
                  {currentDetails?.userChangeDetails?.Address
                    ? currentDetails.userChangeDetails.Address
                    : "Not Mentioned"}
                </div>

                <div>
                  Contact Number:{" "}
                  {currentDetails?.userChangeDetails?.ContactNumber
                    ? currentDetails.userChangeDetails.ContactNumber
                    : "Not Mentioned"}
                </div>

                <div>
                  Description:{" "}
                  {currentDetails?.userChangeDetails?.Description
                    ? currentDetails.userChangeDetails.Description
                    : "Not Mentioned"}
                </div>

                <div>
                  Email:{" "}
                  {currentDetails?.userChangeDetails?.Email
                    ? currentDetails.userChangeDetails.Email
                    : "Not Mentioned"}
                </div>

                <div>
                  Gender:{" "}
                  {currentDetails?.userChangeDetails?.Gender
                    ? currentDetails.userChangeDetails.Gender
                    : "Not Mentioned"}
                </div>

                <div>
                  Height:{" "}
                  {currentDetails?.userChangeDetails?.Height
                    ? currentDetails.userChangeDetails.Height
                    : "Not Mentioned"}
                </div>

                <div>
                  Postal Code:{" "}
                  {currentDetails?.userChangeDetails?.PostalCode
                    ? currentDetails.userChangeDetails.PostalCode
                    : "Not Mentioned"}
                </div>

                <div>
                  Religion:{" "}
                  {currentDetails?.userChangeDetails?.Religion
                    ? currentDetails.userChangeDetails.Religion
                    : "Not Mentioned"}
                </div>

                <div>
                  Time Period:{" "}
                  {currentDetails?.userChangeDetails?.TimePeriod
                    ? currentDetails.userChangeDetails.TimePeriod
                    : "Not Mentioned"}
                </div>
              </div>
            </div>
          ) : (
            <div className="Notification_images d-flex justify-center items-center">
              <div>
                {prevDetails?.postImg ? (
                  <Image
                    className="img-thumbnail"
                    src={prevDetails.postImg}
                  />
                ) : (
                  <h3>No Image To Display!</h3>
                )}
              </div>

              <div>
                <div>
                  {" "}
                  Name:{" "}
                  {prevDetails?.FirstName
                    ? prevDetails?.FirstName
                    : "Not Mentioned"}
                </div>
                <div>
                  Age:{" "}
                  {prevDetails?.Age
                    ? prevDetails?.Age
                    : "Not Mentioned"}
                </div>
                <div>
                  Account Type:{" "}
                  {prevDetails?.AccountType
                    ? prevDetails?.AccountType
                    : "Not Mentioned"}
                </div>
                <div>
                  Address:{" "}
                  {prevDetails?.Address
                    ? prevDetails?.Address
                    : "Not Mentioned"}
                </div>
                <div>
                  Contact Number:{" "}
                  {prevDetails?.ContactNumber
                    ? prevDetails?.ContactNumber
                    : "Not Mentioned"}
                </div>
                <div>
                  Description:{" "}
                  {prevDetails?.Description
                    ? prevDetails?.Description
                    : "Not Mentioned"}
                </div>
                <div>
                  Email:{" "}
                  {prevDetails?.Email
                    ? prevDetails?.Email
                    : "Not Mentioned"}
                </div>
                <div>
                  Gender:{" "}
                  {prevDetails?.Gender
                    ? prevDetails?.Gender
                    : "Not Mentioned"}
                </div>
                Height:{" "}
                {prevDetails?.Height
                  ? prevDetails?.Height
                  : "Not Mentioned"}
                <div></div>
                <div>
                  Postal Code:{" "}
                  {prevDetails?.PostalCode
                    ? prevDetails?.PostalCode
                    : "Not Mentioned"}
                </div>
                <div>
                  Religion:{" "}
                  {prevDetails?.Religion
                    ? prevDetails?.Religion
                    : "Not Mentioned"}
                </div>
                <div>
                  Time Period:{" "}
                  {prevDetails?.TimePeriod
                    ? prevDetails?.TimePeriod
                    : "Not Mentioned"}
                </div>
              </div>
            </div>
          )}
        </Container>
      ) : (
        <Container className="d-flex justify-content-center">
          <h3> User Does Not Exists!</h3>
        </Container>
      )}
    </Modal.Body>

    <Modal.Footer>
      <Button
        style={{ width: "100%" }}
        className="my-3"
        variant="info"
        onClick={handleShowPreviousDetails}
      >
        Show {!showPrevDetails ? "Previous" : "Current"} Details
      </Button>
      <Button variant="success" onClick={handleUserDetailAccepted}>
        Accept
      </Button>
      <Button variant="danger" onClick={handleUserDetailDecline}>
        Decline
      </Button>
    </Modal.Footer>
  </Modal>
  </div>
  )
}

export default NotiPreCurrentPopop