import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoginForm from '../Login/LoginForm';

const Home = () => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleLoginClick = () => {
        setShowModal(true); // Open the modal when login button is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal when close button is clicked
    };

    return (
        <div className="d-flex flex-column justify-content-center" style={{ height: "100%" }}>
            <div className="welcomeTextWrapper">
                <svg>
                    <text className="welcomeText" x="35%" y="50%">
                        ABCMon ©
                    </text>
                </svg>
            </div>
            <div>
                <Button className="loginButton" variant="light" onClick={handleLoginClick}>
                    Login
                </Button>
            </div>

            {/* Modal for LoginForm */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;
