import Sidebar from "../container/Sidebar";
import Header from "../container/Header";
import PageContent from "../container/PageContent";
import TopHeader from "./TopHeader";

const Layout = () => {
    return (
        <div className="Layout-container">
            <Sidebar role="admin" />
            <div className="Layout-right-container">
                {/* <TopHeader/>
                <Header /> */}
                <PageContent />
            </div>
        </div>
    );
};

export default Layout;
