import React, { useState } from 'react';
import { Typography, TextField, Link, Stack, Box, Button, FormLabel, FormControl, CssBaseline, Snackbar, Alert } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '450px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
}));

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/user/register', data);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success')
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Registration failed');
      setSnackbarSeverity('error')
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <CssBaseline />
      <RegisterContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: 'center', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email address.',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long.',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Register
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <span>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Login
                </Link>
              </span>
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
                <Link
                  href="/"
                  variant="body1"
                  sx={{ alignSelf: 'center' }}
                >
                  ← Back to home
                </Link>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>

      {}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
