import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { postApi } from '../../Api/Api';

export default function ChangePassword() {
    const [changePassword, setChangePassword] = useState({
        password: "",
        confirm_password: ""
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resetPasswordToken = queryParams.get('resetPasswordToken');

    const handleChangePassword = (e) => {
        let { value, id } = e.target;
        setChangePassword((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmitChangePassword = async (event) => {
        event.preventDefault();
        if (changePassword.password != changePassword.confirm_password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Confirm password is not Match",
            });
        } else {
            let change = { password: changePassword.password, token: resetPasswordToken }
            const response = await postApi("/api/auth/changePassword", change)
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

    }

    return (
        <div className="change_password">
            <section className=" bg-[#CADCFC] ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmitChangePassword} action="#">
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input type="password" name="password" id="password" value={changePassword.password} onChange={handleChangePassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm_password" value={changePassword.confirm_password} onChange={handleChangePassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
