import React from 'react'

function Banner() {
  return (
    <>
        <div className='mt-10 bg-slate-200 '>
            <div>
                <h1 className='text-center text-indigo-800 font-semibold  text-3xl pt-5 pb-5'>A sneak peak into the digital experience</h1>
            </div>

            <div className="image m-20">
                <img src="https://t4.ftcdn.net/jpg/04/73/38/27/360_F_473382708_J1CcBu3ylkyjWTjxK66Q4tmgRcF9lGU1.jpg" alt="" className='rounded-3xl w-screen h-screen ml-5 mr-5 mb-5 '/>
            </div>
        </div>
    </>
  )
}

export default Banner