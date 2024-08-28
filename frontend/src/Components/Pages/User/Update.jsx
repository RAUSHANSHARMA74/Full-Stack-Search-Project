import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApi, putApi } from '../../Api/Api';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';

export default function Update() {
    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem("token"));
    const [register, setRegister] = useState({
        first_name: "",
        last_name: "",
        email: "",
        domain: "",
        gender: "",
        avatar: "",
        available: false,
    });


    const verifyToken = async () => {
        try {
            let response = await getApi(`/api/users/${id}`, token.token);
            if (response.status === 401) {
                console.log({ message: "You are not authorized to see this content. Please log in." })

            }
            setRegister(response.data)
        } catch (error) {
            console.log({ message: "An error occurred. Please try again later." })
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const handleChangeRegister = (e) => {
        let { value, id } = e.target;
        if (id == "available" && value == "true") value = true;
        else if (id == "available" && value == "false") value = false;

        setRegister((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        const id = event.target.id;
        console.log(register, id);
        let response = await putApi(`/api/users/${id}`, token.token, register)
        Swal.fire({
            title: "Good job!",
            text: response.message,
            icon: "success"
        }).then(() => {
            window.location.href = "/users";
        });
    };

    return (
        <div className="register_form h-[100vh] w-full bg-[#CADCFC]">
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="p-12 mx-auto max-w-2xl lg:py-16 w-full border border-black dark:bg-gray-800 dark:border-gray-700 rounded-lg">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update User</h2>
                    <form action="#" id={id} onSubmit={handleSubmitRegister}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" value={register.first_name} onChange={handleChangeRegister} name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="First Name" required="" />
                            </div>
                            <div className="w-full">
                                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Second Name</label>
                                <input type="text" value={register.last_name} onChange={handleChangeRegister} name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Second Name" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" value={register.email} onChange={handleChangeRegister} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                                <input type="text" value={register.avatar} onChange={handleChangeRegister} name="avatar" id="avatar" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Avatar" required="" />
                            </div>
                            <div>
                                <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="gender" value={register.category} onChange={handleChangeRegister} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="">Select Gender</option>
                                    <option value="Agender">Agender</option>
                                    <option value="Bigender">Bigender</option>
                                    <option value="Female">Female</option>
                                    <option value="Genderfluid">Genderfluid</option>
                                    <option value="Genderqueer">Genderqueer</option>
                                    <option value="Male">Male</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Polygender">Polygender</option>
                                </select>
                            </div>
                            <div>
                                <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain</label>
                                <input type="text" value={register.domain} onChange={handleChangeRegister} name="domain" id="domain" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Domain" required="" />
                            </div>

                            <div className='flex justify-between sm:col-span-2'>
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
                                    <div className="flex flex-wrap">
                                        <div className="flex items-center me-4">
                                            <input
                                                id="available"
                                                type="radio"
                                                onChange={handleChangeRegister}
                                                value="true"
                                                name="available"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="available-yes" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                        </div>
                                        <div className="flex items-center me-4">
                                            <input
                                                id="available"
                                                type="radio"
                                                onChange={handleChangeRegister}
                                                value="false"
                                                name="available"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="available-no" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <button type="submit" className="inline-flex items-center px-10 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-teal-600 hover:bg-teal-700 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
