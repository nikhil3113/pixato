import { useState } from "react"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

 
const Landing = () => {
  // eslint-disable-next-line no-unused-vars
  const[photo, setPhoto] = useState([]);
  const[terms, setTerms] = useState('');
  
  const navigate = useNavigate();

  const fetchData = async (searchTerm) => {
    const api = import.meta.env.VITE_API_KEY;
    const url = `https://pixabay.com/api/?key=${api}&q=${searchTerm}&image_type=photo`;
  
    try {
      const response = await axios.get(url);
      return response.data.hits;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
  };

  const handleSearch = async () => {
    try {
      const results = await fetchData(terms);
      navigate('/search', { state: { results, searchTerm: terms } });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleChange = (event) =>{
    setTerms(event.target.value);
  }

  return (
    <>
        <Navbar />
        <div className="flex justify-center items-center mt-32">
          <SearchBar onSearch={handleSearch} onChange={handleChange} />
        </div>
        <div className="flex justify-center items-center">
        <div className="flex justify-between items-center bg-slate-800 px-10 mx-5 relative top-10 backdrop-blur-xl py-2 rounded-md bg-white/30 border-2 border-white xl:w-[22%] md:w-[22%] mt-10 text-white">
          <p><span className="font-bold">Trending:</span> flowers, love, forest, river</p>
        </div>
        </div>
    </>
  )
}

export default Landing