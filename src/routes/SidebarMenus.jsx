import { MdOutlineDashboard } from "react-icons/md";
import { SlPlane } from "react-icons/sl";
import { LuCompass } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { LiaHotelSolid } from "react-icons/lia";
import { PiPulseLight } from "react-icons/pi";
import { LiaCarSideSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlinePercentage } from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { PiNotePencilThin } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { SiJordan } from "react-icons/si";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineAddLocationAlt } from "react-icons/md";


export const ClientMenu = [
    {
        name: "overview",
        subMenu: [
            {
                path: "/admin",
                icon: <MdOutlineDashboard size={18} />,
                name: "Dashboard",
            }
        ]
    },
    {
        name: "Trip Management",
        subMenu: [
            {
                path: "/admin/tour-list",
                icon: <SlPlane size={18} />,
                name: "Add New Trip",
            },
            {
                path: "/admin/destination-list",
                icon: <IoLocationOutline size={18} />,
                name: "Add Destination",
            },
            {
                path: "/admin/activity",
                icon: <SiJordan size={18} />,
                name: "Add Actvity",
            },
            {
                path: "/admin/category-create",
                icon: <TbCategoryPlus size={18} />,
                name: "Add Categories",
            },
            {
                path: "/admin/create-tour-type",
                icon: <MdOutlineAddLocationAlt size={18} />,
                name: "Destination Type",
            },
            
            // {
            //     path: "/admin",
            //     icon: <LuCompass size={18} />,
            //     name: "Categories",
            // },
            // {
            //     path: "/admin",
            //     icon: <CiLocationOn size={18} />,
            //     name: "Destinations",
            // },
            // {
            //     path: "/admin",
            //     icon: <CiCalendar size={18} />,
            //     name: "Itineraries",
            // }
        ]
    },
    {
        name: "Travel Crm",
        subMenu: [
            {
                path: "/admin/lead-management",
                icon: <SlPlane size={18} />,
                name: "Lead Management",
            },
            // {
            //     path: "/admin/destination-list",
            //     icon: <IoLocationOutline size={18} />,
            //     name: "Booking Mangement",
            // },
            {
                path: "/admin/quotation-management",
                icon: <SiJordan size={18} />,
                name: "Quotation Mangement",
            },
            {
                path: "/admin/invoice-management",
                icon: <TbCategoryPlus size={18} />,
                name: "Invoice Mangement",
            },
        ]
    },
    {
        name: "Settings",
        subMenu: [
            {
                path: "/admin/global-settings",
                icon: <SlPlane size={18} />,
                name: "Global Settings",
            },
        ]
    },
    
    // {
    //     name: "Inventory",
    //     subMenu: [
    //         {
    //             path: "/admin",
    //             icon: <LiaHotelSolid size={18} />,
    //             name: "Hotels",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <PiPulseLight size={18} />,
    //             name: "Activities",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <LiaCarSideSolid size={18} />,
    //             name: "Cab Booking",
    //         }
    //     ]
    // },
    // {
    //     name: "Sales & Marketing",
    //     subMenu: [
    //         {
    //             path: "/admin",
    //             icon: <BsPeople size={18} />,
    //             name: "Leads",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <GrDocumentText size={18} />,
    //             name: "Quotations",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <AiOutlinePercentage size={18} />,
    //             name: "Offers & Coupons",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <HiOutlineSpeakerphone size={18} />,
    //             name: "Banners",
    //         }
    //     ]
    // },
    // {
    //     name: "Content & SEO",
    //     subMenu: [
    //         {
    //             path: "/admin",
    //             icon: <PiNotePencilThin size={18} />,
    //             name: "CMS",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <IoSearchOutline size={18} />,
    //             name: "SEO Settings",
    //         }
    //     ]
    // },
    // {
    //     name: "Communication",
    //     subMenu: [
    //         {
    //             path: "/admin",
    //             icon: <CiMail size={18} />,
    //             name: "Email Marketing",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <PiWhatsappLogoThin size={18} />,
    //             name: "Whatsapp Marketing",
    //         }
    //     ]
    // },
    //  {
    //     name: "System",
    //     subMenu: [
    //         {
    //             path: "/admin",
    //             icon: <IoSettingsOutline size={18} />,
    //             name: "Settings",
    //         },
    //         {
    //             path: "/admin",
    //             icon: <FiUserPlus size={18} />,
    //             name: "User & Roles",
    //         }
    //     ]
    // },
]

