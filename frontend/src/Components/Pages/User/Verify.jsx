import React, { useEffect, useState } from 'react';
import "../../../App.css";
import { useLocation } from 'react-router-dom';
import { postApi } from '../../Api/Api';
import Swal from 'sweetalert2';

export default function Verify() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const verify = queryParams.get('verify');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await postApi("/api/auth/verify", { token: verify });
                console.log(response);
                if (response.status === 200) {
                    Swal.fire({
                        title: "Good job!",
                        text: response.message,
                        icon: "success"
                    }).then(() => {
                        window.location.href = "/users";
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.message || "An error occurred during login.",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    }).then(() => {
                        window.location.href = "/login";
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred during login.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [verify]);

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen bg-[#CADCFC]">
                    <span className="loader"></span>
                </div>
            ) : null}
        </>
    );
}
