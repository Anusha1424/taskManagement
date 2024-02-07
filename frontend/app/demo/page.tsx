import React from 'react'

 const Demo = () => {
  return (
    <>
    <div className='bg-slate-300 col-span-12 items-center flex justify-between'>
        <h1 className='m-4 font-bold text-3xl'>
            Task List
        </h1>
        <button className='p-4 mr-4 bg-gray-400'> Create Task</button>
       
       
    </div>
    <div className='flex justify-between items-center' >
    <div className='w-[30%] h-full border-r-2'>
        <h1 className='m-4 font-bold text-xl text-center' >
           Todo
        </h1>
         <ul className='flexd p-4 border-b-1 border-b-black left-0 top-0'>
            <li className='p-4  border-b-2'>Home</li>
            <li className='p-4  border-b-2'>Resources</li>
            <li className='p-4  border-b-2'> Main</li>
            <li className='p-4'>Logout</li>
        </ul>
    </div>

    <div className='w-[30%] h-full border-r-2'>
        <h1 className='m-4 font-bold text-xl text-center' >
        In Progress
        </h1>
         <ul className='flexd p-4 border-b-1 border-b-black left-0 top-0'>
            <li className='p-4  border-b-2'>Home</li>
            <li className='p-4  border-b-2'>Resources</li>
            <li className='p-4  border-b-2'> Main</li>
            <li className='p-4'>Logout</li>
        </ul>
    </div>
    <div className='w-[30%] h-full'>
        <h1 className='m-4 font-bold text-xl text-center' >
            Completed
        </h1>
         <ul className='flexd p-4 border-b-1 border-b-black left-0 top-0'>
            <li className='p-4  border-b-2'>Home</li>
            <li className='p-4  border-b-2'>Resources</li>
            <li className='p-4  border-b-2'> Main</li>
            <li className='p-4'>Logout</li>
        </ul>
    </div>
    </div>
   </>
  )
}
export default Demo;