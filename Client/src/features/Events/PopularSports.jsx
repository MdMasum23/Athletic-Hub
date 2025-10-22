import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PopularSport from './PopularSport';

const PopularSports = () => {
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    axios.get('https://a11-athletic-hub-server.vercel.app/popularSports')
      .then(res => setSportsData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='my-24 px-6 md:px-10 text-center'>
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        Explore Our <span className="text-cyan-500">Popular Sports</span>
      </h2>

      <div className='grid md:grid-cols-3 gap-10'>
        {
          sportsData.map(popular => <PopularSport
            key={popular._id}
            popular={popular}
          ></PopularSport>)
        }
      </div>

    </div>
  );
};

export default PopularSports;