import { BsLayoutSidebar } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { ClientMenu } from '../routes/SidebarMenus'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({
    shrink_sidebar, setShrinkSidebar
}) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setInnerWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className='client-header'>
            <div className='row justify-content-between'>
                <div className="col-6 col-lg-3 row align-items-center">
                    <div className="col-1">
                        <button className='sidebar-icon btn btn-outline-none' onClick={innerWidth < 992 ? null : () => setShrinkSidebar(!shrink_sidebar)} data-bs-toggle={innerWidth < 992 ? "offcanvas" : ""} data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                            <BsLayoutSidebar />
                        </button>
                    </div>
                    <div className="col ms-5">
                        <input type="text" className="form-control" placeholder="Search trips,hotels,leads..." style={{ width: "150%" }}/>
                    </div>
                </div>

                <div className="col-6 col-lg-2 d-flex align-items-center justify-content-end me-3">
                    {/* Bell Icon */}
                    <button className="sidebar-icon btn btn-outline-none me-3">
                        <GoBell />
                    </button>

                    {/* Dropdown */}
                    <div className="dropdown"> {/* <-- FIX */}
                        <a
                            className="d-flex align-items-center dropdown-toggle" /* <-- FIX */
                            href="#"
                            id="profileDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="profile"
                                className="rounded-circle" /* <-- FIX (This was the 'at img' error) */
                                width="30"
                                height="30"
                            />
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown"> {/* <-- FIX */}
                            <li><a className="dropdown-item" href="#">My Profile</a></li> {/* <-- FIX */}
                            <li><a className="dropdown-item" href="#">Settings</a></li> {/* <-- FIX */}
                            <li><a className="dropdown-item" href="#">Logout</a></li> {/* <-- FIX */}
                        </ul>
                    </div>

                </div>

            </div>

            {/* OFFCANVAS */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                <div className="offcanvas-header">
                    sidebar logo
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {ClientMenu?.map((item, i) => {
                        return (
                            <div key={i} className="sidebar-item py-2">
                                <div className={`sidebar-content-heading`}>
                                    {item.name}
                                </div>
                                {item?.subMenu?.map((sub, j) => (
                                    <NavLink to={sub.path} key={j} className="row sidebar-body-content ps-4 py-2" data-bs-dismiss="offcanvas">
                                        <span className="col-1">
                                            {sub.icon}
                                        </span>
                                        <span className={`col ps-3`}>
                                            {sub.name}
                                        </span>
                                    </NavLink>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header