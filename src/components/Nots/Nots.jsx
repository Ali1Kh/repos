import React, { useEffect, useState } from 'react'
import "./Nots.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


export default function Nots() {
    const [notes, setnotes] = useState([]);

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const authToken = localStorage.getItem("token");

    useEffect(() => {
        getAddNotes();
    }, []);

    const getAddNotes = () => {
        axios
            .get('https://meetingss.onrender.com/notes/', {
                headers: {
                    token: authToken,
                },
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setnotes(response.data.notes)
                } else {
                    // Handle failure
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const postAddNotes = () => {
        axios
            .post('https://meetingss.onrender.com/notes/', {
                title: title,
                content: content,
            }, {

                headers: {
                    token: authToken,

                },
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setTitle("");
                    setContent("");
                } else {
                    // Handle failure
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const postUpdateNotes = () => {
        axios
            .patch('https://meetingss.onrender.com/notes/', {
                title: title,
                content: content,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    // Handle success
                } else {
                    // Handle failure
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const DeleteNotes = () => {
        axios
            .delete('https://meetingss.onrender.com/notes/', {
                title: title,
                content: content,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    // Handle success
                } else {
                    // Handle failure
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center p-4'>Notes</h1>
                    <div className="row gy-3">
                        {Array.isArray(notes) && notes.length > 0 ? (
                            notes.map((note, idx) => (
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
                                                    <h2>{note.title}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='noContent d-flex justify-content-center align-items-center' >No notes available.</p>
                        )}
                    </div>
                </div>
                <div className='note-icon' onClick={handleShow}>
                    <i class="fa-solid fa-notes-medical"></i>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Content"
                            />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={() => { handleClose(); postAddNotes(); }}>
                        Save
                    </Button>
                    <Button variant="danger" onClick={() => { handleClose(); DeleteNotes(); }}>
                        Delete
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
