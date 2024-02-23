import React from 'react'
import "./Nots.css"

export default function Nots() {
    let nots = [
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
    ];
    return (
        <>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center p-4'>Nots</h1>
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
                                    >
                                        <div className="inner-card position-relative h-100 shadow rounded-4 gap-4 p-4 flex-column">
                                            <div className="guest-info d-flex flex-column align-items-center">
                                                <div className="guest-icon-profile d-flex justify-content-center align-items-center me-3 mb-2 mt-2 ms-3"
                                                    style={{ width: "50px", height: "150px" }}>
                                                    <div className='star-icon position-absolute'>
                                                        <i class="fa-regular fa-star"></i>
                                                    </div>
                                                    <div className="text-black d-flex justify-content-center align-items-center">
                                                        <h2>Title</h2>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="details position-absolute">

                                    </div>
                                </>
                            ))
                            : ""}
                    </div>
                </div>
                <div className='note-icon'>
                    <i class="fa-solid fa-notes-medical"></i>
                </div>
            </div>
        </>
    )
}
