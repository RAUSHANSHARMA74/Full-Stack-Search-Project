import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-gray-800 border-gray-700 dark:bg-gray-900 h-[8vh] w-full fixed top-0 left-0 z-50 shadow-md">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-10 w-10 rounded-[50%]" alt="" />
                    <Link to="/">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Heliverse</span>
                    </Link>
                </a>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <div className="flex md:order-2 space-x-3 md:space-x-0 mx-10 rtl:space-x-reverse">
                        <Link to="/login">
                            <button type="button" className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Get started</button>
                        </Link>
                    </div>
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link to="/">
                                <a className="block py-2 px-3 md:p-0 text-white bg-teal-600 rounded md:bg-transparent md:text-teal-600" aria-current="page">Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <a className="block py-2 px-3 md:p-0 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-teal-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Users</a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/team">
                                <a className="block py-2 px-3 md:p-0 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-teal-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Team</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}
