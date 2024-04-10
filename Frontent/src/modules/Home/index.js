import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicPaths } from '../../routes/path';
import styles from './styles.module.css';
import { Button, Container, Grid, Typography } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handlePatSignup = () => {
    navigate(PublicPaths.REGISTER);
  };

  const handleDocSignup = () => {
    navigate(PublicPaths.DOCTOR_REG);
  };
  return (
    <div className={styles.homepage}>
      <div className={styles.home}>
        <Container>
          <main>
            <div className={styles.title}>
              <div className={styles.logo}>
                <Typography
                  sx={{ mb: 3, mt: 7, fontWeight: 'normal' }}
                  variant="h7"
                  color="white.main"
                  gutterBottom
                >
                  Welcome to the
                </Typography>
              </div>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '2rem' }}
                variant="h3"
                color="white.main"
                gutterBottom
              >
                Virtual Medical
              </Typography>

              <Typography
                variant="h3"
                color="white.main"
                sx={{ mb: 0, fontWeight: 'bold', fontSize: '2rem' }}
              >
                Consultation System
              </Typography>
            </div>

            <Grid container sx={{ my: 2 }} spacing={3}>
              <Button
                onClick={handleLogin}
                sx={{ marginLeft: 3, marginTop: 4, width: '120px' }}
                size="medium"
                type="submit"
                variant="contained"
                color="secondary"
              >
                LOGIN
              </Button>
            </Grid>
            <Grid container sx={{ my: 3 }} spacing={3}>
              <Button
                onClick={handlePatSignup}
                sx={{ marginLeft: 3, marginTop: 1, width: '230px', color: 'blue' }}
                size="edium"
                type="submit"
                variant="contained"
                color="white"
              >
                PATIENT REGISTRATION{' '}
              </Button>
              <Button
                onClick={handleDocSignup}
                sx={{ marginLeft: 3, marginTop: 1, width: '230px' }}
                size="medium"
                type="submit"
                variant="outlined"
                color="white"
              >
                DOCTOR REGISTRATION
              </Button>
            </Grid>
          </main>
        </Container>
      </div>
    </div>
  );
};

export default Home;
