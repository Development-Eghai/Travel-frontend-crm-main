
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AdminMenu, UserMenu } from "../routes/SidebarMenus";

const Sidebar = ({ role = "admin" }) => {
    const [openSubmenus, setOpenSubmenus] = useState({});
    const { pathname } = useLocation()
    const getBasePath = (path) => {
        const parts = path.split('/');
        return parts.length > 2 ? `/${parts[1]}/${parts[2].split("-")[0]}` : path;
    };
    const menus = role === "admin" ? AdminMenu : UserMenu;

    const toggleSubmenu = (index) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className={`sidebar-container-main ${role === "admin" ? 'bg-white' : 'bg-white'}`}>
            <h4 className="mb-4 text-white admin-panel-head-text">Admin Panel</h4>
            <ul className="nav flex-column">
                {menus.map((item, index) => (
                    <li key={item.path || index} className="nav-item">
                        {item.subMenu ? (
                            <>
                                <button
                                    className={`nav-link w-100 d-flex justify-content-between sidebar-menu border-none 
                                         ${location.pathname === item.path ? "active" : ""}`}
                                    onClick={() => toggleSubmenu(index)}
                                >
                                    <div className="d-flex">
                                        <p className="my-auto">{item.icon}</p>
                                        <p className="ms-2">{item.name}</p>
                                    </div>
                                    <div>
                                        <i className={`fa-solid ${openSubmenus[index] ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                    </div>
                                </button>

                                <div className={`collapse ${openSubmenus[index] ? "show" : ""}`}>
                                    <ul className="submenu-list ms-3">
                                        {item.subMenu.map((sub, subIndex) => {
                                            const basePath = getBasePath(sub.path);
                                            const isActive = pathname.startsWith(basePath);
                                            return (
                                                <NavLink
                                                    to={sub.path} className={`text-decoration-none`} key={sub.path || subIndex}>
                                                    <li className={`nav-item submenu-menus ${isActive ? "active" : ""
                                                        }`} key={sub.path || subIndex}>

                                                        <span className="me-2 sidebar-icon">{sub.icon}</span>
                                                        <span> {sub.name}</span>
                                                    </li>
                                                </NavLink>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <NavLink
                                to={item.path}
                                className={` d-flex sidebar-menu align-items-center ${location.pathname === item.path ? "active" : ""
                                    }`}
                            >
                                <p className="sidebar-icon">{item.icon}</p>
                                <span className="ms-2">{item.name}</span>
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
