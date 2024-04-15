import { Link } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';

function listingsItem({ listings, id, onDelete, onEdit }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/category/${listings.type}/${id}`}
        className='categoryListingLink'
      >
        <img
          src={listings.imageUrls[0]}
          alt={listings.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listings.location}</p>
          <p className='categoryListingName'>{listings.name}</p>
          <p className='categoryListingPrice'>
            $
            {listings.offer
              ? listings.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listings.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listings.type === 'rent' && ' / Month'}
          </p>
          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='bed' />
            <p className='categoryListingInfoText'>
              {listings.bedrooms > 1
                ? `${listings.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
            <img src={bathtubIcon} alt='bath' />
            <p className='categoryListingInfoText'>
              {listings.bathrooms > 1
                ? `${listings.bathrooms} bathrooms`
                : '1 bathroom'}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76, 60)'
          onClick={() => onDelete(listings.id, listings.name)}
        />
      )}
      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  );
}

export default listingsItem;
