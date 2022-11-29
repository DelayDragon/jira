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


function App() {
  const {user} = useAuth()
  // const queryClient = new QueryClient()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </ErrorBoundary>
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <LoginScreen></LoginScreen> */}
    </div>
  );
}

export default App;
