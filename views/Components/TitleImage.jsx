import Box from '@mui/joy/Box';
const TitleImage = ({ image }) => {
  return (
    <Box
      component="img"
      src={image}
      sx={{ borderRadius: '8px', width: '75%' }}
    />
  );
};

export default TitleImage;
