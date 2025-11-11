import React from 'react';
import { NavLink } from 'react-router-dom';
// Ensure this path is correct for your menu data structure
import { ClientMenu } from '../routes/SidebarMenus'; 

const Sidebar = ({
    shrink_sidebar
}) => {

    return (
        // Apply 'shrink' class dynamically
        <div className={`client-sidebar d-none d-lg-block ${shrink_sidebar ? "shrink" : ""}`}>
            <div className="sidebar-header">
                <img src="/logo-indian-mountain-rovers.png" alt="Indian Mountain Rovers" className="sidebar-logo" />
            </div>
            <div className="sidebar-body">
                {ClientMenu?.map((item, i) => {
                    return (
                        <div key={i} className="sidebar-item py-2">
                            {/* Hides the group name when shrunk */}
                            <div className={`sidebar-content-heading ${shrink_sidebar ? "d-none" : ""}`}>
                                {item.name}
                            </div>
                            {item?.subMenu?.map((sub, j) => (
                                <NavLink 
                                    to={sub.path} 
                                    key={j} 
                                    // ps-4 adds left padding in expanded state
                                    className="row sidebar-body-content ps-4 py-2"
                                >
                                    <span className="col-1">
                                        {/* Icon column */}
                                        {sub.icon}
                                    </span>
                                    {/* Hides the item name when shrunk */}
                                    <span className={`col ps-3 ${shrink_sidebar ? "d-none" : ""}`}>
                                        {sub.name}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Sidebar;