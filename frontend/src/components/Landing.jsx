import React from 'react'

function Landing() {
  return (
    <>
        <div>
            <div className='mt-20 bg-gradient-to-r from-[rgba(252,238,238,1)] to-[rgba(221,254,243,1)] w-full h-[450px] flex flex-row pl-20 pr-20 pb-15 pt-5 justify-evenly'>
                    <div className="content flex flex-col mt-100">
                        <div className='ml-150 w-50 flex flex-wrap' >
                            <h1 className='text-indigo-800 font-medium text-6xl mb-5'>What We Do</h1>
                            <p className='text-[#0284c7] text-3xl font-medium tracking-normal'>Connex India is an augumented reality <br />platform for design collaboration that <br />enables the viewing of 3D models in AR format</p>
                        </div>
                        <button className="bg-[#0284c7] text-white font-semibold w-[130px] pl-5 pr-5 pt-1 pb-1 text-3xl rounded-full mt-10 ml-20 ">DEMO</button>
                    </div>
                    <div className="image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2cYYi3Fa08SbCUmGUeqH5m3VkDziCSIWTw&s" className='w-[600px] h-[350px] '/>
                    </div>
             </div>
        </div>
    </>
  )
}

export default Landing