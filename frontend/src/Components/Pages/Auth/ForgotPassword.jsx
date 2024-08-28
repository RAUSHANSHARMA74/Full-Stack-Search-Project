import React, { useState } from 'react'
import { postApi } from '../../Api/Api';
import Swal from 'sweetalert2';

export default function ForgotPassword() {
    const [email, setEmail] = useState({
        email: ""
    })
    const handleChangeEmail = (e) => {
        let { value, id } = e.target;
        setEmail((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleForgotSubmitEmail = async (event) => {
        event.preventDefault();
        const response = await postApi("/api/auth/forgotPassword", email)
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
            });
        }
    }
    return (
        <div className="forgot_password bg-[#CADCFC]  h-[92vh] w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <form onSubmit={handleForgotSubmitEmail} class="w-full border border-black dark:bg-gray-800 dark:border-gray-700 rounded-lg p-12 mx-auto max-w-2xl lg:py-16">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" value={email.email} onChange={handleChangeEmail} aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" />
                <button type="submit" class="text-white bg-blue-700 mt-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Forgot Link</button>
            </form>

        </div>
    )
}
