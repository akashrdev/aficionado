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
import SvgIcon from '@mui/material/SvgIcon';
import { red } from '@mui/material/colors';
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
    <Card
      sx={{
        maxWidth: 345,
        // backgroundColor: '#14181c',
        // backgroundImage:
        //   'url(https://s2.ltrbxd.com/static/img/content-bg.0d9a0f0f.png)',
        // backgroundRepeat: 'repeat-x',
        // backgroundPositionX: 0,
        // backgroundPositionY: -1,
        // backgroundSize: 'initial',
        // backgroundAttachment: 'initial',
        // backgroundOrigin: 'initial',
        // backgroundClip: 'initial',
        textAlign: 'center',
      }}
      id="review"
    >
      <CardHeader
        avatar={<Avatar src={reviewProfilePicture} aria-label="profile" />}
        title={
          <Typography
            variant="h7"
            align="center"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '25px',
            }}
          >
            {reviewMovieOrTv}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '25px',
            }}
          >
            @{reviewUsername}
          </Typography>
        }
      />
      <CardMedia component="img" height="194" image={reviewImage} alt="movie" />
      <Typography variant="body2">{formatDate(reviewDate)}</Typography>
      <CardContent>
        <Rating name="read-only" value={reviewRating} readOnly />
        <Typography variant="body2">{reviewText}</Typography>
      </CardContent>
      <IconButton aria-label="comment" style={{ marginRight: '10px' }}>
        <MapsUgcIcon style={{ fontSize: 'large', color: '#99aabb' }} />
      </IconButton>
      <IconButton aria-label="add to favorites" style={{ marginRight: '10px' }}>
        <Badge
          badgeContent={5}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.7rem',

              transform: 'scale(1) translate(80%, 0%)',
            },
          }}
        >
          <FavoriteIcon style={{ fontSize: 'large', color: '#99aabb' }} />
        </Badge>
      </IconButton>
      <IconButton aria-label="share" style={{ marginRight: '10px' }}>
        <IosShareIcon style={{ fontSize: 'large', color: '#99aabb' }} />
      </IconButton>
    </Card>
  );
};

export default Review;
