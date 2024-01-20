/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Card = ({image}) => {
    const tags = image.tags.split(',')
  return (
    <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg mr-3 mt-10">
    <img src={image.webformatURL} alt="photo" className="w-full max-h-72" />
    <div className="px-6 py-4">
      {tags.map((tag, index) => (
        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        {tag}
      </span>
      ))}
    </div>
  </div>
    </>
  )
}

export default Card