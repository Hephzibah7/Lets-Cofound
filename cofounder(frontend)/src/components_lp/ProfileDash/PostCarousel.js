
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const Carousel = ({ cards }) => {
//   // Ensure unique keys for each card
//   const uniqueCards = Array.from(new Set(cards.map((card) => card._id))).map(
//     (id) => cards.find((card) => card._id === id)
//   );

//   const PrevArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <div
//         className={`${className} absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer`}
//         onClick={onClick}
//       >
//         <FaArrowLeft className="text-gray-800 text-3xl" />
//       </div>
//     );
//   };

//   const NextArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <div
//         className={`${className} absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer`}
//         onClick={onClick}
//       >
//         <FaArrowRight className="text-gray-800 text-3xl" />
//       </div>
//     );
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//   };

//   return (
//     <div {...settings} className="px-4 flex">
//       {uniqueCards.map((card, index) => (
//         <div key={index} className="px-2">
//           <div className="border rounded-lg overflow-hidden relative h-96">
//             <img
//               src={`http://localhost:9002/uploads/${card.imageUrl}`}
//               alt={card.text}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
//               <div className="text-white text-lg font-semibold text-center p-4">
//                 <p>{card.postContent}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;


import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = ({ cards }) => {
  // Ensure unique keys for each card
  const uniqueCards = Array.from(new Set(cards.map((card) => card._id))).map(
    (id) => cards.find((card) => card._id === id)
  );

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer`}
        onClick={onClick}
      >
        <FaArrowLeft className="text-gray-800 text-3xl" />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer`}
        onClick={onClick}
      >
        <FaArrowRight className="text-gray-800 text-3xl" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div {...settings} className="px-4">
      <div className="flex overflow-x-auto">
        {uniqueCards.map((card, index) => (
          <div key={index} className="px-2 flex-shrink-0" style={{ width: '350px' }}>
            <div className="border rounded-lg overflow-hidden relative h-96">
              <img
                src={`http://localhost:9002/uploads/${card.imageUrl}`}
                alt={card.text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                <div className="text-white text-lg font-semibold text-center p-4">
                  <p>{card.postContent}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;