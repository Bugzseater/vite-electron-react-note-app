import { Link } from "react-router-dom"


function Home() {
  return (

    <div className=' w-full bg-yellow-300 h-[100vh] flex justify-center items-center flex-col'>
        <h3 className=' text-[5rem] font-bold' >Welcome to</h3>
        <h1 className='text-[2rem]'>Note Taking</h1>
        <Link to="/login" className=' w-[100px] bg-red-300 p-[10px] rounded-[20px]'>Get Started</Link>
      </div>
  )
}

export default Home
