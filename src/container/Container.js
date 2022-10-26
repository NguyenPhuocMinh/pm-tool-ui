import { Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ErrorBoundary } from 'react-error-boundary';

import {
  AuthCommon,
  LoadingCommon,
  NotifyCommon,
  ErrorCommon
} from '@components';
import { LoginResource, DashboardResource } from '@resources';
import { lightTheme, darkTheme } from '@themes';

import { get } from 'lodash';
import constants from '@constants';

const Container = () => {
  const themeStore = useSelector((state) => get(state, 'common.theme'));
  const theme = themeStore === constants.THEMES.LIGHT ? lightTheme : darkTheme;

  return (
    <Suspense fallback={LoadingCommon}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorCommon}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginResource />} />
            <Route
              index
              path="/dashboard/*"
              element={
                <AuthCommon>
                  <DashboardResource />
                </AuthCommon>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <NotifyCommon />
        </ErrorBoundary>
      </ThemeProvider>
    </Suspense>
  );
};

export default Container;
