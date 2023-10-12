import { useState } from 'react';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';
import RandomDataDisplay from './components/questions/questions';
import { auth } from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  const [showSignInForm, setShowSignInForm] = useState(true);

  const toggleForm = () => {
    setShowSignInForm((prev) => !prev);
  };
  
  return (
    <div className="App">
      {user ? (
        <div>
          <RandomDataDisplay />
          <AuthDetails />
        </div>
      ) : (
        <div>
          {showSignInForm ? (
            <SignIn toggleForm={toggleForm} />
          ) : (
            <SignUp toggleForm={toggleForm} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;