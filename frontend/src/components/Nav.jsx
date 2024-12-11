import React from 'react';
import { LuPhoneCall } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function Nav() {
    return (
        <>
            <div className="bg-slate-100 flex justify-between items-center w-full px-4 py-2 sm:py-4 md:px-12">
                {/* Logo */}
                <div className="flex justify-start w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                    <img
                        src="https://media.licdn.com/dms/image/v2/C4E0BAQEjuZsYD7nBtw/company-logo_200_200/company-logo_200_200/0/1630617164059?e=2147483647&v=beta&t=h9GnHxnrsiRTvi_DNxiBg-76mOkkGR2fI8ZS_pnM1JU"
                        alt="Logo"
                        className="w-full h-full"
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-10">
                    <a
                        href="#"
                        className="text-indigo-800 font-semibold text-sm sm:text-base md:text-2xl"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-indigo-800 font-semibold text-sm sm:text-base md:text-2xl"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="text-indigo-800 font-semibold text-sm sm:text-base md:text-2xl"
                    >
                        Blogs
                    </a>
                </div>

                {/* Call Icon and Search */}
                <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-10">
                    {/* Call Icon */}
                    <div className="flex justify-center items-center bg-cyan-600 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full">
                        <LuPhoneCall className="text-white text-lg sm:text-xl md:text-2xl" />
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center bg-blue-800 text-white px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full shadow-md space-x-2">
                        <FiSearch className="text-sm sm:text-base md:text-lg" />
                        <input
                            type="text"
                            className="text-white font-medium text-xs sm:text-sm md:text-base bg-transparent outline-none w-14 sm:w-24 md:w-32"
                            placeholder="Search"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nav;
