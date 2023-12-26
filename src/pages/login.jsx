import React, { useState, useEffect } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebaseWonkaApp from "../util/firebaseWonkaApp";
import { getAuth } from "firebase/auth";

const Login = () => {
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (firebaseWonkaApp) {
      setFirebaseInitialized(true);
    }
  }, []);

  if (!isFirebaseInitialized) {
    return <div>Loading...</div>;
  }

  const auth = getAuth(firebaseWonkaApp);
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default Login;