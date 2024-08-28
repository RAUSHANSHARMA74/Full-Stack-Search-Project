import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { postApi } from '../../Api/Api';

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleChangeLogin = (e) => {
        let { value, id } = e.target;
        setLogin((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        try {
            let response = await postApi("/api/auth/login", login);
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response));
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
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.message || "An unexpected error occurred. Please try again later.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };
    return (
        <section className=" bg-[#CADCFC]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmitLogin}>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" value={login.email} onChange={handleChangeLogin} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" value={login.password} onChange={handleChangeLogin} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="/forgotpassword">
                                    <a href="" className="text-sm font-medium text-primary-600 hover:underline text-blue-600 dark:text-primary-500">Forgot password?</a>

                                </Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-teal-600 hover:bg-teal-700">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to="/register" >
                                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600">Sign up</a>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
