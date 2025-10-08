// import Sidebar from "../container/Sidebar";
// import Header from "../container/Header";
// import PageContent from "../container/PageContent";
// import TopHeader from "./TopHeader";

// const Layout = () => {
//     return (
//         <div className="Layout-container">
//             <Sidebar role="admin" />
//             <div className="Layout-right-container">
//                 {/* <TopHeader/>
//                 <Header /> */}
//                 <PageContent />
//             </div>
//         </div>
//     );
// };

// export default Layout;


import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import PageContent from "./PageContent";

const Layout = () => {
    const [shrink_sidebar, setShrinkSidebar] = useState(false);

    useEffect(() => {
        document.body.classList.add("no-scroll");

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    return (
        <div className="client-container">
            <Sidebar shrink_sidebar={shrink_sidebar} />
            <div className="client-right-container flex-grow-1">
                <Header shrink_sidebar={shrink_sidebar} setShrinkSidebar={setShrinkSidebar} />
                <Outlet />
                <PageContent />
            </div>
        </div>
    );
};

export default Layout;
