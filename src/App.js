import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import CustomSignIn from './CustomSignIn';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <CustomSignIn/>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);