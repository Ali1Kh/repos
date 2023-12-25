import "./sidebar.css"
import logo from '../../image/Logo-small.png'



const Sidebar = () => {
    return (
        <>
            <div className='sidebar shadow'>
                <img src={logo} alt="Logo" />
                <div className="container">
                    <div className="header-side">
                        <h6><a><span className="text-center"><i className="fa-solid fa-house"></i></span><span>Home</span></a></h6>
                        <h6><a><span className="text-center"><i className="fa-regular fa-calendar-days"></i></span><span>Calendar</span></a></h6>
                        <h6><a><span className="text-center"><i className="fa-regular fa-bell"></i></span><span>Notification</span></a></h6>
                        <h6><a><span className="text-center"><i className="fa-solid fa-plus"></i></span><span>create meeting</span></a></h6>
                        <h6><a><span className="text-center"><i className="fa-solid fa-handshake"></i></span><span>meetings</span></a></h6>
                    </div>
                    <div className="setting-side">
                        <h6><a><i className="fa-solid fa-gear"></i><span>settings</span></a></h6>
                        <h6><a><i className="fa-solid fa-arrow-right-to-bracket"></i><span>Logout</span></a></h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
