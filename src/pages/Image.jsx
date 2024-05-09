import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";
// import { FaShareAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

import { saveAs } from "file-saver";

const Image = () => {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null);
  const api = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${api}&id=${id}`
        );
        setImageData(response.data.hits[0]);
        setLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching image data:", error.message);
      }
    };

    fetchImageData();
  }, [id, api]);

  const handleDownload = () => {
    let downloadUrl = "";

    switch (selectedOption) {
      case "small":
        downloadUrl = imageData.webformatURL.replace("_640", "_340"); 
        break;
      case "medium":
        downloadUrl = imageData.webformatURL.replace("_640", "_640"); 
        break;
      case "big":
        downloadUrl = imageData.largeImageURL; 
        break;
      case "original":
        downloadUrl = imageData.webformatURL; 
        break;
      default:
        // Use default URL (e.g., original size) if no option selected
        downloadUrl = imageData.webformatURL;
    }

    // Fetch image data as a blob
    axios
      .get(downloadUrl, {
        responseType: "blob",
      })
      .then((response) => {
        // Save blob as a file using file-saver library
        saveAs(response.data, `${imageData.tags.split(',')[0].trim()}.jpg`);
      })
      .catch((error) => {
        console.error("Error downloading image:", error.message);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center mx-5 xl:mx-0 md:mx-0">
        {loading ? (
          <Loader />
        ) : (
          <div className=" mt-20 bg-white flex justify-center items-center mb-10">
            {imageData && (
              <div>
                <div className="bg-[#F5F5F5] p-5 font-semibold text-xl flex justify-between">
                  <p>
                    <span>Preview:</span> {imageData.id}
                  </p>
                  <Link onClick={() => navigate(-1)}>
                    <IoMdArrowRoundBack />
                  </Link>
                </div>
                <div className="xl:flex md:flex p-10">
                  <div className="xl:mr-10 md:mr-10">
                    <img
                      src={imageData.largeImageURL}
                      className="xl:max-w-2xl md:max-w-2xl h-full rounded-lg"
                      alt={imageData.tags}
                    />
                  </div>
                  <div>
                    <div className="mb-10 mt-5 xl:mt-0 md:mt-0">
                      <p className="font-semibold text-xl ">Download</p>
                      <div className="grid grid-cols-1 divide-y">
                        <div className="flex justify-between items-center gap-10 mt-5 p-3">
                          <div>
                            <p>Small</p>
                          </div>
                          <div className="flex gap-2">
                            <p>640x960</p>
                            <input
                              type="checkbox"
                              checked={selectedOption === "small"}
                              onChange={() => handleCheckboxChange("small")}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-10 p-3">
                          <div>
                            <p>Medium</p>
                          </div>
                          <div className="flex gap-2">
                            <p>1920x2660</p>
                            <input
                              type="checkbox"
                              checked={selectedOption === "medium"}
                              onChange={() => handleCheckboxChange("medium")}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-10 p-3">
                          <div>
                            <p>Big</p>
                          </div>
                          <div className="flex gap-2">
                            <p>2400x3600</p>
                            <input
                              type="checkbox"
                              checked={selectedOption === "big"}
                              onChange={() => handleCheckboxChange("big")}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-10 p-3">
                          <div>
                            <p>Original</p>
                          </div>
                          <div className="flex gap-2">
                            <p>3850x5640</p>
                            <input
                              type="checkbox"
                              checked={selectedOption === "original"}
                              onChange={() => handleCheckboxChange("original")}
                            />
                          </div>
                        </div>
                        <button
                          className="bg-green-500 text-white w-full mt-5"
                          onClick={handleDownload}
                        >
                          Download For Free
                        </button>
                      </div>
                    </div>
                    {/* Information Section */}
                    <div>
                      <p className="text-xl font-semibold">Information</p>
                      <div className="grid grid-cols-3 gap-4 mt-5">
                        <div>
                          <p>User</p>
                          <p>{imageData.user}</p>
                        </div>
                        <div>
                          <p>User ID</p>
                          <p>{imageData.id}</p>
                        </div>
                        <div>
                          <p>Type</p>
                          <p>{imageData.type}</p>
                        </div>
                        <div>
                          <p>Views</p>
                          <p>{imageData.views}</p>
                        </div>
                        <div>
                          <p>Downloads</p>
                          <p>{imageData.downloads}</p>
                        </div>
                        <div>
                          <p>Likes</p>
                          <p>{imageData.likes}</p>
                        </div>
                      </div>
                    </div>
                    {/* Share Section */}
                    <div className="mt-5">
                      <div>
                        <p className="text-xl font-semibold">Share: </p>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <FacebookShareButton
                          url={imageData.webformatURL}
                          className=" focus:outline-none focus:border-transparent"
                        >
                          <FaSquareFacebook className="text-3xl cursor-pointer" />
                        </FacebookShareButton>
                        <WhatsappShareButton
                          url={imageData.webformatURL}
                          className=" focus:outline-none focus:border-transparent"
                        >
                          <FaWhatsapp className="text-3xl cursor-pointer" />
                        </WhatsappShareButton>
                        <TwitterShareButton
                          url={imageData.webformatURL}
                          className=" focus:outline-none focus:border-transparent"
                        >
                          <BsTwitterX className="text-3xl cursor-pointer" />
                        </TwitterShareButton>
                        <EmailShareButton
                          url={imageData.webformatURL}
                          className=" focus:outline-none focus:border-transparent"
                        >
                          <AiOutlineMail className="text-3xl cursor-pointer" />
                        </EmailShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 flex text-center xl:ml-5 md:ml-5">
                  <p className="mr-5 text-xl text-gray-800 font-semibold">
                    Tag:{" "}
                  </p>
                  {imageData.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-[15px] font-semibold text-gray-700 mr-2 "
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Image;
