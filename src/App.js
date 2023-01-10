import { Provider as ReduxProvider } from 'react-redux';
import reduxStore, { persistedStore } from '@reduxStore/index';
import { PersistGate } from 'redux-persist/integration/react';

import { AuthProvider, SocketProvider } from '@providers';

import { I18nextProvider } from 'react-i18next';
import i18nStore from '@i18nStore';

import { BrowserRouter } from 'react-router-dom';

import { Container } from '@container';

const App = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <AuthProvider>
          <I18nextProvider i18n={i18nStore}>
            <BrowserRouter>
              <SocketProvider>
                <Container />
              </SocketProvider>
            </BrowserRouter>
          </I18nextProvider>
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
