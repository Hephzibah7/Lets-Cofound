import React from 'react'

function Quotes() {
  return (
    <div className="hidden lg:block">
    <div className=" bg-black h-auto lg:h-[150vh] flex flex-col items-center font-alexandria">
      <div className="mt-10 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 31 26" fill="none" className="block">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.5 26V11.2085C0.5 7.87044 1.63671 5.27503 3.91014 3.42226C6.18356 1.56949 9.42473 0.42874 13.6336 
            0V7.21201C11.1759 7.54888 9.28648 8.17668 7.96544 9.09541C6.64439 10.0141 5.76882 11.3004 5.33871 
            12.9541H13.6336V26H0.5ZM17.3664 26V11.2085C17.3664 7.87044 18.5031 5.27503 20.7765 3.42226C23.0499 
            1.56949 26.2911 0.42874 30.5 0V7.21201C28.0422 7.54888 26.1528 8.17668 24.8318 9.09541C23.5107 10.0141 
            22.6352 11.3004 22.2051 12.9541H30.5V26H17.3664Z" fill="purple"></path>
        </svg>
      </div>
      <p className="ml-5 text-center mt-3 text-3xl md:text-5xl lg:text-7xl text-white">Unlock <span className="text-purple-500">Assured Returns</span> by 
        Investing Your<span className="text-purple-500"> Time Wisely</span>.
      </p>
      <p className="text-center lg:text-inline mt-3 text-xl md:text-2xl lg:text-3xl text-white ">
        <span className="gif-container">Cultivate Success Instantly:Obtain </span>
        <span className="gif-container">Assistance and Earn Rewards.</span></p>

    {/* <div className="border-radius-2 border-purple-500 border-solid border-2 
    h-[135vh] ml-10 mr-10 w-[65vw] mt-10 "> */}
        <div>

        <div className="mt-5 items-center justify-center gap-3 lg:flex lg:flex-wrap">

        {/* <div className="flex flex-row m-5 gap-4"> */}
            
            <div className="bg-gradient-to-r from-black to-purple-950 rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>


            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>



            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>
        {/* </div> */}


        {/* <div className="flex flex-row m-5 gap-4"> */}
            
            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>


            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>



            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>
        {/* </div> */}



        {/* <div className="flex flex-row m-5 gap-4"> */}
            
            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                </div>
            </div>


            <div className="bg-gradient-to-r from-black to-purple-950  rounded-xl w-[22vw] h-[60vh]">
             <div className="flex flex-col">
            <div className="flex flex-row ">
            <div className="mt-5 mr-1  flex flex-row ">
            <div className="rounded-full overflow-hidden h-[10vh] w-[10vh] ml-7 mr-2 mt-10">
                    <img
            className="h-full w-full"
                src="https://m.media-amazon.com/images/M/MV5BYTNlOGZhYzgtMmE3OC00Y2NiLWFhNWQtNzg5MjRhNTJhZGVmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_.jpg"
                alt="Jeff Bezos"/>
            </div>
          <div className="mt-10 items-center">
            <p className="text-2xl font-bold text-white">Jeff Bezos</p>
            <p className="text-lg text-white">@Founder_Amazon</p>

          </div>
        
                <div className="ml-2">
                <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="block">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 8.09086C12.2727 11.3443 11.39 14.2232 9.6244 16.7275C7.85885 
                19.2319 5.49043 21.3188 2.51914 22.9883C2.38995 23.0311 2.18541 22.9562 1.9055 22.7636C1.6256 22.5709 1.39952 22.3676 
                1.22727 22.1536C1.05502 21.9395 0.904306 21.672 0.77512 21.3509C0.645933 21.0298 0.645933 20.8265 0.77512 20.7409C2.23923 
                19.7563 3.4988 18.7503 4.55383 17.7228C5.60885 16.6954 6.13636 15.1115 6.13636 12.9711C6.13636 12.4574 6.10407 12.0935 
                6.03947 11.8794C5.97488 11.6654 5.85646 11.5584 5.68421 11.5584C5.55502 11.5584 5.41507 11.5905 5.26435 11.6547C5.11364 
                11.7189 4.93062 11.751 4.71531 11.751C3.46651 11.751 2.36842 11.3122 1.42105 10.4346C0.473684 9.55706 0 8.17648 0 6.29289C0 
                4.70897 0.549043 3.26417 1.64713 1.9585C2.74522 0.652834 4.1555 0 5.87799 0C7.81579 0 9.36603 0.770558 10.5287 
                2.31168C11.6914 3.85279 12.2727 5.77919 12.2727 8.09086ZM27 8.09086C27 11.3443 26.1172 14.2232 24.3517 
                16.7275C22.5861 19.2319 20.2177 21.3188 17.2464 22.9883C17.1172 23.0311 16.9127 22.9562 16.6328 22.7636C16.3529 
                22.5709 16.1268 22.3676 15.9545 22.1536C15.7823 21.9395 15.6316 21.672 15.5024 21.3509C15.3732 21.0298 15.3732 
                20.8265 15.5024 20.7409C16.9665 19.7563 18.2261 18.7503 19.2811 17.7228C20.3361 16.6954 20.8636 15.1115 20.8636 
                12.9711C20.8636 12.4574 20.8313 12.0935 20.7667 11.8794C20.7022 11.6654 20.5837 11.5584 20.4115 11.5584C20.2823 
                11.5584 20.1423 11.5905 19.9916 11.6547C19.8409 11.7189 19.6579 11.751 19.4426 11.751C18.1938 11.751 17.0957 11.3122 16.1483 
                10.4346C15.201 9.55706 14.7273 8.17648 14.7273 6.29289C14.7273 4.70897 15.2763 3.26417 16.3744 1.9585C17.4725 0.652834 
                18.8828 0 20.6053 0C22.5431 0 24.0933 0.770558 25.256 2.31168C26.4187 3.85279 27 5.77919 27 8.09086Z" fill="#EAEAEA">
                </path>
                </svg>
                </div>
                </div>
                </div>
                <p className="m-5 text-xl text-white text-center">“Holy Grail Product. Starting up is difficult but finding the right cofounder and building an early team is daunting.
                     Glad to have found CF and explore possible connections with very smart folks in the ecosystem. Must say the profiles 
                     are so amazing you will find it hard to pass and shortlist :).”</p>
                {/* </div> */}
            </div>



           
               
        </div>
      </div>
    </div>
    
  </div>
  </div>
  

  )
}


export default Quotes;