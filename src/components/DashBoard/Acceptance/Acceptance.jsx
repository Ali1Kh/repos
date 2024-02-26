import React, { useState } from 'react';
import './Acceptance.css';
import toast from 'react-hot-toast';

const UserRow = ({ user, onAccept, onRemove }) => (
    <div key={user.email} className='row table justify-content-center'>
        <div className="col">{user.username}</div>
        <div className="col">{user.name}</div>
        <div className="col">{user.email}</div>
        <div className="col-4" >
            <i className="fa-solid fa-trash deletAcc" onClick={() => onRemove(user.email)}></i>
            <button className="btn accept-button" onClick={() => onAccept(user.email)}>
                Accept
            </button>
        </div>
    </div>
);

const Acceptance = () => {
    const [users, setUsers] = useState([
        { username: 'Mustafasalem', name: 'Mustafa Salem', email: 'mustafa@gmail.com' },
        { username: 'Ali', name: 'Ali soso', email: 'Ali@gmail.com' },
    ]);

    const handleAccept = (email) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
        toast.success('Accepted!');
    };

    const handleRemove = (email) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
        toast.success('Removed!');
    };


    return (
        <>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center p-4 fw-bold text-white'>Acceptance</h1>
                    <div className='row header-table justify-content-center'>
                        <div className="col">
                            <h6>Username</h6>
                        </div>
                        <div className="col">
                            <h6>Name</h6>
                        </div>
                        <div className="col">
                            <h6>Email</h6>
                        </div>
                        <div className="col">
                            <h6>Action</h6>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        {users.map((user) => (
                            <UserRow key={user.email} user={user} onAccept={handleAccept} onRemove={handleRemove} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Acceptance;

