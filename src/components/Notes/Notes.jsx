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
    const [id, setId] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const authToken = localStorage.getItem("token");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
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
                    setContent("")
                    setTitle("")
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
                    getNotes();
                } else {
                    // Handle failure
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const patchUpdateNotes = () => {
        axios
            .patch(`https://meetingss.onrender.com/notes/${id}`, {
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
            .delete(`https://meetingss.onrender.com/notes/${id}`, {
                headers: {
                    token: authToken,
                },
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    getNotes();
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
                                    onClick={() => { handleShow(); setContent(note.content); setTitle(note.title); setId(note.notes_id) }}
                                >
                                    <div className="inner-card position-relative h-100 shadow rounded-4 gap-4 p-4 flex-column">
                                        <div className="guest-info d-flex flex-column align-items-center">
                                            <div className="guest-icon-profile d-flex justify-content-center align-items-center me-3 mb-2 mt-2 ms-3"
                                                style={{ width: "50px", height: "150px" }}>
                                                <div className="box">
                                                    <h2>{note.title}</h2>
                                                    <div className="text-black d-flex justify-content-center align-items-center">
                                                        <p>{note.content}</p>
                                                    </div>
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
                    <i className="fa-solid fa-notes-medical"></i>
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    { id ? <Button variant="primary" onClick={() => { handleClose(); postAddNotes(); }}>
                        Save
                    </Button>
                    :<Button variant="primary" onClick={() => { patchUpdateNotes() }}>
                        Edit
                    </Button>}
                    
                    <Button variant="danger" onClick={() => { handleClose(); DeleteNotes(); }}>
                        Delete
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
