import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallComposite,
  fromFlatCommunicationIdentifier,
  useAzureCommunicationCallAdapter,
} from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

const JoinMeeting = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const handleGoHome = () => {
    navigate(-1);
  };
  const location = useLocation();
  const appointment = location.state?.appointment;
  const displayName = appointment?.user.fullname;

  const credential = useMemo(() => {
    if (token) {
      return new AzureCommunicationTokenCredential(token);
    }
    return;
  }, [token]);

  const [teamsMeetingLink, setTeamsMeetingLink] = useState(appointment?.teamsMeetingLink);

  const callAdapterArgs = useMemo(() => {
    if (userId && credential && displayName && teamsMeetingLink) {
      return {
        userId: fromFlatCommunicationIdentifier(userId),
        displayName,
        credential,
        locator: { meetingLink: teamsMeetingLink },
      };
    }
    return {};
  }, [userId, credential, displayName, teamsMeetingLink]);

  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);
  const [callEnded, setCallEnded] = useState(false);
  useEffect(() => {
    const init = async () => {
      setMessage('Setting up the meeting for you');
      const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION);
      const user = await res.json();
      setUserId(user?.userId);
      setToken(user?.token);
    };
    init();
  }, []);

  useEffect(() => {
    if (callAdapter) {
      const onCallEnded = () => {
        if (callAdapter?.state.call) {
          callAdapter?.dispose();
        } else {
        }
        setTimeout(() => {
          navigate('/');
          setCallEnded(true);
        }, 3000);
      };

      callAdapter?.on('stateChanged', (state) => {
        if (state.call?.state === 'Disconnected') {
          onCallEnded();
        }
      });

      return () => {
        if (callAdapter) {
          callAdapter?.off('stateChanged', onCallEnded);
          if (callAdapter?.state && callAdapter?.state.call) {
            callAdapter.dispose();
          }
        }
        setCallEnded(false);
      };
    }
  }, [callAdapter, navigate]);

  if (callAdapter) {
    return (
      <Container maxWidth="xl">
        <Button
          variant="text"
          onClick={handleGoHome}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ mt: 4 }}
        >
          Go Back{' '}
        </Button>
        <div className="wrapper">
          <CallComposite adapter={callAdapter} />
        </div>
      </Container>
    );
  }

  if (!credential) {
    return <>Please Wait, Loading...</>;
  }
  if (message) {
    return <div>{message}</div>;
  }
  return <div>Initializing...</div>;
};

export default JoinMeeting;
