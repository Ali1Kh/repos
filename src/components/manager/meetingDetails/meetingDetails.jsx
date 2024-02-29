import "./meetingDetails.css";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import $ from "jquery";
export default function MeetingDetails({ meetingsDetails }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titleVal, setTitleVal] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authToken = localStorage.getItem("token");

  function viewPdf(e, id) {
    e.stopPropagation();
    $(`#pdfContainer${id}`).css("display", "block");
    $("body").css("overflow", "hidden");
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
        "https://meetingss.onrender.com/notes/336",
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
          toast.success("Note Added Successfully");
        } else {
          // Handle failure
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [t] = useTranslation();

  return (
    <div>
      <div
        className="modal fade"
        id={`meetingModal${meetingsDetails.meeting_id}`}
      >
        <div
          className="modal-dialog col-md-7 modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="inner-modal shadow rounded-4 p-4">
              <div
                className="icon d-flex justify-content-end"
                data-bs-dismiss="modal"
              >
                <i className="shadow fa-solid fa-xmark"></i>
              </div>
              <div className="meeting-topic m-3">
                <h2 className="BlackToWhite">{t("meetings.meetingDetails")}</h2>
              </div>
              <div className="container meeting-container">
                <div className="row g-md-5">
                  <div className="col-md-6">
                    <div className="col-ineer">
                      <span>{t("meetings.guestName")}</span>
                      <h5 className="mb-3">{meetingsDetails.person}</h5>
                      <span className="fw-normal">{t("meetings.topic")}</span>
                      <h5 className="mb-3">{meetingsDetails.about}</h5>
                      <span>{t("meetings.status")}</span>
                      <h5 className="mb-3">{meetingsDetails.statues}</h5>
                      <span>{t("meetings.Comments")}</span>
                      <h5 className="mb-3">{meetingsDetails.notes}</h5>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-ineer">
                      <span>{t("meetings.address")}</span>
                      <h5 className="mb-3">{meetingsDetails.address}</h5>
                      <span>{t("meetings.inOrOut")}</span>
                      <h5 className="mb-3">{meetingsDetails.in_or_out}</h5>
                      <span>{t("meetings.date")}</span>
                      <h5 className="mb-3">{meetingsDetails.date}</h5>
                      <span>{t("meetings.time")}</span>
                      <h5 className="mb-3">{meetingsDetails.time}</h5>
                      <div className="d-flex justify-content-center">
                        {meetingsDetails.attachmentLink ? (
                          <button
                            type="button"
                            onClick={(e) =>
                              viewPdf(e, meetingsDetails.meeting_id)
                            }
                            class="btn-meeting"
                          >
                            {t("meetings.btnShow")}
                          </button>
                        ) : (
                          ""
                        )}

                        <button
                          type="button"
                          class="btn-meeting"
                          onClick={() => {
                            handleShow();
                          }}
                        >
                          {t("meetings.btnAddNotes")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                value={titleVal}
                onChange={(e) => {setTitleVal(e.target.value) ; console.log("?");}}
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

          <Button
            variant="primary"
            onClick={() => {
              postAddNotes();
            }}
          >
            Save
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
