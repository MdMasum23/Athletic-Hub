import React from 'react';

const PopularSport = ({ popular }) => {
    // console.log(popular);
    const { name, image, description, rank } = popular;

    return (
        <div className="rounded-3xl shadow-xl text-white 
        bg-gradient-to-br from-cyan-700 via-cyan-600 to-cyan-500 
        hover:scale-105 transition-transform duration-300"
        >
            <div className="p-10 h-80 flex flex-col justify-between items-start text-left">
                <div className="flex items-center justify-between w-full">
                    <div className="bg-white text-cyan-700 px-3 py-1 text-sm font-semibold rounded-full shadow-md">
                        Rank #{rank}
                    </div>
                    <img
                        src={image} alt={name}
                        className="w-16 h-16 object-contain drop-shadow-lg"
                    />
                </div>

                <div>
                    <h3 className="text-3xl font-extrabold tracking-wide">{name}</h3>
                    <p className="mt-2 text-white/90 text-base italic">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default PopularSport;