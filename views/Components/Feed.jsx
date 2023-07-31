import Review from './Review.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';

const Feed = ({ setUserAddedReview, userAddedReview }) => {
  const [recentReviews, setRecentReviews] = useState([]);

  const fetch = () => {
    axios
      .get('http://127.0.0.1:3000/feed')
      .then((response) => {
        setRecentReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [userAddedReview]);

  return (
    <Stack>
      {recentReviews.map((review) => {
        return (
          <Review
            key={Math.random()}
            reviewImage={review.image}
            reviewText={review.review_text}
            reviewRating={review.rating}
            reviewUsername={review.user_name}
            reviewProfilePicture={review.userProfilePicture}
            reviewMovieOrTv={review.movie_or_tv}
            reviewDate={review.date}
          />
        );
      })}
    </Stack>
  );
};

export default Feed;
