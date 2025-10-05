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
                path: "/dashboard",
                icon: <MdOutlineDashboard size={18} />,
                name: "Dashboard",
            }
        ]
    },
    {
        name: "Trip Management",
        subMenu: [
            {
                path: "/dashboard/tour-list",
                icon: <SlPlane size={18} />,
                name: "Add New Trip",
            },
            {
                path: "/dashboard/destination-list",
                icon: <IoLocationOutline size={18} />,
                name: "Add Destination",
            },
            {
                path: "/dashboard/activity",
                icon: <SiJordan size={18} />,
                name: "Add Actvity",
            },
            {
                path: "/dashboard/category-create",
                icon: <TbCategoryPlus size={18} />,
                name: "Add Categories",
            },
            {
                path: "/dashboard/create-tour-type",
                icon: <MdOutlineAddLocationAlt size={18} />,
                name: "Destination Type",
            },
            
            // {
            //     path: "/dashboard",
            //     icon: <LuCompass size={18} />,
            //     name: "Categories",
            // },
            // {
            //     path: "/dashboard",
            //     icon: <CiLocationOn size={18} />,
            //     name: "Destinations",
            // },
            // {
            //     path: "/dashboard",
            //     icon: <CiCalendar size={18} />,
            //     name: "Itineraries",
            // }
        ]
    },
    {
        name: "Travel Crm",
        subMenu: [
            {
                path: "/dashboard/lead-management",
                icon: <SlPlane size={18} />,
                name: "Lead Management",
            },
            // {
            //     path: "/dashboard/destination-list",
            //     icon: <IoLocationOutline size={18} />,
            //     name: "Booking Mangement",
            // },
            {
                path: "/dashboard/quotation-management",
                icon: <SiJordan size={18} />,
                name: "Quotation Mangement",
            },
            {
                path: "/dashboard/invoice-management",
                icon: <TbCategoryPlus size={18} />,
                name: "Invoice Mangement",
            },
        ]
    },
    {
        name: "Settings",
        subMenu: [
            {
                path: "/dashboard/global-settings",
                icon: <SlPlane size={18} />,
                name: "Global Settings",
            },
        ]
    },
    
    // {
    //     name: "Inventory",
    //     subMenu: [
    //         {
    //             path: "/dashboard",
    //             icon: <LiaHotelSolid size={18} />,
    //             name: "Hotels",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <PiPulseLight size={18} />,
    //             name: "Activities",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <LiaCarSideSolid size={18} />,
    //             name: "Cab Booking",
    //         }
    //     ]
    // },
    // {
    //     name: "Sales & Marketing",
    //     subMenu: [
    //         {
    //             path: "/dashboard",
    //             icon: <BsPeople size={18} />,
    //             name: "Leads",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <GrDocumentText size={18} />,
    //             name: "Quotations",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <AiOutlinePercentage size={18} />,
    //             name: "Offers & Coupons",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <HiOutlineSpeakerphone size={18} />,
    //             name: "Banners",
    //         }
    //     ]
    // },
    // {
    //     name: "Content & SEO",
    //     subMenu: [
    //         {
    //             path: "/dashboard",
    //             icon: <PiNotePencilThin size={18} />,
    //             name: "CMS",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <IoSearchOutline size={18} />,
    //             name: "SEO Settings",
    //         }
    //     ]
    // },
    // {
    //     name: "Communication",
    //     subMenu: [
    //         {
    //             path: "/dashboard",
    //             icon: <CiMail size={18} />,
    //             name: "Email Marketing",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <PiWhatsappLogoThin size={18} />,
    //             name: "Whatsapp Marketing",
    //         }
    //     ]
    // },
    //  {
    //     name: "System",
    //     subMenu: [
    //         {
    //             path: "/dashboard",
    //             icon: <IoSettingsOutline size={18} />,
    //             name: "Settings",
    //         },
    //         {
    //             path: "/dashboard",
    //             icon: <FiUserPlus size={18} />,
    //             name: "User & Roles",
    //         }
    //     ]
    // },
]


export const AdminMenu = [
    {
        path: "/admin/admin-dashboard",
        icon: <i class="fa-solid fa-grip"></i>,
        name: "Dashboard",
    },
    {
        path: "",
        icon: <i className="fa-solid fa-suitcase-rolling"></i>,
        name: "Trip Management",
        subMenu: [
            {
                path: "/admin/destination-list",
                icon: <span class="material-symbols-outlined">
                    distance
                </span>,
                name: "Destinations",
            },
            {
                path: "/admin/activity",
                icon: <span class="material-symbols-outlined">hiking</span>,
                name: "Activities",
            },
            {
                path: "/admin/tour-list",
                icon: <span class="material-symbols-outlined">
                    connecting_airports
                </span>,
                name: " All Trips",
            },
            {
                path: "/admin/category-create",
                icon: <span class="material-symbols-outlined">
                    bus_railway
                </span>,
                name: "Categories",
            },
            {
                path: "/admin/create-tour-type",
                icon: <span class="material-symbols-outlined">
                    checked_bag_question
                </span>,
                name: "Trip Type",
            },
        ],
    },
    {
        path: "",
        icon: <i class="fa-brands fa-microblog"></i>,
        name: "Blogs Management",
        subMenu: [
            {
                path: "/admin/tag-blogs",
                icon: <span class="material-symbols-outlined">
                    add_comment
                </span>,
                name: "Blog Tag",
            },
            {
                path: "/admin/categories-blog",
                icon: <span class="material-symbols-outlined">
                    dynamic_feed
                </span>,
                name: "Blog Category",
            },
            {
                path: "/admin/blogs-List",
                icon: <span class="material-symbols-outlined">
                    article_person
                </span>,
                name: "Blogs",
            },

        ],
    },

    {
        path: "/admin/lead-management",
        icon: <i class="fa-solid fa-circle-user"></i>,
        name: "Lead Management",
    },
    {
        path: "/admin/quote-builder",
        icon: <i class="fa-solid fa-money-bill-trend-up"></i>,
        name: "QuoteBuilder",
    },
    {
        path: "/admin/global-settings",
        icon: <i class="fa-solid fa-gear"></i>,
        name: "GlobalSettings",
    },
    {
        path: "",
        icon: <i class="fa-solid fa-warehouse"></i>,
        name: "Inventory",
        subMenu: [
            {
                path: "/admin/not-available-1",
                icon: <span class="material-symbols-outlined">
                    hotel
                </span>,
                name: "Hotels",
            },
            {
                path: "/admin/not-available-2",
                icon: <span class="material-symbols-outlined">
                    person_play
                </span>,
                name: "Activities",
            },
            {
                path: "/admin/not-available-3",
                icon: <span class="material-symbols-outlined">
                    local_taxi
                </span>,
                name: "Cab Bookings",
            },

        ],
    },
    {
        path: "",
        icon: <i class="fa-brands fa-adversal"></i>,
        name: "Sales & Marketing",
        subMenu: [
            {
                path: "/admin/not-available",
                icon: <span class="material-symbols-outlined">
                    diversity_3
                </span>,
                name: "Leads",
            },
            {
                path: "/admin/not-available",
                icon: <span class="material-symbols-outlined">
                    format_quote
                </span>,
                name: "Quotations",
            },
            {
                path: "/admin/not-available",
                icon: <span class="material-symbols-outlined">
                    featured_seasonal_and_gifts
                </span>,
                name: "Offers & Coupons",
            },
            {
                path: "/admin/not-available",
                icon: <span class="material-symbols-outlined">
                    local_atm
                </span>,
                name: "Banners",
            },

        ],
    },
    {
        path: "",
        icon: <i class="fa-solid fa-newspaper"></i>,
        name: "Sales & Marketing",
        subMenu: [
            {
                path: "/admin/not-available",
                icon: <span class="material-symbols-outlined">
                    contract_edit
                </span>,
                name: "CMS",
            },
            {
                path: "/admin/not-available",
                icon: <span class="material-symbols-outlined">
                    search_gear
                </span>,
                name: "SEO Settings",
            },
        ],
    },
    {
        path: "",
        icon: <i class="fa-solid fa-walkie-talkie"></i>,
        name: "Communication",
        subMenu: [
            {
                path: "/admin/not-available",
                icon: <i class="fa-solid fa-envelope-circle-check"></i>,
                name: "Email Marketing",
            },
            {
                path: "/admin/not-available",
                icon: <i class="fa-brands fa-whatsapp"></i>,
                name: "Whatsapp Marketing",
            },
        ],
    }, {
        path: "",
        icon: <i class="fa-solid fa-gears"></i>,
        name: "System Settings",
        subMenu: [
            {
                path: "/admin/not-available",
                icon: <i class="fa-solid fa-wrench"></i>,
                name: "Settings",
            },
            {
                path: "/admin/not-available",
                icon: <i class="fa-solid fa-circle-user"></i>,
                name: "User Roles",
            },
        ],
    },
]

export const UserMenu = [
    {
        path: "/user/user-dashboard",
        icon: <span className="material-symbols-outlined">dashboard_2
        </span>,
        name: "Dashboard",
    },
]

