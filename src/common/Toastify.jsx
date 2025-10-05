import { Bounce, toast } from "react-toastify";

export const errorMsg = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
            background: "#fff",
            color: "rgb(214, 3, 3)",
        },
    });
};
export const successMsg = (message) => {
    toast.success(`${message}`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
            background: "#fff",
            color: "#05ab32",
        },
    });
};
export const warningMsg = (message) => {
    toast.warning(`${message}`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
            background: "#fff",
            color: "#dbb704",
        },
    });
};
