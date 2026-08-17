import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../component/footer";
import Navbar from "../../component/navBar";
import Sidebar from "../../component/sideBar";

import { getUser } from "../../services/authService";

import Swal from "sweetalert2";

function HomePage() {
    const navigate = useNavigate();
    const login = "/assets/gif/loginplease.gif";

    const user = getUser();

    useEffect(() => {
        if (!user) {
            Swal.fire({
                imageUrl: login,
                imageWidth: 150,
                imageHeight: 150,
                title: "Login Required",
                text: "Please login to access this page.",
                confirmButtonText: "Go to Login",
                customClass: {
                    popup: "login-swal-popup",
                },
            }).then(() => {
                navigate("/");
            });
        }
    }, [navigate, user]);

    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">

            <Navbar
                userName={`${user.firstname} ${user.lastname}`}
                onSearch={(value) => searchFiles(value)}
            />

            {/* <Sidebar
                userName={`${user.firstname} ${user.lastname}`}
                folders={folders}
                activePage="home"
                onNavigate={(page) => console.log("Navigate:", page)}
                onFolderSelect={(folder) => console.log("Folder:", folder)}
            /> */}

            <Footer />

        </div>
    );
}

export default HomePage;