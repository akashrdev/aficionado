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

  return (
    <>
      <Header />
      {!cookies.isLoggedIn && (
        <Stack
          direction="row"
          display="flex"
          spacing={25}
          sx={{ marginTop: '5%' }}
        >
          <Box>
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              setProfilePicture={setProfilePicture}
              username={username}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          </Box>
          <Box>
            <Feed
              setUserAddedReview={setUserAddedReview}
              userAddedReview={userAddedReview}
            />
          </Box>
        </Stack>
      )}
      {cookies.isLoggedIn && (
        <Stack
          direction="column"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <InputReview
              username={username}
              setUserAddedReview={setUserAddedReview}
            />
          </Box>
          <Box>
            <Feed userAddedReview={userAddedReview} />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Home;
