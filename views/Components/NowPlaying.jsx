import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_TOKEN,
    },
  };

  const fetch = () => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing', options)
      .then((response) => {
        console.log(response.data.results);

        let movieArr = response.data.results;
        let sortedMovies = movieArr.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });

        setNowPlaying(sortedMovies);
      })
      .catch((error) => {
        console.log('ERROR IN AXIOS GET NOW PLAYING');
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{
        m: 1,
        width: '26ch',
        border: 'solid',
        borderRadius: '8%',
        paddingBottom: '15px',
        borderColor: 'black',
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Now Playing</h2>

      <List
        sx={{
          maxHeight: '250px',
          maxWidth: '250px',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            // targeting Webkit browsers (Chrome, Safari)
            display: 'none',
          },
          msOverflowStyle: 'none', // targeting IE and Edge
          scrollbarWidth: 'none',
        }}
      >
        {nowPlaying.map((movie) => {
          let date = new Date(movie.release_date);
          let formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
          return (
            <ListItem>
              <ListItemText
                primary={
                  <a
                    href={`https://www.google.com/search?q=${movie.original_title}+showtimes+near+me`}
                    target="blank"
                  >
                    {movie.original_title}
                  </a>
                }
                secondary={<Typography>{formattedDate}</Typography>}
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default NowPlaying;
