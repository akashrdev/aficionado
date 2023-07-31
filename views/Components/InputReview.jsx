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

const InputReview = ({ username, setUserAddedReview }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [image, setImage] = useState('');
  const [currentMovie, setCurrentMovie] = useState({});
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    // console.log(value.backdrop_path);
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
    <Stack
      spacing={5}
      sx={{
        width: 500,
        border: '1px solid white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%',
      }}
    >
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
            }}
          />
        )}
      />

      {currentMovie.title ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '50%',
            left: '25%',
            right: '50%',
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            spacing={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'white',
              borderRadius: '8px',
            }}
          >
            <Textarea
              name="Outlined"
              placeholder="Tell us your review.."
              variant="outlined"
              rows={5}
              style={{ width: '75%', resize: 'vertical', marginTop: '5%' }}
              onChange={handleReview}
            />
            <h4>{currentMovie.title}</h4>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TitleImage image={image} />
            <Button
              variant="outlined"
              onClick={handlePost}
              style={{ marginBottom: '5%' }}
            >
              Post
            </Button>
          </Stack>
        </Modal>
      ) : null}
    </Stack>
  );
};

export default InputReview;
