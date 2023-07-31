import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

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
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={reviewProfilePicture} aria-label="profile" />}
        title={reviewMovieOrTv}
        subheader={`@${reviewUsername}`}
      />
      <CardMedia component="img" height="194" image={reviewImage} alt="movie" />
      <Typography variant="body2" color="text.secondary">
        {formatDate(reviewDate)}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {reviewText}
        </Typography>
      </CardContent>
      <IconButton aria-label="comment">
        <MapsUgcIcon style={{ fontSize: 'large' }} />
      </IconButton>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon style={{ fontSize: 'large' }} />
      </IconButton>

      <IconButton aria-label="share">
        <IosShareIcon style={{ fontSize: 'large' }} />
      </IconButton>
    </Card>
  );
};

export default Review;
