import React from 'react'
import logo from "../../image/Logo.png";
import './DashBoard.css'
import { useTranslation } from "react-i18next";

export default function DashBoard() {

  const [t, il8n] = useTranslation();

  return <>
    <div className="main d-flex justify-content-center align-items-center mh-100">
      <div className="container">
        <div className="nav d-flex justify-content-between align-items-center bg-light p-2">
          
          <div className="logo mb-1 ms-2">
            <img src={logo} alt="" />
          </div>

          <div>
            <div className="nav-search d-flex justify-content-center align-items-center">
              <li className="nav-item-search search ms-auto d-flex justify-content-center align-items-center">
                <div className="input-group w-100 ps-0">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control text-white ps-0 searchInput py-2"
                    id="search"
                    placeholder={t("search")}
                  />
                </div>  
              </li>
              <button className='btn btn-primary border-start ms-2'>filter</button> 
            </div>
          </div>

          <div className="profile-logo me-3">
              <div className='accImage text-black d-flex justify-content-center align-items-center bg-primary'>
                <span className='m-0 p-0'>O</span>
              </div>
            </div>  

        </div>

        <table class="table ms-0">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Acceptance</th>
              <th scope="col">
                Acceptance
              </th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Accept</td>
                <td>
                  <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>

            </tr>
            <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Accept</td>
                <td>
                  <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>

            </tr>
            <tr>
                <td>Larry the Bird</td>
                <td>Accept</td>
                <td>@twitter</td>
                <td>Amdin</td>
                <td>
                  <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
            </tr>

          </tbody>
          
        </table>

      </div>
    </div>
  </>
}
