'use client'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa"
import { MdError } from "react-icons/md";
import { IoWarningSharp } from "react-icons/io5";
const Toastify = () => {
    return (
        <ToastContainer
            icon={({ type }) => {
            // theme is not used in this example but you could
            switch (type) {
                case 'info':
                return <FaInfoCircle className="text-indigo-400" />;
                case 'error':
                return <MdError className="text-red-500" />;
                case 'success':
                return <FaCheckCircle className="text-green-500" />;
                case 'warning':
                return <IoWarningSharp className="text-yellow-500" />;
                default:
                return null;
            }
            }}
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}
export default Toastify;