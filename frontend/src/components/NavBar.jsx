import React from 'react';
import { LuPhoneCall } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function NavBar() {
    return (
        <>
            <div className='bg-slate-100 flex justify-between w-full'>
                <div className="flex justify-start flex-wrap w-20 h-20 ml-12">
                    <img src="https://media.licdn.com/dms/image/v2/C4E0BAQEjuZsYD7nBtw/company-logo_200_200/company-logo_200_200/0/1630617164059?e=2147483647&v=beta&t=h9GnHxnrsiRTvi_DNxiBg-76mOkkGR2fI8ZS_pnM1JU" />
                </div>

                <div className="flex justify-around flex-center items-center">
                    <div className='flex justify-between mr-10'>
                    <a href="" className='text-indigo-800 font-semibold text-2xl mt-2 ml-10 mr-8'>Home</a>
                    <a href="" className='text-indigo-800 font-semibold text-2xl mt-2 ml-10 mr-8'>Services</a>
                    <a href="" className='text-indigo-800 font-semibold text-2xl mt-2 ml-10 mr-8'>Blogs</a>
                    </div>
                    

                    <div className='flex justify-center text-center mt-3 bg-cyan-600 h-8 w-13 rounded-full mr-5 mb-2 pt-1 pb-3'   >
                        <LuPhoneCall  className="h-7 w-7 ml-7 mr-7 text-white"/>
                    </div>

                        <div className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-full shadow-md space-x-2 mr-20">
                            {/* Search Icon */}
                            <FiSearch className="h-5 w-5" />

                            {/* Search Text */}
                            <input type='text' className="text-white font-medium text-sm bg-transparent w-14 outline-none" placeholder='search' />
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NavBar
