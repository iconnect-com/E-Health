import React, { useCallback, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import loginpic from '../../../assets/illustrations/illustration_login.png';
import LoginForm from './LoginForm';
import useResponsive from '../hooks/useResponsive';
import Iconify from '../../../components/iconify';

import '../SocialLogin.css';
import { User } from '../SocialLogin/user';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const mdUp = useResponsive('up', 'md');
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const onLoginStart = useCallback(() => {}, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    setUserDetails(null);
  }, []);

  const facebookLoginButtonRef = useRef();
  const handleFacebookLogin = async (accessToken) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user details from Facebook.');
      }

      const userData = await response.json();
      setUserDetails(userData);

      // Send user data to backend
      await sendUserDataToBackend(userData);
    } catch (error) {}
  };

  const sendUserDataToBackend = async (userData) => {
    try {
      const response = await fetch('https://virtualmedicalconsultation.azurewebsites.net/api/v1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to send user data to backend.');
      }
    } catch (error) {}
  };

  // Google Login AUthentication
  const handleGoogleLogin = async (accessToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user details from Google.');
      }

      const userData = await response.json();
      setUserDetails(userData);

      await sendUserDataToBackend(userData);
    } catch (error) {}
  };

  return (
    <>
      <>
        {provider && profile ? (
          <User provider={provider} profile={profile} onLogout={onLogoutSuccess} />
        ) : (
          <div className={`App ${provider && profile ? 'hide' : ''}`}></div>
        )}
      </>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h7" gutterBottom>
              Sign in
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link to="/" variant="subtitle2" component={RouterLink}>
                Get started
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                <LoginSocialFacebook
                  isOnlyGetToken
                  appId={process.env.REACT_APP_FB_APP_ID || ''}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                    handleFacebookLogin(data.accessToken);
                  }}
                  onReject={(err) => {}}
                  ref={facebookLoginButtonRef}
                >
                  <FacebookLoginButton style={{ transform: 'scale(1)', height: '46px' }} />
                </LoginSocialFacebook>
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                <LoginSocialGoogle
                  isOnlyGetToken
                  client_id={process.env.REACT_APP_GG_APP_ID || ''}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                    handleGoogleLogin(data.accessToken);
                  }}
                  onReject={(err) => {}}
                >
                  <GoogleLoginButton style={{ transform: 'scale(1)', height: '46px' }} />
                </LoginSocialGoogle>
              </Button>

              {/* Add similar Button components for other social logins */}
            </Stack>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            {/* Render user details */}
            {userDetails && (
              <div>
                <Typography variant="h7">User Details:</Typography>
                <pre>{JSON.stringify(userDetails, null, 2)}</pre>
              </div>
            )}

            <LoginForm />
          </StyledContent>
        </Container>
        {mdUp && (
          <StyledSection>
            <Typography variant="h7" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src={loginpic} alt="login" />
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
}
