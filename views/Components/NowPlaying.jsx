import axios from 'axios';
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
    <div className="flex flex-col rounded-lg max-h-96 m-7 bg-zinc-900 text-white">
      <h1 className="flex justify-center font-bold text-2xl">Now Playing</h1>

      <div className="flex flex-col overflow-y-auto ">
        {nowPlaying.map((movie) => {
          let date = new Date(movie.release_date);
          let formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
          return (
            <div className="flex flex-col p-4">
              <a
                href={`https://www.google.com/search?q=${movie.original_title}+showtimes+near+me`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                {movie.original_title}
              </a>
              <span className="mt-1 text-sm">{formattedDate}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NowPlaying;
