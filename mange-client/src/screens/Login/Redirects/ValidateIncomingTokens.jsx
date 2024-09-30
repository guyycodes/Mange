import React, { useEffect, useState, useCallback } from 'react';
import { useRouteContext } from '../../../util/context/routeContext';
import { USE_CUSTOM_POST_HOOK } from "../../../util/reactHooks/POST_HOOK";
import { JWT } from "../../../util/actions/actions";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';

const FullScreenSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LargeCircularProgress = styled(CircularProgress)`
  && {
    width: 120px !important;
    height: 120px !important;
  }
`;

const LoadingText = styled(Typography)`
  && {
    color: white;
    margin-top: 20px;
    font-size: 24px;
  }
`;

const TokenValidationLoadingIndicator = () => (
  <FullScreenSpinner>
    <LargeCircularProgress />
    <LoadingText variant="h4">Validating Your Token...</LoadingText>
  </FullScreenSpinner>
);

export const ValidateToken = ({ setUserValidationSequence, setAuthFailure }) => {
  const { dispatch } = useRouteContext();
  const navigate = useNavigate();

  const {
    sendRequest: validateTokenRequest,
    loading: tokenValidationLoading,
    error: tokenValidationError,
    response: tokenValidationResponse,
  } = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/validate-token', 'POST');

  const setContext = useCallback((result, data) => {
    if (result === 'jwt') {
      dispatch({ type: JWT, payload: data });
    }
  }, [dispatch]);

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const result = await validateTokenRequest({ token });
        if (result && result.data && result.data.valid) {
          setUserValidationSequence(true);
          setContext('ValidUser', result.data);
        } else {
          setAuthFailure(true);
          alert("The verification link is invalid or has expired. Please request a new verification email.");
        }
      } catch (error) {
        console.error('Error validating token:', error);
        alert("An error occurred while verifying your account. Please try again later or contact support.");
      }
    };

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      validateToken(token);
    }
  }, [validateTokenRequest, setUserValidationSequence, setContext, setAuthFailure]);

  if (tokenValidationLoading) {
    return <TokenValidationLoadingIndicator />;
  } else {
    return navigate('/login');
  }
};