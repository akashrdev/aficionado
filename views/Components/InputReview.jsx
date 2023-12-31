import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import TitleImage from './TitleImage.jsx';
import Textarea from '@mui/joy/Textarea';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Login from './Login.jsx';
import Modal from '@mui/material/Modal';

const InputReview = ({ username, setUserAddedReview, open, setOpen }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [image, setImage] = useState('');
  const [currentMovie, setCurrentMovie] = useState({});
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    let search = event.target.value;
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_TOKEN,
      },
    };
    axios.get(url, options).then((response) => {
      setSearchResults(response.data.results);
    });
  };

  const handleSelect = (event, value) => {
    let imageURL = `https://image.tmdb.org/t/p/original${value.backdrop_path}`;
    setImage(imageURL);
    setCurrentMovie(value);
    setOpen(true);
    console.log(value);
  };

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const handlePost = () => {
    axios
      .post('http://127.0.0.1:3000/review', {
        image: image,
        movie: currentMovie.original_title,
        review: review,
        rating: rating,
        user_name: username,
      })
      .then((response) => {
        if (response.status === 200) {
          setUserAddedReview(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };
  return (
    <div className="flex justify-center w-full space-y-5">
      <div className="w-full">
        <Autocomplete
          freeSolo
          id="movie/tv search"
          disableClearable
          options={searchResults}
          onInputChange={handleChange}
          onChange={handleSelect}
          getOptionLabel={(option) => option.original_title}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Leave a review..."
              InputProps={{
                ...params.InputProps,
                type: 'search',
                style: { color: '#f4f4f5' },
              }}
              InputLabelProps={{
                style: { color: '#3f3f46' }, // Set the color of the label
              }}
              style={{ width: '100%' }}
              className="w-full"
            />
          )}
          className="w-full"
        />
      </div>

      {currentMovie.title ? (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-zinc-700">
          <div className="bg-white p-5 rounded-lg shadow-md w-1/2 space-y-5 flex flex-col items-center">
            <textarea
              className="border p-2 rounded w-3/4 resize-y bg-zinc-700 text-white"
              rows="5"
              placeholder="Tell us your review..."
              onChange={handleReview}
            ></textarea>

            <h4 className="font-bold text-white">{currentMovie.title}</h4>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <div className="w-3/4">
              <img
                src={image}
                alt={currentMovie.title}
                className="w-full object-cover rounded-lg"
              />
            </div>

            <button
              className="border p-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InputReview;
