import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingsItem from '../components/listingsItem';

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

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
    fetchUserListing();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want delete?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updateListings = listing.filter(
        (listing) => listing.id !== listingId
      );
      setListing(updateListings);
      toast.success('Successfully deleted listing');
    }
  };

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow roght' />
        </Link>

        {!loading && listing?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingList'>
              {listing.map((listing) => (
                <ListingsItem
                  key={listing.id}
                  listings={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
