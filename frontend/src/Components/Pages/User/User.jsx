import React, { useEffect, useState } from 'react'
import { deleteApi, getApi, postApiTeam } from '../../Api/Api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import "../../../App.css"

export default function User() {
    let apiUrl = "/api/users";
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));
    const [filters, setFilters] = useState({
        gender: '',
        domain: '',
        available: '',
    });
    const [queryParams, setQueryParams] = useState([]);

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
            setTotalPages(response.total_pages)
            setAuthorized(false);
        } catch (error) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const constructQueryParams = () => {
        let params = [];
        if (currentPage) {
            params.push(`page=${currentPage}`);
        }
        if (search) {
            params.push(`text=${search}`);
        }
        const { gender, domain, available } = filters;
        if (gender) {
            params.push(`gender=${gender}`);
        }
        if (domain) {
            params.push(`domain=${domain}`);
        }
        if (available) {
            params.push(`available=${available}`);
        }
        return params;
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

        const params = constructQueryParams();
        setQueryParams(params);
        const fullUrl = params.length > 0 ? `${apiUrl}?${params.join("&")}` : apiUrl;
        verifyToken(fullUrl);
    }, [currentPage, search]);

    if (error) {
        return (
            <div className="flex items-center bg-[#CADCFC]  justify-center h-screen">
                <p className="text-lg font-semibold text-red-600">{error}</p>
            </div>
        );
    }


    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };
    const handleDeleteUser = async (e) => {
        const id = e.target.id
        const response = await deleteApi(`/api/users/${id}`, token.token)
        Swal.fire({
            title: "Good job!",
            text: "Deleted successfully",
            icon: "success"
        })
        verifyToken(apiUrl);

    }

    const handleAddTeam = async (e) => {
        const id = e.target.id
        const response = await postApiTeam(`/api/team`, token.token, { id })
        Swal.fire({
            title: "Good job!",
            text: response.message,
            icon: "success"
        })
        verifyToken(apiUrl);
    }


    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [id]: type === 'radio' ? value : value
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        const params = constructQueryParams();
        const fullUrl = params.length > 0 ? `${apiUrl}?${params.join("&")}` : apiUrl;
        verifyToken(fullUrl);
    };

    return (
        <div>
            <section className="bg-[#FFFFFF] mt-10">
                <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <input
                            type="text"
                            id="search"
                            value={search}
                            onChange={handleSearch}
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                        />
                        <div className="flex justify-center items-center w-full mt-10 p-4 bg-gray-100">
                            <div className="flex space-x-4">
                                {/* Gender */}
                                <div className="flex flex-col">
                                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                                    <select
                                        id="gender"
                                        value={filters.gender}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-48 p-2.5"
                                    >
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

                                {/* Domain */}
                                <div className="flex flex-col">
                                    <label htmlFor="domain" className="block mb-2 text-sm font-medium text-gray-900">Domain</label>
                                    <select
                                        id="domain"
                                        value={filters.domain}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-48 p-2.5"
                                    >
                                        <option value="">Select Domain</option>
                                        <option value="Business Development">Business Development</option>
                                        <option value="Finance">Finance</option>
                                        <option value="IT">IT</option>
                                        <option value="Management">Management</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="UI Designing">UI Designing</option>
                                    </select>
                                </div>

                                {/* available */}
                                <div className="flex flex-col">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Available</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                id="available"
                                                type="radio"
                                                value="true"
                                                checked={filters.available === 'true'}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor="available-yes" className="ms-2 text-sm font-medium text-gray-900">Yes</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="available"
                                                type="radio"
                                                value="false"
                                                checked={filters.available === 'false'}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor="available-no" className="ms-2 text-sm font-medium text-gray-900">No</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Filter Button */}
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center h-screen bg-[#CADCFC] ">
                            <div className="custom-loader"></div>
                        </div>
                    ) : (

                        <div>
                            <Link to="/addUser">
                                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add new user</button>

                            </Link>
                            <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-4">
                                {data.data?.map((elm) => (

                                    <div key={elm._id} className="items-center bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <Link to={`/singleUser/${elm._id}`}>

                                            <a href="#">
                                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={elm.avatar} alt="Bonnie Avatar" />
                                            </a>
                                        </Link>

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
                                            <div className='flex justify-between mt-5'>
                                                <Link to={`/updateUser/${elm._id}`}>
                                                    <button type="button" id={elm._id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                                                </Link>
                                                <button type="button" id={elm._id} onClick={handleDeleteUser} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Delete</button>
                                                <button type="button" id={elm._id} onClick={handleAddTeam} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Add Team</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="pagination flex justify-center overflow-x-auto py-4">
                                <nav aria-label="Page navigation example">
                                    <ul className="flex flex-wrap -space-x-px text-base">
                                        <li>
                                            <button
                                                onClick={handlePrevious}
                                                disabled={currentPage === 1}
                                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                            <li key={index}>
                                                <button
                                                    onClick={() => handlePageClick(index + 1)}
                                                    className={`flex items-center justify-center px-4 h-10 leading-tight ${index + 1 === currentPage
                                                        ? 'bg-blue-500 text-white'
                                                        : 'text-gray-500 bg-white border border-gray-300'
                                                        } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={handleNext}
                                                disabled={currentPage === totalPages}
                                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    )}

                </div>
            </section >
        </div >
    )
}
