import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Login = ({
  setIsLoggedIn,
  setUsername,
  username,
  setProfilePicture,
  setCookie,
  removeCookie,
}) => {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#04CA97',
      },
    },
  });

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post('http://127.0.0.1:3000/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response && response.status === 200) {
          console.log(response.data);
          setIsLoggedIn(true);
          setCookie('isLoggedIn', true);
          setLoginError(false);
          setCookie('username', response.data.name);
          setProfilePicture(response.data.profilePicture);
          setCookie('profilePicture', response.data.profilePicture);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setLoginError(true);
        }
      });
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
        border: 'solid',
        borderRadius: '8%',
        // backgroundColor: '#2c2c2c',
        borderColor: 'black',
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <h2>Login</h2>
      <TextField
        required
        id="outlined-required"
        name="username"
        lable="Username"
        helperText="Username"
        onChange={usernameHandler}
        // sx={{
        //   color: 'white', // Changes the color of the text
        //   '.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        //     borderColor: 'white', // Changes the border color
        //   },
        //   '& .MuiFormHelperText-root': {
        //     color: 'white',
        //   },
        // }}
      />
      <TextField
        required
        id="outlined-password-input"
        type="password"
        name="password"
        lable="Password"
        helperText={loginError === false ? 'Password' : 'Login failed'}
        onChange={passwordHandler}
        // sx={{
        //   color: 'white', // Changes the color of the text
        //   '.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        //     borderColor: 'white', // Changes the border color
        //   },
        //   '& .MuiFormHelperText-root': {
        //     color: 'white', // Changes the helper text color
        //   },
        // }}
      />
      <ThemeProvider theme={theme}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ m: 1, width: '15ch' }}
        >
          Submit
        </Button>
      </ThemeProvider>
    </Stack>
  );
};

export default Login;
