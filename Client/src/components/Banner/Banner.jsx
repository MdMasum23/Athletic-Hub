import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import card1 from '../../assets/sliders/slider-001.png'
import card2 from '../../assets/sliders/slider-002.png'
import card3 from '../../assets/sliders/slider-003.png'
import card4 from '../../assets/sliders/slider-004.png'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    return (
        <div className='text-center font-medium py-3'>
            <Swiper
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="cursor-pointer overflow-hidden shadow-lg rounded-2xl"
            >

                <SwiperSlide>
                    <img className='max-h-[85vh] w-full mx-auto rounded-xl' src={card1} alt="Banner 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='max-h-[85vh] w-full mx-auto rounded-t-xl' src={card2} alt="Banner 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='max-h-[85vh] w-full mx-auto rounded-xl' src={card3} alt="Banner 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='max-h-[85vh] w-full mx-auto rounded-xl' src={card4} alt="Banner 4" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;