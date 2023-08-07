import Stack from '@mui/material/Stack';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ProfileCard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);

  const submitHandler = () => {
    removeCookie('isLoggedIn', 'username', 'profilePicture');
  };

  const usernameHandler = (event) => {
    console.log('clicked!');
  };

  const passwordHandler = (event) => {
    console.log('clicked!');
  };

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      component="form"
      direction="column"
      sx={{
        m: 1,
        width: '25ch',
        borderColor: 'black',
        border: 'solid',
        borderRadius: '8%',
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <h2>{cookies.username}</h2>
      <TextField
        required
        id="outlined-required"
        name="username"
        lable="Username"
        helperText="Username"
        onChange={usernameHandler}
      />
      <TextField
        required
        id="outlined-password-input"
        type="password"
        name="password"
        lable="Password"
      />
      <Button type="submit" variant="contained" sx={{ m: 1, width: '15ch' }}>
        Logout
      </Button>
    </Stack>
  );
};

export default ProfileCard;
