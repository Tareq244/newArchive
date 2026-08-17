import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { removeUser } from "../authService";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await Swal.fire({
            icon: "question",
            title: "Logout",
            text: "Are you sure you want to logout?",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            customClass: {
                popup: "login-swal-popup",
            },
        });

        if (result.isConfirmed) {
            removeUser();

            await Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully.",
                timer: 1200,
                showConfirmButton: false,
            });

            navigate("/");
        }
    };

    return (
        <button 
        type="button"
        onClick={handleLogout} 
        >
            Logout
        </button>
    );
}

export default Logout;