import Box from '@mui/joy/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import InputReview from './InputReview.jsx';
import Feed from './Feed.jsx';
import Review from './Review.jsx';
import Header from './Header.jsx';
import ProfileCard from './ProfileCard.jsx';
import NowPlaying from './NowPlaying.jsx';
import UserMenu from './UserMenu.jsx';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    'isLoggedIn',
    'username',
    'profilePicture',
  ]);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [userAddedReview, setUserAddedReview] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {!cookies.isLoggedIn && (
        <div className="flex flex-row">
          <div className="flex justify-start w-screen">
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              setProfilePicture={setProfilePicture}
              username={username}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          </div>
          <div className="flex justify-center">
            <Feed
              setUserAddedReview={setUserAddedReview}
              userAddedReview={userAddedReview}
            />
          </div>
          <div className="flex justify-end">
            <NowPlaying />
          </div>
        </div>
      )}
      {cookies.isLoggedIn && (
        <div className="flex bg-zinc-950 p-6">
          <div className="w-1/4">
            <UserMenu open={open} setOpen={setOpen} />
          </div>

          <div className="flex flex-col justify-center mx-auto w-2/5">
            <div className="flex justify-center border border-zinc-700 p-6">
              <InputReview
                username={username}
                open={open}
                setOpen={setOpen}
                setUserAddedReview={setUserAddedReview}
              />
            </div>
            <div className="flex justify-center border border-zinc-700">
              <Feed userAddedReview={userAddedReview} />
            </div>
          </div>

          <div className="w-1/4 flex justify-end">
            <NowPlaying />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
