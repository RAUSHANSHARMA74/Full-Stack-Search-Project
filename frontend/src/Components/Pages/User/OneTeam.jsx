import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getApi } from '../../Api/Api';

export default function OneTeam() {
    const { id } = useParams();
    console.log(id)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem("token"));

    const verifyToken = async () => {
        try {
            let response = await getApi(`/api/team/${id}`, token.token);
            console.log(response, "your response")
            if (response.status === 401) {
                setError("You are not authorized to see this content. Please log in.");
            }
            setData(response.data)
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
            return;
        }
        verifyToken();
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
                {loading ? (
                    <div className="flex items-center justify-center h-screen bg-[#CADCFC]">
                        <p className="text-lg font-semibold text-gray-600">Loading...</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="max-w-4xl w-full bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col md:flex-row">
                                {/* Image Section */}
                                <div className="w-full md:w-1/2">
                                    <a href="#">
                                        <img className="w-full h-full object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg" src={data.avatar} alt="User Avatar" />
                                    </a>
                                </div>
                                {/* Details Section */}
                                <div className="flex flex-col justify-center items-center p-5 w-full md:w-1/2">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                                        {`${data.first_name} ${data.last_name}`}
                                    </h3>
                                    <div className='flex flex-col md:flex-row justify-between items-center w-full mb-2'>
                                        <span className="text-gray-500 dark:text-gray-400">{data.domain}</span>
                                        <span className="text-gray-500 dark:text-gray-400">{data.gender}</span>
                                    </div>
                                    <span className={`${data.available ? 'text-green-500' : 'text-red-500'} dark:${data.available ? 'text-green-400' : 'text-red-400'}`}>
                                        {data.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}
