import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { AdminAuthRequest } from 'frontend-backend';
import './Login.scss';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Send authentication request to server using fetch API or axios
    try {
      setError(false);
      setLoading(true);
      const response = await fetch('http://localhost:8080/auth/user', {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          password
        } as AdminAuthRequest),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setError(false);
        const data = await response.text();
        const parsedData = JSON.parse(data);
        sessionStorage.setItem('token', parsedData.token);
        return navigate('/');
      } else {
        setError(true);
        throw new Error(`Status ${response.status}: failed to authenticate`);
      }
    }
    catch(err){
      console.error(err);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className='flex-wrapper'>
        <FormControl className='form-control'>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl className='form-control'>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <FormHelperText>
            Password must be at least 8 characters long.
          </FormHelperText>
        </FormControl>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
      {error ? <FormHelperText error>Incorrect username or password</FormHelperText> : loading ? <CircularProgress /> : null}
    </form>
  );
};

export default LoginForm;
