import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Swal from "sweetalert2";

import { removeUser } from "../authService";

import Loading from "../../component/Loading";

function Logout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logout = "/assets/gif/logout.gif";

    const handleLogout = async () => {
    const result = await Swal.fire({
        imageUrl: logout,
        imageWidth: 150,
        imageHeight: 150,
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

    if (!result.isConfirmed) {
        return;
    }

    try {
        setLoading(true);

        removeUser();

        await Swal.fire({
            icon: "success",
            title: "Logged Out",
            text: "You have been logged out successfully.",
            timer: 1200,
            showConfirmButton: false,
        });

        navigate("/");
    } finally {
        setLoading(false);
    }
};

    return (
        <>
        <button
            type="button"
            onClick={handleLogout}
        >
            Logout
        </button>
        {loading && <Loading />}
        </>
        
    );
}

export default Logout;