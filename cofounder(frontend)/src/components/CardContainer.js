import React, { useRef, useEffect } from 'react';
import './styles.css'


const CardContainer = () => {
  const cardsContainerRef = useRef(null);
  const cardWidth = 20; // Width of each card in vw

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    const cards = cardsContainer.children;

    let totalWidth = 0;

    // Calculate the total width of all cards
    for (let i = 0; i < cards.length; i++) {
      totalWidth += cards[i].offsetWidth;
    }

    // Set the initial width of the container
    cardsContainer.style.width = `${totalWidth}vw`;

    // Function to handle animation
    const animateCards = () => {
      // Clone the first card and append it to the end
      const firstCardClone = cards[0].cloneNode(true);
      cardsContainer.appendChild(firstCardClone);

      // Animate the cards to the left
      cardsContainer.style.transition = 'transform 0.4s ease-in-out';
      cardsContainer.style.transform = `translateX(-${cardWidth}vw)`;

      // After the animation, remove the first card and reset the transform
      setTimeout(() => {
        cardsContainer.style.transition = '';
        cardsContainer.style.transform = 'translateX(0)';
        cardsContainer.removeChild(cards[0]);
      }, 500); // Adjust timing as needed
    };

    // Start the animation loop
    const intervalId = setInterval(animateCards, 3000); // Adjust interval as needed

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return(   
    <div ref={cardsContainerRef} className="flex flex-row gap-1 justify-top bg-black text-white h-[70vh] overflow-hidden">
      {/* Your cards go here */}
      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-custom bg-cover bg-center 
      bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPPSbJ1dBSa6WoUy3oUQaMNfhKTSfjlEuQ9gN-wVQAqWrFku1RVuCgmqCwhiHJMB9emZU&usqp=CAU')]">
        
        <div className="flex flex-col justify-end bg-opacity-50 text-white p-6">
          <div className="text-opacity-50 text-3xl">Founder</div>
          <div className="text-opacity-50 text-2xl font-bold">Jeff Bezos</div>
        </div>
      </div>
      

      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center
        bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgYYH4UY4O1TPt6UjjBxdftRdMYQjY-dFOcQ&s')]
        animate-slide">
        <div className="flex flex-col justify-end  bg-opacity-50 text-white p-6">
        <div className="text-opacity-50 text-3xl ">Founder</div>
        <div className="text-opacity-50 text-2xl font-bold">Elon Musk</div>
        </div>
      </div>

      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center
        bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0VS5EonhAcJ-9xX5ma0g-wvC7V1hjsJbxw&s')]
        animate-slide">
        <div className="flex flex-col justify-end  bg-opacity-50 text-white p-6">
        <div className="text-opacity-50 text-3xl ">Founder</div>
        <div className="text-opacity-50 text-2xl font-bold">Sundar Pichai</div>
        </div>
      </div>

      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center
        bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS1TUYpNvdzPAJax2_zeq2GnSsWmh46UQDyg&s')]
        animate-slide">
        <div className="flex flex-col justify-end  bg-opacity-50 text-white p-6">
        <div className="text-opacity-50 text-3xl ">Founder</div>
        <div className="text-opacity-50 text-2xl font-bold">Mark Zukenbarg</div>
        </div>
      </div>

      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center
        bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPYGUQkU2L3rayNr06i3L6BdG9WuF82FlfKQ&s')]
        animate-slide">
        <div className="flex flex-col justify-end  bg-opacity-50 text-white p-6">
        <div className="text-opacity-50 text-3xl ">Founder</div>
        <div className="text-opacity-50 text-2xl font-bold">Satya Nadella</div>
        </div>
      </div>

      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center
        bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14gnZxlDfiN6gEs2WSnA_jYwhEBolLijSFw&s')]
        animate-slide">
        <div className="flex flex-col justify-end  bg-opacity-50 text-white p-6">
        <div className="text-opacity-50 text-3xl ">Founder</div>
        <div className="text-opacity-50 text-2xl font-bold">Steve Jobs</div>
        </div>
      </div>

      <div className="inc ml-2 mt-10 flex flex-col justify-end h-[45vh] w-[20vw] rounded-2xl overflow-hidden shadow-lg bg-cover bg-center
        bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxF2ogCMgJHPTkdKaUD3-U1EbgdGglcG3sTohBP0BRQr12ftABL3jlYgBsrks7ZHXw7Po&usqp=CAU')]
        animate-slide">
        <div className="flex flex-col justify-end  bg-opacity-50 text-white p-6">
        <div className="text-opacity-50 text-3xl ">Founder</div>
        <div className="text-opacity-50 text-2xl font-bold">Kiran Mazumdar Shaw</div>
        </div>
      </div>

    </div>
  );
};

export default CardContainer;
