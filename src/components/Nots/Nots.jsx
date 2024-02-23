import React, { useState } from 'react'
import "./Nots.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export default function Nots() {
    const nots = [{}, {}, {}, {}, {}, {}, {}];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    


    return (
        <>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center p-4'>Notes</h1>
                    <div className="row gy-3">

                        {nots
                            ? nots.map((not, idx) => (
                                <>
                                    <div
                                        key={idx}
                                        className="inner-parent col-lg-3 px-lg-3 col-md-12 col-sm-12 mt-4 animate__animated animate__fadeIn animate__slower"
                                        data-aos="fade-up"
                                        data-aos-delay="500"
                                        data-aos-once="true"
                                        onClick={handleShow}
                                    >
                                        <div className="inner-card position-relative h-100 shadow rounded-4 gap-4 p-4 flex-column">
                                            <div className="guest-info d-flex flex-column align-items-center">
                                                <div className="guest-icon-profile d-flex justify-content-center align-items-center me-3 mb-2 mt-2 ms-3"
                                                    style={{ width: "50px", height: "150px" }}>
                                                    <div className="text-black d-flex justify-content-center align-items-center">
                                                        <h2>Title</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            ))
                            : ""}
                    </div>
                </div>
                <div className='note-icon' onClick={handleShow}>
                    <i class="fa-solid fa-notes-medical"></i>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Add Notes</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                id='title'
                                type="text"
                                placeholder="Title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control
                                id='Content'
                                as="textarea" rows={3}
                                placeholder="Content"
                            />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
