import { useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import appRoutes from './app/routes/appRoutes';

const AppRoutes = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

const MsalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { instance } = useMsal();

  useEffect(() => {
    const handleRedirectPromise = async () => {
      try {
        const response = await instance.handleRedirectPromise();
        if (response) {
          console.log('Redirect handled', response);
        }
      } catch (error) {
        console.error('Redirect error', error);
      }
    };

    handleRedirectPromise();
  }, [instance]);

  return <>{children}</>;
};

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    authority: process.env.REACT_APP_AUTHORITY || '',
    redirectUri: window.location.origin, // Typically the root of your app
    // postLogoutRedirectUri: '/',  // Redirect after logout
  },
  cache: {
    cacheLocation: 'localStorage', // Cache location, "sessionStorage" or "localStorage"
    storeAuthStateInCookie: false, // Set to true for supporting IE11
  },
  system: {
    allowNativeBroker: false, //   Prevent the use of native broker (relevant for mobile environments)
    loggerOptions: {
      loggerCallback: (logLevel: LogLevel, message: string) => {
        // console.log(message); // Logs all MSAL messages
      },
      logLevel: LogLevel.Verbose, // Set the logging level (Verbose for detailed logs)
      piiLoggingEnabled: false, // Disable logging of personal identifiable information (PII)
    },
  },
});

console.log(process.env.REACT_APP_CLIENT_ID);
const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <MsalWrapper>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MsalWrapper>
    </MsalProvider>
  );
};

export default App;
