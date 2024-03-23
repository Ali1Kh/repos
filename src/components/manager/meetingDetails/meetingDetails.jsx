import "./meetingDetails.css";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import $ from "jquery";
export default function MeetingDetails({ meetingsDetails }) {
  const [addNoteshow, setAddNoteShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [meetingId, setMeetingId] = useState();

  const handleClose = () => setAddNoteShow(false);
  const handleAddMeetingNoteShow = (meetId) => {
    setAddNoteShow(true);
    setMeetingId(meetId);
  };

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
          zIndex: "9989899999",
        },
      });
      return;
    }
    axios
      .post(
        `https://meetingss.onrender.com/notes/${meetingId}`,
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
        } else {
          // Handle failure
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [t] = useTranslation();

  useEffect(() => {
    $("body").click(() => {
      $(".pdfContainer").css("display", "none");
      $("body").css("overflow", "auto");
    });
  }, []);

  return (
    <div>
      <div
        className="meetingModal modal fade"
        id={`meetingModal${meetingsDetails.meeting_id}`}
        style={{ zIndex: 99952 }}
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
                          data-bs-dismiss="modal"
                          onClick={() => {
                            handleAddMeetingNoteShow(
                              meetingsDetails.meeting_id
                            );
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
      <div
        id={`pdfContainer${meetingsDetails.meeting_id}`}
        className="pdfContainer rounded-3 pt-5 overflow-auto container position-fixed start-50 translate-middle-x p-2"
        style={{
          width: "70%",
          height: "95vh",
          top: "25px",
          zIndex: 99999965699,
          display: "none",
        }}
      >
        <i
          style={{ backgroundColor: "#323639" }}
          className="fa fa-xmark rounded-3 me-3 position-absolute top-0 end-0 mb-5 p-2 fs-5 z-3 cursorPointer"
        ></i>
        <div className="pdfView h-100 w-100">
          <div
            className="pdfFrame d-"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="h-100">
              <iframe
                className="rounded-3"
                src={meetingsDetails.attachmentLink}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="addMeetingNoteModal"
        show={addNoteshow}
        onHide={handleClose}
        style={{ zIndex: 9999 }}
      >
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
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
              controlId="exampleForm.ControlTextarea11"
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
              handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
