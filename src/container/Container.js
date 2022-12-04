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
  ErrorCommon,
  ToastCommon
} from '@utilities';
import { Layout } from '@layout';
import { LoginResource } from '@resources';
import { lightTheme, darkTheme } from '@themes';

import { get } from 'lodash';
import constants from '@constants';

const Container = () => {
  const { themeStore } = useSelector((state) => {
    return {
      themeStore: get(state, 'common.theme', 'light')
    };
  });
  const theme = themeStore === constants.THEMES.LIGHT ? lightTheme : darkTheme;

  return (
    <Suspense fallback={LoadingCommon}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorCommon}>
          <CssBaseline />
          <Routes>
            {/* Routes public */}
            <Route path="/login" element={<LoginResource />} />
            <Route
              index
              path="/*"
              element={
                <AuthCommon>
                  <Layout />
                </AuthCommon>
              }
            />
            {/* Routes not found */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <NotifyCommon />
          <ToastCommon theme={themeStore} />
        </ErrorBoundary>
      </ThemeProvider>
    </Suspense>
  );
};

export default Container;
