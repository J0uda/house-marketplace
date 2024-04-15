import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Spinner from './Spinner';
import { db } from '../firebase.config';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) return <Spinner />;

  if (listing.length === 0) return <></>;
  return (
    listing && (
      <>
        <p className='exploreHeading'>Recommended</p>

        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          pagination={{ clickable: true }}
          navigation
          scrollbar={{ draggable: true }}
        >
          {listing.map((data, id) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.data.type}/${data.id}`)}
            >
              <img
                src={data.data.imageUrls[0]}
                alt='house'
                className='swiperSlideDiv'
              />
              <p className='swiperSlideText'>{data.data.name}</p>
              <p className='swiperSlidePrice'>
                ${data.data.discountedPrice ?? data.data.regularPrices}
                {data.data.type === 'rent' && ' / month'}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
