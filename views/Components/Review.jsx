import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';

const Review = ({
  reviewImage,
  reviewText,
  reviewUsername,
  reviewRating,
  reviewProfilePicture,
  reviewMovieOrTv,
  reviewDate,
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let reviewDate = new Date(dateString);
    let currentDate = new Date();
    let timeDifference = Math.abs(currentDate - reviewDate);
    let dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    if (dayDifference <= 5) {
      if (dayDifference < 1) {
        return `today`;
      } else if (dayDifference === 1) {
        return `1 day ago`;
      }
      {
        return `${dayDifference} days ago`;
      }
    } else {
      return formattedDate; // or format it as you wish
    }
  };
  return (
    <div
      className="w-full h-80 border-b border-zinc-700 flex flex-col items-center  "
      id="review"
    >
      <div className="w-full flex items-center mb-2">
        <img
          className="h-14 w-14 rounded-full"
          src={reviewProfilePicture}
          alt="Profile Picture"
        />

        <div className="flex flex-col mx-auto text-center">
          <h5 className="text-xl text-zinc-100">{reviewMovieOrTv}</h5>
          <p className="text-sm text-zinc-100">@{reviewUsername}</p>
        </div>

        <div className="mr-4"></div>
      </div>

      <img className="mx-auto h-52 rounded-lg" src={reviewImage} alt="movie" />

      <p className="mx-auto text-zinc-100">{formatDate(reviewDate)}</p>

      <div className="flex flex-col items-center mx-auto">
        <Rating name="read-only" value={reviewRating} readOnly />
        <p className="text-sm text-zinc-100">{reviewText}</p>
      </div>

      <div className="flex space-x-4">
        <IconButton aria-label="comment">
          <MapsUgcIcon style={{ fontSize: 'large', color: '#f4f4f5' }} />
        </IconButton>

        <IconButton aria-label="add to favorites">
          <Badge badgeContent={5}>
            <FavoriteIcon style={{ fontSize: 'large', color: '#f4f4f5' }} />
          </Badge>
        </IconButton>

        <IconButton aria-label="share">
          <IosShareIcon style={{ fontSize: 'large', color: '#f4f4f5' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Review;
