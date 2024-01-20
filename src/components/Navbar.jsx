import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
        <div className="xl:flex md:flex justify-between items-center bg-slate-800 px-10 mx-5 relative top-10 backdrop-blur-xl py-5 rounded-md bg-white/30 border-2 border-white">
            <div>
              <Link to={'/'}>
                <p className="text-2xl text-white font-semibold">Homepage</p>
                </Link>
            </div>
            
        </div>
    </>
  )
}

export default Navbar