import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Card from "../components/Card";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const Search = () => {
  const [photo, setPhoto] = useState([]);
  const [terms, setTerms] = useState("");
  const api = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const { results, searchTerm: initialSearchTerm } = location.state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (results) {
      setPhoto(results);
      setTerms(initialSearchTerm || "");
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, initialSearchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${api}&q=${terms}&image_type=photo`
      );
      setPhoto(response.data.hits);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleSearch = async () => {
    fetchData();
  };

  const handleChange = (event) => {
    setTerms(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <SearchBar onSearch={handleSearch} onChange={handleChange} />
      </div>
      <h1 className="mt-16 text-center text-white  font-bold">
        Result: {terms}
      </h1>
      <div className="min-h-screen bg-white mt-20">
        {loading ? (
          <Loader />
        ) : photo && photo.length > 0 ? (
          <div className="grid xl:grid-cols-3 grid-cols-2 gap-1 xl:gap-4 md:gap-4 pl-2 xl:pl-10 md:pl-10">
            {photo.map((item) => (
              <Link key={item.id} to={`/${item.id}`}>
                <Card image={item} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 font-semibold mt-20 text-2xl">
            😥 No images available for {terms}
          </p>
        )}
      </div>
    </>
  );
};

export default Search;
