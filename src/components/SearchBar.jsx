
import { CiSearch } from "react-icons/ci";
import line from '../assets/Line 7.png'
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const SearchBar = ({onSearch, onChange}) => {
  return (
    <>
     <div className="flex justify-between items-center bg-slate-800 px-10 mx-5 relative top-10 backdrop-blur-xl py-2 rounded-md bg-white/30 border-2 border-white xl:w-2/5 md:w-2/5">
            <div className="flex">
              <CiSearch className="text-4xl font-bold text-white mr-5 cursor-pointer" />
              <img src={line} alt="" />
              <input type="text" className="bg-transparent border-none w-full ml-5 placeholder:text-white placeholder:font-bold placeholder:text-xl focus:outline-none focus:border-transparent text-white font-bold text-xl" placeholder="Search" onChange={onChange}/>
            </div>
            <div>
              <Link to={'/search'}>
              <button className="bg-transparent rounded-md border-2 border-white px-5 py-1 hover:border-white hover:opacity-80 focus:outline-none focus:border-white" onClick={onSearch}>
                <p className="text-white text-xl xl:text-2xl md:text-2xl font-bold">GO!</p>
              </button>
              </Link>
            </div>
        </div>
    </>
  )
}

export default SearchBar