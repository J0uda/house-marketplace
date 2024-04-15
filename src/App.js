import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Private from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Offres from './pages/Offres';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Category from './pages/Category';
import CreateListings from './pages/CreateListings';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<Private />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/offres' element={<Offres />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<CreateListings />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
