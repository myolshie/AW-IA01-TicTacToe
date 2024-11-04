import * as React from 'react';
import { Typography, Stack, Box, Button, CssBaseline } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '450px',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const HomeContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function Home() {
  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <CssBaseline />
      <HomeContainer direction="column" spacing={2}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: 'center', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Welcome!
          </Typography>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ textAlign: 'center', fontSize: '1rem' }}
          >
            Only register implemented...
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegisterClick}
              fullWidth
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLoginClick}
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Card>
      </HomeContainer>
    </>
  );
}
