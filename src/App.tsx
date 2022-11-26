import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProjectListScreen } from 'screens/project-list';
import { LoginScreen } from 'screens/login';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import {ErrorBoundary} from 'component/error-boundary';
import { FullPageErrorFallback } from 'component/lib';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  const {user} = useAuth()
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </ErrorBoundary>
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <LoginScreen></LoginScreen> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
