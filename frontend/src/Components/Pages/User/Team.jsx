import React, { useEffect, useState } from 'react'
import { getApi } from '../../Api/Api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../../App.css"

export default function Team() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const verifyToken = async (url) => {
        try {
            let response = await getApi(url, token.token);
            if (response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You are not authorized to see this content. Please log in.",
                }).then(() => {
                    setError("You are not authorized to see this content. Please log in.");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000)
                });
            }
            setData(response)
            setAuthorized(false);
        } catch (error) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setError("You are not logged in. Please log in to access this page.");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You are not logged in. Please log in to access this page.",
            }).then(() => {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000)
            });
            return;
        }
        let apiUrl = "/api/team";
        verifyToken(apiUrl);
    }, []);

    if (error) {
        return (
            <div className="flex items-center bg-[#CADCFC]  justify-center h-screen">
                <p className="text-lg font-semibold text-red-600">{error}</p>
            </div>
        );
    }



    return (
        <div>
            <section className="bg-[#FFFFFF] mt-10">
                <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-[#1F2937]">Our Team</h2>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center h-screen">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (

                        <div>
                            <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-4">
                                {data.data?.map((elm) => (
                                    <Link to={`/singleUser/${elm._id}`}>

                                        <div key={elm._id} className="items-center bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <a href="#">
                                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={elm.avatar} alt="Bonnie Avatar" />
                                            </a>
                                            <div className="p-5">
                                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    <a href="#">{`${elm.first_name} ${elm.last_name}`}</a>
                                                </h3>
                                                <div className='flex justify-between items-center'>
                                                    <span className="text-gray-500 dark:text-gray-400">{elm.domain}</span>
                                                    <span className="text-gray-500 dark:text-gray-400">{elm.gender}</span>
                                                </div>
                                                <span
                                                    className={`${elm.available ? 'text-green-500' : 'text-red-500'} dark:${elm.available ? 'text-green-400' : 'text-red-400'}`}
                                                >
                                                    {elm.available ? 'Available' : 'Not Available'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>

                    )}

                </div>
            </section>
        </div>
    )
}
