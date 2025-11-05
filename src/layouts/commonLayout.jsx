import { Outlet } from "react-router-dom"
import Header from "../pages/user/component/Header"
import Footer from "../pages/user/component/Footer"
import WhatsAppWidget from "../component/WhatsAppWidget"
import { Fragment } from "react"
import TopHeader from "../container/TopHeader"

export const CommonLayout = () => {
    return (
        <Fragment>
            <TopHeader/>
            <Header />
            <Outlet />
            <Footer />
            <WhatsAppWidget />
        </Fragment>
    )
}