import React, { useState } from "react";
import "./Notes.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import $ from "jquery";
import { Link } from "react-router-dom";
import MeetingDetails from "../manager/meetingDetails/meetingDetails";

export default function Nots() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState();
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authToken = localStorage.getItem("token");

  let [data, setData] = useState([]);

  let { isLoading } = useQuery("getNotes", getNotes);

  async function getNotes() {
    try {
      let { data } = await axios.get("https://meetingss.onrender.com/notes/", {
        headers: {
          token: authToken,
        },
      });
      handleClose();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const postAddNotes = () => {
    if (title === "" || content === "") {
      toast.error("Please Fill All Inputs", {
        style: {
          zIndex: 9999,
        },
      });
      return;
    }
    axios
      .post(
        "https://meetingss.onrender.com/notes/",
        {
          title: title,
          content: `[{"insert":"${content}\\n"}]`,
        },
        {
          headers: {
            token: authToken,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success("Note Added Successfully");
          getNotes();
        } else {
          // Handle failure
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const patchUpdateNotes = () => {
    if (title === "" || content === "") {
      toast.error("Please Fill All Inputs", {
        style: {
          zIndex: 9999,
        },
      });
      return;
    }

    axios
      .patch(
        `https://meetingss.onrender.com/notes/${id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            token: authToken,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success("Note Updated Successfully");
          getNotes();
          handleClose();
        } else {
          toast.error("Something went Wrong!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
        if (response.data.success) {
          toast.success("Note Deleted Successfully");

          getNotes();
        } else {
          // Handle failure
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function convertNote(note) {
    let convertedNote = JSON.parse(note.replaceAll("\n", "")).map(
      (item, index) => {
        const { insert, attributes } = item;
        let styles = {};
        if (attributes) {
          if (attributes.bold) {
            styles.fontWeight = "bold";
          }
          if (attributes.italic) {
            styles.fontStyle = "italic";
          }
          if (attributes.color) {
            styles.color = attributes.color;
          }
        }

        return (
          <span key={index} style={styles}>
            {insert}
          </span>
        );
      }
    );

    return convertedNote;
  }

  return (
    <>
      <div className="main">
        <div className="container mt-5">
          <h1 className="container d-flex flex-column align-items-center justify-content-center p-4">
            Notes
          </h1>
          <div className="row gy-3 p-5 pt-0">
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "65vh" }}
              >
                <TailSpin
                  visible={true}
                  height="90"
                  width="90"
                  color="var(--sec-color)"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <>
                {data.notes?.length > 0 ? (
                  data.notes?.map((note, idx) => (
                    <>
                      <div
                        key={idx}
                        className="inner-parent col-lg-3 px-lg-3 col-md-12 col-sm-12 mt-4 animate__animated animate__fadeIn animate__slower"
                        data-aos="fade-up"
                        data-aos-delay="500"
                        data-aos-once="true"
                        onClick={() => {
                          handleShow();
                          setContent($("#note" + note.notes_id).text());
                          setTitle(note.title);
                          setId(note.notes_id);
                          setType("update");
                        }}
                      >
                        <div className="inner-card-notes h-100 shadow rounded-4 gap-4 p-4 flex-column">
                          <div className="box d-flex  flex-column h-100">
                            <h5>{note.title}</h5>
                            <div className="text-black d-flex mt-2 align-items-center  overflow-hidden">
                              <p id={`note${note.notes_id}`}>
                                {convertNote(note.content)}
                              </p>
                            </div>
                            <div className="text-black d-flex mt-2 align-items-center">
                              <a
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                data-bs-toggle="modal"
                                data-bs-target={`#meetingModal${note.meeting_id}`}
                                className="mb-3 cursorPointer"
                              >
                                {note.meeting_id ? (
                                  <a> Show Meeting Note</a>
                                ) : (
                                  ""
                                )}
                              </a>
                            </div>

                            <small className="note-createdAt mt-auto">
                              {new Date(note.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                      {note.meeting_id ? (
                        <>
                          {" "}
                          <div
                            className="details position-absolute"
                            style={{ zIndex: 99999999 }}
                          >
                            <MeetingDetails meetingsDetails={note.Meeting} />
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ))
                ) : (
                  <p className="noContent d-flex justify-content-center align-items-center">
                    No notes available.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <div
          className="note-icon"
          onClick={() => {
            handleShow();
            setType("new");
          }}
        >
          <i className="fa-solid fa-notes-medical"></i>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} style={{ zIndex: 9998 }}>
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
          {type === "new" ? (
            <Button
              variant="primary"
              onClick={() => {
                postAddNotes();
              }}
            >
              Save
            </Button>
          ) : type === "update" ? (
            <Button
              variant="primary"
              onClick={() => {
                patchUpdateNotes();
              }}
            >
              Update
            </Button>
          ) : (
            ""
          )}

          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              DeleteNotes();
            }}
          >
            Delete
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
