import "./sidebar.css"
import logo from '../../image/Logo small.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Sidebar = () => {
    return (
        <>
            <div className='sidebar shadow'>
                <img src={logo} alt="Logo" />
                <div className="container">
                    <div className="header-side">
                        <h6><a><span className="text-center"><i class="fa-solid fa-house"></i></span><span>Home</span></a></h6>
                        <h6><a><i class="fa-regular fa-calendar-days"></i><span>Calendar</span></a></h6>
                        <h6><a><i class="fa-regular fa-bell"></i><span>Notification</span></a></h6>
                        <h6><a><i class="fa-solid fa-plus"></i><span>create meeting</span></a></h6>
                        <h6><a><i class="fa-solid fa-handshake"></i><span>meetings</span></a></h6>
                    </div>
                    <div className="setting-side">
                        <h6><a><i class="fa-solid fa-gear"></i><span>settings</span></a></h6>
                        <h6><a><i class="fa-solid fa-arrow-right-to-bracket"></i><span>Logout</span></a></h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
